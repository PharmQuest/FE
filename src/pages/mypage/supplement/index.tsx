import React, { useState } from "react";
import SupplementCard from "@/components/common/SupplementCard";
import FilterButton from "@/components/common/FilterButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { LeftArrow } from "@public/svgs";

const supplements = [
  { id: "1", country: "미국", title: "네이처메이드", tags: ["면역력강화", "피부건강"], isBookmarked: true },
  { id: "2", country: "미국", title: "네이처메이드", tags: ["소화건강", "피로회복"], isBookmarked: false },
  { id: "3", country: "미국", title: "네이처메이드", tags: ["눈건강", "멀티비타민"], isBookmarked: true },
  { id: "4", country: "미국", title: "네이처메이드", tags: ["눈건강", "멀티비타민"], isBookmarked: true },
  { id: "5", country: "한국", title: "몸에좋고 장에좋고 ...", tags: ["멀티비타민", "뼈관절건강"], isBookmarked: false },
];

const itemsPerPage = 10;
const SupplementPage: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(supplements.length / itemsPerPage);
  const paginatedSupplements = supplements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCardClick = (id: string) => {
    router.push(`/supplements/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-[920px] px-4 md:px-0 py-4 flex items-center md:shadow-none shadow-[0px_2px_0px_0px_rgba(0,0,0,0.05)] mb-4">
        <Link href="/mypage">
          <LeftArrow className="w-6 h-6 text-gray-600 sm:block lg:hidden" />
        </Link>
        <h1 className="text-gray-600 text-display1-b text-xl ml-2">
          영양제 저장 목록 <span className="text-gray-600">{supplements.length}</span>개
        </h1>
      </div>
      {/* 🔹 필터 버튼과 타이틀을 한 줄 정렬 (웹에서) */}
      <div className="w-full max-w-[920px] flex flex-col lg:flex-row md:items-center md:gap-4 px-4 md:px-0 mb-4">
        {/* 🔹 필터 버튼 */}
        <div className="flex gap-2 overflow-x-auto">
          <FilterButton text="전체" isSelected />
          <FilterButton text="면역력" />
          <FilterButton text="피로회복" />
          <FilterButton text="소화건강" />
          <FilterButton text="피부건강" />
        </div>
      </div>

      <div className="w-full max-w-[920px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 flex-grow">
        {paginatedSupplements.map((supplement) => (
          <div key={supplement.id} onClick={() => handleCardClick(supplement.id)}>
            <SupplementCard {...supplement} />
          </div>
        ))}
      </div>

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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 border rounded-md text-gray-600 disabled:opacity-50 text-sm md:text-base"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default SupplementPage;
