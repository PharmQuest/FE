import React, { useState, useEffect } from "react";
import SupplementCard from "@/components/common/SupplementCard";
import { useRouter } from "next/router";
import FilterButton from "@/components/common/FilterButton";

const supplements = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  country: i % 2 === 0 ? "미국" : "한국",
  title: i % 2 === 0 ? "네이처메이드" : "홍삼정",
  tags: i % 2 === 0 ? ["면역력강화", "피부건강"] : ["소화건강", "피로회복"],
  isBookmarked: Math.random() > 0.5, // 랜덤 북마크 상태
}));

const SupplementPage: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // 기본 20개 (웹)

  // 화면 크기에 따라 페이지당 아이템 개수 변경
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(10); // 모바일에서는 10개
      } else {
        setItemsPerPage(20); // 웹에서는 20개
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

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
      <div className="w-full max-w-[920px] flex gap-2 mb-4 overflow-x-auto px-4 sm:hidden lg:flex">
        <h2 className="text-display2-b text-gray-600">전체</h2>
        <FilterButton text="전체" />
        <FilterButton text="면역력강화" />
        <FilterButton text="피로회복" />
        <FilterButton text="소화건강" />
        <FilterButton text="피부건강" />
      </div>

      {/* 🔹 영양제 리스트 */}
      <div className="w-full max-w-[920px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {paginatedSupplements.map((supplement) => (
          <div key={supplement.id} onClick={() => handleCardClick(supplement.id)}>
            <SupplementCard {...supplement} />
          </div>
        ))}
      </div>

      {/* 🔹 페이지네이션 */}
      <div className="w-full max-w-[920px] flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 border rounded-md text-gray-600 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 border rounded-md ${
              currentPage === index + 1 ? "bg-primary-500 text-white" : "text-gray-600"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 border rounded-md text-gray-600 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default SupplementPage;
