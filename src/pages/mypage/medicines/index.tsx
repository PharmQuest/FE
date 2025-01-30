import React, { useState } from "react";
import FilterButton from "@/components/common/FilterButton";
import MedicineCard from "@/components/common/MedicineCard";
import Link from "next/link";
import { LeftArrow } from "@public/svgs";

const MyMedicinesPage = () => {
  const medicines: [] = []; // 데이터 없음
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(medicines.length / itemsPerPage);
  const paginatedMedicines = medicines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-[920px] px-4 md:px-0 py-4 flex items-center md:shadow-none shadow-[0px_2px_0px_0px_rgba(0,0,0,0.05)] mb-4">
        <Link href="/mypage">
          <LeftArrow className="w-6 h-6 text-gray-600 sm:block lg:hidden" />
        </Link>
        <h1 className="text-gray-600 text-display2-b text-lg ml-2">
          상비약 저장 목록 <span className="text-gray-600">{medicines.length}</span>개
        </h1>
      </div>
      <div className="w-full max-w-[920px] flex flex-col md:flex-row md:items-center md:gap-4 px-4 md:px-0 mb-4">
        <div className="flex gap-2 overflow-x-auto">
          <FilterButton text="전체" isSelected />
          <FilterButton text="한국" />
          <FilterButton text="미국" />
        </div>
      </div>

      {/* 데이터가 있을 경우 */}
      {medicines.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
            {paginatedMedicines.map((_, index) => (
              <MedicineCard key={index} />
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 border rounded-md text-gray-600 disabled:opacity-50 text-sm md:text-base"
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded-md text-sm md:text-base ${
                  currentPage === index + 1
                    ? "bg-primary-500 text-white"
                    : "text-gray-600"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-3 py-1 border rounded-md text-gray-600 disabled:opacity-50 text-sm md:text-base"
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </>
      ) : (
        // 🔹 **데이터가 없을 경우 화면을 꽉 채우고 중앙 정렬 + 한 줄 유지**
        <div className="flex flex-col justify-center items-center flex-grow">
          <span className="text-[#999999] text-sm md:text-base font-normal font-pretendard leading-[21px]">
            저장한 상비약이 없어요.
          </span>
          <div className="inline-flex gap-1">
            <Link
              href="/medicines"
              className="text-[#999999] text-sm md:text-base font-normal font-pretendard underline leading-[21px] whitespace-nowrap"
            >
              상비약 리스트
            </Link>
            <span className="text-[#999999] text-sm md:text-base font-normal font-pretendard leading-[21px]">
              에서 항목을 추가해보세요!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMedicinesPage;
