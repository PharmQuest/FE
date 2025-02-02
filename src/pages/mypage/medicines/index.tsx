import React, { useState } from "react";
import FilterButton from "@/components/common/FilterButton";
import MedicineCard from "@/components/common/MedicineCard";
import Link from "next/link";
import { LeftArrow, ArrowRightIcon } from "@public/svgs";
import { mockMedicines } from "@/mocks/supplements";

const MyMedicinesPage = () => {
  const medicines = mockMedicines;
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(medicines.length / itemsPerPage);
  const paginatedMedicines = medicines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="lg:w-[900px] lg:mx-auto
        md:w-[600px] md:mx-auto
        sm:w-full 
        min-h-[calc(100vh-412px)] w-full sm:px-5 lg:px-0 flex flex-col items-center py-8">
      <div className="w-full flex flex-col lg:flex-row md:shadow-none shadow-[0px_2px_0px_0px_rgba(0,0,0,0.05) items-start lg:items-center gap-4 lg:gap-6">
        <div className="flex items-center">
          <Link href="/mypage">
            <LeftArrow className="w-6 h-6 text-gray-600 sm:block lg:hidden" />
          </Link>
          <h1 className="text-gray-600 text-display2-b text-lg ml-2 whitespace-nowrap">
            상비약 저장 목록 <span className="text-gray-600">{medicines.length}</span>개
          </h1>
        </div>

        <div className="flex gap-2 overflow-x-auto w-full lg:w-auto flex-wrap lg:flex-nowrap lg:ml-4">
          <FilterButton text="전체" isSelected />
          <FilterButton text="한국" />
          <FilterButton text="미국" />
        </div>
      </div>

      {/* ✅ 데이터가 있을 경우 */}
      {medicines.length > 0 ? (
        <>
          <div className="w-full py-8 grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
            {paginatedMedicines.map((_, index) => (
              <MedicineCard key={index} />
            ))}
          </div>

          {/* ✅ 페이지네이션 */}
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
        </>
      ) : (
        <div className="flex flex-col justify-center items-center flex-grow">
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
            <span className="text-gray-300 text-gray-300 text-headline-m md:text-m-body2-r">
              에서 항목을 추가해보세요!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMedicinesPage;
