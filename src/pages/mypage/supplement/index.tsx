import React, { useState, useEffect } from "react";
import SupplementCard from "@/components/common/SupplementCard";
import FilterButton from "@/components/common/FilterButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { LeftArrow } from "@public/svgs";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/apis/axios-instance";
import PageNavigator from "@/components/common/PageNavigator";

interface SupplementResponse {
  code: string;
  message: string;
  result: {
    totalElements: number;
    totalPages: number;
    size: number;
    content: {
      id: number;
      name: string;
      country: string;
      productName: string;
      image: string;
      brand: string;
      categories: string[];
      scrapped: boolean;
    }[];
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageable: {
      offset: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      paged: boolean;
      pageNumber: number;
      pageSize: number;
      unpaged: boolean;
    };
  };
  isSuccess: boolean;
}

const SupplementPage: React.FC = () => {
  const router = useRouter();
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [supplements, setSupplements] = useState<SupplementResponse['result']['content']>([]);

  const { data, isLoading, refetch } = useQuery<SupplementResponse>({
    queryKey: ["scrapSupplements", currentPage, selectedCategory],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/mypage/supplements?page=${currentPage}&category=${encodeURIComponent(selectedCategory)}`
      );
      console.log("mypage 영양제 목록=", response.data);
      return response.data;
    },
  });
  if (isLoading)
    console.warn("mypage 영양제 로딩 중..");

  useEffect(() => {
    if (data?.result) {
      setSupplements(data.result.content);
      setTotalElements(data.result.totalElements);

      // 현재 페이지가 비었다면 이전 페이지로 이동
      if (data.result.content.length === 0 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
        refetch();
      }
    }
  }, [data, currentPage, refetch]);
  
  const displayData = data?.result;
  // const supplements = displayData?.content || [];
  const totalPages = displayData?.totalPages || 1;

  const handleBookmarkToggle = (id: number) => {
    // 현재 페이지가 비어있다면 다음 페이지로 이동
    setSupplements(prev => {
      // supplements 업데이트
      const newSupplements = prev.filter(supplement => supplement.id !== id);

      // 현재 페이지의 마지막 아이템을 삭제한 경우
      if (newSupplements.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      return newSupplements;
    });
    // totalElements 감소
    setTotalElements(prev => prev - 1);
    refetch();
  };

  const handleCardClick = (id: number) => {
    router.push(`/supplements/${id}`);
  };

  const handleFilterClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤 효과
    });
  }, [currentPage]);

  return (
    <div className="xl:w-[900px] xl:mx-auto lg:w-[900px] lg:mx-[50px] md:w-[601px] md:mx-auto w-[calc(100%-40px)] mx-5 py-8 lg:py-9">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
        <div className="flex items-center ">
          <Link href="/mypage">
            <LeftArrow className="w-6 h-6 text-gray-600 sm:block lg:hidden" />
          </Link>
          <h1 className="text-gray-600 lg:text-display2-b text-m-headline1-b ml-2 whitespace-nowrap">
            영양제 저장 목록 <span className="text-gray-600">{totalElements}</span>개
          </h1>
        </div>
        <div className="md:w-full w-screen -mx-5 md:-mx-0 h-[1px] bg-gray-100 lg:hidden" />
        <div className="w-full">
          <div className="flex gap-2 overflow-x-auto lg:overflow-hidden w-full lg:w-auto flex-nowrap lg:flex-wrap scrollbar-hide">
            <FilterButton text="전체" isSelected={selectedCategory === "전체"} onClickFn={() => handleFilterClick("전체")} />
            <FilterButton text="면역력강화" isSelected={selectedCategory === "면역"} onClickFn={() => handleFilterClick("면역")} />
            <FilterButton text="피로회복" isSelected={selectedCategory === "피로"} onClickFn={() => handleFilterClick("피로")} />
            <FilterButton text="소화건강" isSelected={selectedCategory === "소화"} onClickFn={() => handleFilterClick("소화")} />
            <FilterButton text="피부건강" isSelected={selectedCategory === "피부"} onClickFn={() => handleFilterClick("피부")} />
            <FilterButton text="뼈관절건강" isSelected={selectedCategory === "관절"} onClickFn={() => handleFilterClick("관절")} />
            <FilterButton text="눈건강" isSelected={selectedCategory === "눈건강"} onClickFn={() => handleFilterClick("눈건강")} />
          </div>
        </div>
      </div>

      {supplements.length !== 0 ? (
        <>
          {/* ✅ 영양제 리스트 */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-5 py-5 lg:py-9">
            {supplements.map((supplement) => (
              <div key={supplement.id} onClick={() => handleCardClick(supplement.id)}>
                <SupplementCard key={supplement.id} {...supplement} src={supplement.image} onBookmarkToggle={handleBookmarkToggle}/>
              </div>
            ))}
          </div>

          {/* ✅ 페이지네이션 */}
          <PageNavigator
            totalPage={totalPages}
            isFirst={currentPage === 1}
            isLast={currentPage === totalPages}
            page={currentPage}
            setPage={setCurrentPage} />
        </>
      ) : (
        /* ✅ 데이터가 없을 때 */
        <div className="flex flex-col justify-center items-center flex-grow my-[100px]">
          <span className="text-gray-300 text-headline-m md:text-m-body2-r">
            저장한 영양제가 없어요.
          </span>
          <div className="inline-flex gap-1">
            <Link
              href="/supplements"
              className="text-gray-300 text-headline-m md:text-m-body2-r underline whitespace-nowrap"
            >
              영양제 리스트
            </Link>
            <span className="text-gray-300 text-headline-m md:text-m-body2-r">
              에서 항목을 추가해보세요!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplementPage;
