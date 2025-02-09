import React, { useState } from "react";
import FilterButton from "@/components/common/FilterButton";
import PharmacysCard from "../components/PharmacysCard";
import Link from "next/link";
import { mockPharmacies } from "@/mocks/pharmacys"; 
import { ArrowRightIcon, LeftArrow } from "@public/svgs";

const MyPharmacys = () => {
  const pharmacys = mockPharmacies;
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(pharmacys.length / itemsPerPage);
  const paginatedPharmacys = pharmacys.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="xl:w-[900px] xl:mx-auto lg:w-[900px] lg:mx-[50px] md:w-[601px] md:mx-auto w-[calc(100%-40px)] mx-5 py-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
        <div className="flex items-center ">
          <Link href="/mypage">
            <LeftArrow className="w-6 h-6 text-gray-600 sm:block lg:hidden" />
          </Link>
          <h1 className="text-gray-600 lg:text-display2-b text-m-headline1-b ml-2 whitespace-nowrap">
            약국 저장 목록 <span className="text-gray-600">{pharmacys.length}</span>개
          </h1>
        </div>
        <div className="md:w-full w-screen -mx-5 md:-mx-0 h-[1px] bg-gray-100 lg:hidden" />
          <div className="w-full">
            <div className="flex gap-2 overflow-x-auto lg:overflow-hidden w-full lg:w-auto flex-nowrap lg:flex-wrap scrollbar-hide">          
              <FilterButton text="전체" isSelected />
              <FilterButton text="한국" />
              <FilterButton text="미국" />
            </div>
          </div>
      </div>

      {/* 🔹 데이터가 있을 경우 */}
      {pharmacys.length > 0 ? (
        <>
          <div className="w-full py-5 grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow">
            {paginatedPharmacys.map((pharmacy) => ( 
                <PharmacysCard key={pharmacy.id} {...pharmacy} />
              ))}
          </div>

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

            {/* 🔹 오른쪽 이동 버튼 */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="flex flex-col align-center"
              disabled={currentPage === totalPages}
            >
              <ArrowRightIcon className="w-5 h-3 text-gray-300" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center flex-grow">
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
