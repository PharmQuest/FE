import React, { useState } from "react";
import FilterButton from "@/components/common/FilterButton";
import PharmacysCard from "../components/PharmacysCard";
import Link from "next/link";
import { mockPharmacies } from "@/mocks/pharmacys"; // ✅ 데이터 import
import { LeftArrow } from "@public/svgs";

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
    <div className="max-w-[1280px] lg:w-[80%] md:w-[100%] mx-auto my-10 px-4 min-h-screen flex flex-col">
      <div className="w-full max-w-[920px] px-4 md:px-0 py-4 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
        <div className="flex items-center">
          <Link href="/mypage">
            <LeftArrow className="w-6 h-6 text-gray-600 sm:block lg:hidden" />
          </Link>
          <h1 className="text-gray-600 text-display2-b text-lg ml-2 whitespace-nowrap">
            약국 저장 목록 <span className="text-gray-600">{pharmacys.length}</span>개
          </h1>
        </div>

        <div className="flex gap-2 overflow-x-auto w-full lg:w-auto flex-wrap lg:flex-nowrap lg:ml-4">
          <FilterButton text="전체" isSelected />
          <FilterButton text="한국" />
          <FilterButton text="미국" />
        </div>
      </div>

      {/* 🔹 데이터가 있을 경우 */}
      {pharmacys.length > 0 ? (
        <>
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-5 flex-grow">
            {paginatedPharmacys.map((pharmacy) => ( 
              <PharmacysCard key={pharmacy.id} {...pharmacy} />
            ))}
          </div>

          {/* 🔹 페이지네이션 (하단 고정) */}
          <div className="w-full max-w-[920px] flex justify-center items-center mt-auto py-6 space-x-2">
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
                  currentPage === index + 1 ? "bg-primary-500 text-white" : "text-gray-600"
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
        <div className="flex flex-col justify-center items-center flex-grow">
          <span className="text-gray-300 text-sm md:text-base font-normal font-pretendard leading-[21px]">
            저장한 약국이 없어요.
          </span>
          <div className="inline-flex gap-1">
            <Link
              href="/pharmacys"
              className="text-gray-300 text-sm md:text-base font-normal font-pretendard underline leading-[21px] whitespace-nowrap"
            >
              약국 찾기
            </Link>
            <span className="text-gray-300 text-sm md:text-base font-normal font-pretendard leading-[21px]">
              에서 항목을 추가해보세요!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPharmacys;
