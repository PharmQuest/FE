import React, { useState } from "react";
import SupplementCard from "@/components/common/SupplementCard";
import FilterButton from "@/components/common/FilterButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowRightIcon, LeftArrow } from "@public/svgs";

const supplements = [
  { id: "1", country: "미국", title: "네이처메이드", tags: ["면역력강화", "피부건강"], isBookmarked: true },
  { id: "2", country: "미국", title: "네이처메이드", tags: ["소화건강", "피로회복"], isBookmarked: false },
  { id: "3", country: "미국", title: "네이처메이드", tags: ["눈건강", "멀티비타민"], isBookmarked: true },
  { id: "4", country: "미국", title: "네이처메이드", tags: ["눈건강", "멀티비타민"], isBookmarked: true },
  { id: "5", country: "미국", title: "네이처메이드", tags: ["면역력강화", "피부건강"], isBookmarked: true },
  { id: "6", country: "미국", title: "네이처메이드", tags: ["소화건강", "피로회복"], isBookmarked: false },
  { id: "7", country: "미국", title: "네이처메이드", tags: ["눈건강", "멀티비타민"], isBookmarked: true },
  { id: "8", country: "미국", title: "네이처메이드", tags: ["눈건강", "멀티비타민"], isBookmarked: true },
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
    <div className="flex flex-col items-center py-8 px-4">
      <div className="xl:w-[900px] xl:mx-auto lg:w-[900px] lg:mx-[50px] md:w-[601px] md:mx-auto sm:w-full sm:mx-[20px] w-full mx-[20px] flex flex-col lg:flex-row items-start lg:items-center mb-4 gap-4 lg:gap-6">
        <div className="flex items-center ">
          <Link href="/mypage">
            <LeftArrow className="w-6 h-6 text-gray-600 sm:block lg:hidden" />
          </Link>
          <h1 className="text-gray-600 text-display1-b text-xl ml-2 whitespace-nowrap">
            영양제 저장 목록 <span className="text-gray-600">{supplements.length}</span>개
          </h1>
        </div>
        <div className="xl:w-[900px] xl:mx-auto lg:w-[900px] lg:mx-[50px] md:w-[601px] md:mx-auto sm:w-full sm:mx-[20px] w-full mx-[20px] ">
          <div className="flex gap-2 overflow-x-auto lg:overflow-hidden w-full lg:w-auto flex-nowrap lg:flex-wrap scrollbar-hide">
            <FilterButton text="전체" isSelected />
            <FilterButton text="면역력" />
            <FilterButton text="피로회복" />
            <FilterButton text="소화건강" />
            <FilterButton text="피부건강" />
          </div>
        </div>
      </div>


      <div className="py-8 xl:w-[900px] xl:mx-auto lg:w-[900px] lg:mx-[50px] md:w-[601px] md:mx-auto sm:w-full sm:mx-[20px] w-full mx-[20px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-5">
        {paginatedSupplements.map((supplement) => (
          <div key={supplement.id} onClick={() => handleCardClick(supplement.id)}>
            <SupplementCard {...supplement} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-6 space-x-3 py-10">
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
          className="flex items-center"
          disabled={currentPage === totalPages}
        >
          <ArrowRightIcon className="w-5 h-3 text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default SupplementPage;
