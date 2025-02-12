import { useState } from "react";
import { useRouter } from "next/router";
import SupplementCard from "@/components/common/SupplementCard";
import FilterButton from "@/components/common/FilterButton";
import { ArrowRightIcon } from "@public/svgs";
import { axiosInstance } from "@/apis/axios-instance";
import { useQuery } from "@tanstack/react-query";

interface ApiResponse {
  code: string;
  message: string;
  result: {
    amountPage: number;
    amountCount: number;
    currentPage: number;
    currentCount: number;
    supplements: Supplement[];
  };
  isSuccess: boolean;
}

interface SearchResponse {
  code: string;
  message: string;
  result: {
    amountPage: number;
    amountCount: number;
    currentPage: number;
    currentCount: number;
    adResponse: {
      id: number;
      smallImageUrl: string;
    };
    supplements: Supplement[];
  };
  isSuccess: boolean;
}

interface Supplement {
  id: number;
  name: string;
  country: string;
  productName: string;
  image: string;
  brand: string;
  scrapCount: number;
  category4: string;
  categories: string[];
  scrapped: boolean;
}

const SupplementPage: React.FC = () => {
  const router = useRouter();
  const searchQuery = router.query.keyword as string || ""; // 검색어 가져오기
  const country = router.query.country as string || ""; // "", "KOREA", "USA", "JAPAN" 중 하나
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  
  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: ["supplementsList", selectedCategory, currentPage],
    queryFn: async () => {
      const category = selectedCategory === "전체" ? "전체" : selectedCategory;
      
      const url = `/supplements/lists?category=${encodeURIComponent(category)}&page=${currentPage}`;
      
      console.log("currentPage=", currentPage);
      console.log("Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL); // 환경변수 확인
      console.log("category=", category);
      console.log("Request URL:", url); // 실제 요청 URL 확인

      const response = await axiosInstance.get(url);
      console.log("category API Response:", response.data); // 데이터
      return response.data;
    },
    staleTime: 0,
  });

  console.log("검색어:", searchQuery);

  // 필터 버튼 클릭 핸들러
  const handleFilterClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리 변경시 첫 페이지로 이동
  };

  const countryParam = (country === "NONE" || country === "ALL") ? "" : country;
  const { data: searchData, isLoading: isSearchLoading, isError: isSearchError, error:searchError } = useQuery<SearchResponse>({
    queryKey: ["supplements-search", searchQuery, currentPage],
    // queryKey: ["supplements-search", "유산균", currentPage, ""],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/supplements/search?keyword=${encodeURIComponent(searchQuery)}&country=${countryParam}&page=${currentPage}`
        // `/supplements/search?keyword=${encodeURIComponent("유산균")}&country=${""}&page=${currentPage}`
      
      );
      console.log("search API Response:", response.data); // 데이터
      return response.data;
    },
    enabled: !!searchQuery
    // enabled:true
  });
  // useEffect(() => {
  //   if (searchData) {
  //     console.log("현재 표시 중인 검색 결과:", searchData.result);
  //   }
  // }, [searchData]);

  if (isLoading || isSearchLoading)
    console.error("영양제 로딩 중..");
  if (isError)
    console.error("카테고리Error=", error);
  if (isSearchError)
    console.error("isSearchError=", searchError);

  const displayData = searchQuery ? searchData?.result : data?.result;
  // const displayData = searchData?.result;
  const supplements = displayData?.supplements || [];
  const totalPages = displayData?.amountPage || 1;
  
  console.log("amountPage=", displayData?.amountPage);

  const handleCardClick = (id: number) => {
    router.push(`/supplements/${id}`);
  };

  return (
    <div className="xl:w-[900px] xl:mx-auto lg:w-[900px] lg:mx-[50px] md:w-[601px] md:mx-auto w-[calc(100%-40px)] mx-5 flex flex-col items-center lg:py-8 py-3">
      <div className="lg:hidden w-full text-start">
        <h2 className="text-m-subhead1-sb text-gray-600">
          {searchQuery ? `검색결과 ${displayData?.amountCount}건` : `전체 ${displayData?.amountCount}건`}
        </h2>
      </div>
      <div className="w-full flex items-center gap-x-4 overflow-x-auto hidden lg:flex">
        <h2 className="text-display2-b text-gray-600 whitespace-nowrap">{searchQuery ? `검색결과 ${displayData?.amountCount}건` : "전체"}</h2>
        <div className="flex gap-x-2">
          <FilterButton text="전체" isSelected={selectedCategory === "전체"} onClickFn={() => handleFilterClick("전체")} />
          <FilterButton text="면역력강화" isSelected={selectedCategory === "면역"} onClickFn={() => handleFilterClick("면역")} />
          <FilterButton text="피로회복" isSelected={selectedCategory === "피로"} onClickFn={() => handleFilterClick("피로")} />
          <FilterButton text="소화건강" isSelected={selectedCategory === "소화"} onClickFn={() => handleFilterClick("소화")} />
          <FilterButton text="피부건강" isSelected={selectedCategory === "피부"} onClickFn={() => handleFilterClick("피부")} />
          <FilterButton text="뼈관절건강" isSelected={selectedCategory === "관절"} onClickFn={() => handleFilterClick("관절")} />
          <FilterButton text="눈건강" isSelected={selectedCategory === "눈건강"} onClickFn={() => handleFilterClick("눈건강")} />
        </div>
      </div>

      {/* ✅ 검색 결과가 없을 경우 메시지 표시 */}
      {displayData?.amountCount === 0 ? (
        <div className="flex justify-center items-center h-[300px]">
          <p className="text-gray-300 lg:text-headline-m md:text-m-body2-r text-center">
            찾는 영양제가 없으신가요?<br />철자를 확인하거나 다른 키워드로 검색해주세요!
          </p>
        </div>
      ) : (
        <>
          {/* ✅ 검색 결과 리스트 */}
          <div className="w-full lg:py-9 py-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-5">
            {supplements.map((supplement) => (
              <div key={supplement.id} onClick={() => handleCardClick(supplement.id)}>
                <SupplementCard id={supplement.id}
                                country={supplement.country}
                                title={supplement.productName}
                                tags={supplement.categories}
                                isBookmarked={supplement.scrapped}
                                src={supplement.image}/>
              </div>
            ))}
          </div>

          {/* ✅ 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center align-center space-x-8">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`text-subhead1-sb ${
                    currentPage === index + 1 ? "text-secondary-500" : "text-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="flex flex-col align-center"
                disabled={currentPage === totalPages}
              >
                <ArrowRightIcon className="w-5 h-3 text-gray-300" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SupplementPage;