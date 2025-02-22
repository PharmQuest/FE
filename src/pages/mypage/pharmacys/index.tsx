import React, { useState, useEffect } from "react";
import FilterButton from "@/components/common/FilterButton";
import PharmacysCard from "../components/PharmacysCard";
import Link from "next/link";
import { LeftArrow } from "@public/svgs";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/apis/axios-instance";
import PageNavigator from "@/components/common/PageNavigator";

interface PharmacyResponse {
  code: string;
  message: string;
  result: {
    pharmacies: {
      name: string;
      region: string;
      latitude: number;
      longitude: number;
      isScrapped: boolean;
      place_id: string;
      img_url: string;
    }[];
    total_elements: number;
    total_pages: number;
    current_page: number;
    elements_per_page: number;
  };
  isSuccess: boolean;
}

const MyPharmacys = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("ALL");
  const [pharmacies, setPharmacies] = useState<PharmacyResponse['result']['pharmacies']>([]);

  const { data, isLoading, refetch } = useQuery<PharmacyResponse>({
    queryKey: ["mypagePharmacys", currentPage, selectedCountry],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/mypage/pharmacy?country=${selectedCountry}&page=${currentPage}&size=${itemsPerPage}`
      );
      console.log("약국 response=", response);
      console.log("mypage 약국 목록=", response.data);
      return response.data;
    },
  });
  if (isLoading)
    console.warn("mypage 약국 로딩 중..");

  useEffect(() => {
    if (data?.result) {
      setPharmacies(data.result.pharmacies);
      
      // 현재 페이지가 비었다면 이전 페이지로 이동
      if (data.result.pharmacies.length === 0 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
        refetch();
      }
    }
  }, [data, currentPage, refetch]);

  const displayData = data?.result;
  const totalPages = displayData?.total_pages || 1;

  const handlePharmacyBookmarkToggle = (place_id: string) => {
    setPharmacies(prev => {
      const newPharmacies = prev.filter(pharmacy => pharmacy.place_id !== place_id);
      // 현재 페이지의 마지막 아이템을 삭제한 경우
      if (newPharmacies.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      return newPharmacies;
    });
    refetch(); // 데이터 새로고침
  };

  const handleCountryFilter = (country: string) => {
    setSelectedCountry(country);
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
            약국 저장 목록 <span className="text-gray-600">{displayData?.total_elements}</span>개
          </h1>
        </div>
        <div className="md:w-full w-screen -mx-5 md:-mx-0 h-[1px] bg-gray-100 lg:hidden" />
          <div className="w-full">
            <div className="flex gap-2 overflow-x-auto lg:overflow-hidden w-full lg:w-auto flex-nowrap lg:flex-wrap scrollbar-hide">          
              <FilterButton text="전체" isSelected={selectedCountry === "ALL"} onClickFn={() => handleCountryFilter("ALL")} />
              <FilterButton text="한국" isSelected={selectedCountry === "KOREA"} onClickFn={() => handleCountryFilter("KOREA")} />
              <FilterButton text="미국" isSelected={selectedCountry === "USA"} onClickFn={() => handleCountryFilter("USA")}/>
            </div>
          </div>
      </div>

      {/* 🔹 데이터가 있을 경우 */}
      {displayData?.total_elements !== 0 ? (
        <>
          <div className="w-full py-5 grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow lg:py-9">
            {pharmacies.map((pharmacy) => ( 
                <PharmacysCard key={pharmacy.place_id} {...pharmacy} onBookmarkToggle={handlePharmacyBookmarkToggle} />
              ))}
          </div>

          <PageNavigator
            totalPage={totalPages}
            isFirst={currentPage === 1}
            isLast={currentPage === totalPages}
            page={currentPage}
            setPage={setCurrentPage} />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center flex-grow my-[100px]">
          <span className="text-gray-300 text-headline-m md:text-m-body2-r">
            저장한 약국이 없어요.
          </span>
          <div className="inline-flex gap-1">
            <Link
              href="/pharmacys"
              className="text-gray-300 text-headline-m md:text-m-body2-r underline whitespace-nowrap"
            >
              약국 찾기
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

export default MyPharmacys;
