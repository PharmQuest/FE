import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import SupplementCard from "@/components/common/SupplementCard";
import FilterButton from "@/components/common/FilterButton";
import { ArrowRightIcon } from "@public/svgs";
import { axiosInstance } from "@/apis/axios-instance";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  selectCategories: string[];
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

  // 필터 버튼 클릭 핸들러
  const handleFilterClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리 변경시 첫 페이지로 이동
  };

  const countryParam = (country === "NONE" || country === "ALL") ? "" : country;
  const { data: searchData, isLoading: isSearchLoading, isError: isSearchError, error:searchError } = useQuery<SearchResponse>({
    queryKey: ["supplements-search", searchQuery, currentPage, countryParam],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/supplements/search?keyword=${encodeURIComponent(searchQuery)}&country=${countryParam}&page=${currentPage}`
        );
        console.log(`검색어: ${searchQuery} 결과=`, response.data);
        return response.data;
      } catch (error) {
        // 404 에러인 경우 빈 결과를 반환
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return {
            code: "SUPP4001",
            message: "검색 결과가 없습니다.",
            result: {
              amountPage: 0,
              amountCount: 0,
              currentPage: 0,
              currentCount: 0,
              supplements: [],
            },
            isSuccess: false
          };
        }
        throw error;
      }
    },
    enabled: router.isReady && Boolean(searchQuery)
  });
  // const { data: searchData, isLoading: isSearchLoading, isError: isSearchError, error:searchError } = useQuery<SearchResponse>({
  //   queryKey: ["supplements-search", searchQuery, currentPage, countryParam],
  //   queryFn: async () => {
  //     let retryCount = 0;
  //     const maxRetries = 10;

  //     while (retryCount <= maxRetries) {
  //       try {
  //         const response = await axiosInstance.get(
  //           `/supplements/search?keyword=${encodeURIComponent(searchQuery)}&country=${countryParam}&page=${currentPage}`
  //         );
  //         console.log(`검색어: ${searchQuery} 결과=`, response.data);
  //         return response.data;
  //       } catch (error) {
  //         if (axios.isAxiosError(error) && error.response?.status === 404) {
  //           if (retryCount === maxRetries) {
  //             // 최대 재시도 횟수에 도달하면 빈 결과 반환
  //             return {
  //               code: "SUPP4001",
  //               message: "검색 결과가 없습니다.",
  //               result: {
  //                 amountPage: 0,
  //                 amountCount: 0,
  //                 currentPage: 0,
  //                 currentCount: 0,
  //                 supplements: [],
  //               },
  //               isSuccess: false
  //             };
  //           }
  //           // 재시도 전 1초 대기
  //           await new Promise(resolve => setTimeout(resolve, 1000));
  //           retryCount++;
  //           continue;
  //         }
  //         throw error;
  //       }
  //     }
  //   },
  //   enabled: router.isReady && Boolean(searchQuery)
  // });
  
  if (isLoading)
    console.warn("카테고리 영양제 로딩 중..");
  if (isSearchLoading)
    console.warn("검색한 영양제 로딩 중..");
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤 효과
    });
  }, [currentPage]);

  // 검색 모드인지 확인
  const isSearchMode = !!searchQuery;

  // 표시할 영양제 목록 결정
  const displaySupplements = useMemo(() => {
    if (!isSearchMode) {
      // 검색이 아닌 경우 기존 동작 유지
      return supplements;
    } else {
      // 검색 결과인 경우 카테고리 필터링 적용
      return supplements.filter(supplement => 
        selectedCategory === "전체" || 
        supplement.selectCategories?.includes(selectedCategory)
      );
    }
  }, [isSearchMode, supplements, selectedCategory]);

  useEffect(() => {
    if (searchQuery || country) {
      setSelectedCategory("전체");
      setCurrentPage(1);
    }
  }, [searchQuery, country]);

  useEffect(() => {
    if (router.isReady) {
      console.log("Router Query:", router.query);
      console.log("Search Query:", searchQuery);
    }
  }, [router.isReady, router.query, searchQuery]);

  useEffect(() => {
    // 페이지 진입 시 초기화
    if (router.pathname === '/supplements' && !router.query.keyword) {
      setSelectedCategory("전체");
      setCurrentPage(1);
    }
  }, [router.pathname, router.query]);

  return (
    <div className="xl:w-[900px] xl:mx-auto lg:w-[900px] lg:mx-[50px] md:w-[601px] md:mx-auto w-[calc(100%-40px)] mx-5 flex flex-col items-center py-8">
      <div className="w-full max-w-[920px] flex items-center gap-x-4 mb-4 overflow-x-auto hidden lg:flex">
        <h2 className="text-display2-b text-gray-600 whitespace-nowrap">{searchQuery ? `검색결과 ${displaySupplements.length}건` : "전체"}</h2>
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
      {displaySupplements.length === 0 ? (
        <div className="flex justify-center items-center h-[300px]">
          <p className="text-gray-300 lg:text-headline-m md:text-m-body2-r text-center">
            찾는 영양제가 없으신가요?<br />철자를 확인하거나 다른 키워드로 검색해주세요!
          </p>
        </div>
      ) : (
        <>
          {/* ✅ 검색 결과 리스트 */}
          <div className="w-full py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-5">
            {displaySupplements.map((supplement) => (
              <div key={supplement.id} onClick={() => handleCardClick(supplement.id)}>
                <SupplementCard key={supplement.id} {...supplement} src={supplement.image}/>
              </div>
            ))}
          </div>

          {/* ✅ 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center align-center mt-6 space-x-8">
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