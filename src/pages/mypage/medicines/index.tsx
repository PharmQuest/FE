import React, { useState } from "react";
import FilterButton from "@/components/common/FilterButton";
import MedicineCard from "@/components/common/MedicineCard";
import Link from "next/link";
import { LeftArrow } from "@public/svgs";
import PageNavigator from "@/components/common/PageNavigator";
import { axiosInstance } from "@/apis/axios-instance";
import { useQuery } from "@tanstack/react-query";

const MyMedicinesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("ALL");

  const { data, isLoading: isMedLoading } = useQuery({
    queryKey: ["mypageMedicines"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/mypage/medicine?page=1&country=${encodeURIComponent("전체")}`
      );
      return response.data;
    },
  });


  const displayData = data?.result;
  const totalPages = displayData?.total_pages || 1;

  if (isMedLoading)
    console.warn("마이페이지 상비약 로딩 중..");

  const handleCountryFilter = (country: string) => {
    setSelectedCountry(country);
    setCurrentPage(1);
  };

  return (
    <div className="xl:w-[900px] xl:mx-auto lg:w-[900px] lg:mx-[50px] md:w-[601px] md:mx-auto w-[calc(100%-40px)] mx-5 py-8 flex flex-col lg:py-9 h-full">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
        <div className="flex items-center ">
          <Link href="/mypage">
            <LeftArrow className="w-6 h-6 text-gray-600 sm:block lg:hidden" />
          </Link>
          <h1 className="text-gray-600 lg:text-display2-b text-m-headline1-b ml-2 whitespace-nowrap">
            상비약 저장 목록 <span className="text-gray-600">{data?.result?.length || 0}</span>개
          </h1>
        </div>
        <div className="md:w-full w-screen -mx-5 md:-mx-0 h-[1px] bg-gray-100 lg:hidden" />
        <div className="flex gap-2 overflow-x-auto w-full lg:w-auto flex-wrap md:flex-nowrap">
          <FilterButton text="전체" isSelected={selectedCountry === "ALL"} onClickFn={() => handleCountryFilter("ALL")} />
          <FilterButton text="한국" isSelected={selectedCountry === "KOREA"} onClickFn={() => handleCountryFilter("KOREA")} />
          <FilterButton text="미국" isSelected={selectedCountry === "USA"} onClickFn={() => handleCountryFilter("USA")} />
        </div>
      </div>

      {/* ✅ 데이터가 있을 경우 */}
      {data?.result?.length > 0 ? (
        <>
          <div className="w-full py-5 grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow lg:py-9">
            {data?.result?.length.map((_, index: number) => (
              <MedicineCard 
                key={index} 
                medicineTableId={0} 
                brandName={""} 
                genericName={""} 
                splSetId={""} 
                imgUrl={""} 
                category={""} 
                country={""} />
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
        <div className="flex flex-col justify-center items-center h-full my-[100px]">
          <span className="text-gray-300 text-headline-m md:text-m-body2-r">
            저장한 상비약이 없어요.
          </span>
          <div className="inline-flex gap-1">
            <Link
              href="/medicines"
              className="text-gray-300 text-headline-m md:text-m-body2-r underline whitespace-nowrap"
            >
              상비약 리스트
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

export default MyMedicinesPage;
