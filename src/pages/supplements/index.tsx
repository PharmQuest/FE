import { useState } from "react";
import SupplementCard from "@/components/common/SupplementCard";
import { useRouter } from "next/router";
import FilterButton from "@/components/common/FilterButton";
import { ArrowRightIcon } from "@public/svgs"; // ArrowRight 추가

const supplements = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  country: i % 2 === 0 ? "미국" : "한국",
  title: i % 2 === 0 ? "네이처메이드" : "홍삼정",
  tags: i % 2 === 0 ? ["면역력강화", "피부건강"] : ["소화건강", "피로회복"],
  isBookmarked: Math.random() > 0.5,
}));

const SupplementPage: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // 고정값

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
      <div className="xl:px-0 xl:w-[900px] xl:px-auto lg:w-[900px] lg:px-[50px] md:w-[601px] w-full flex gap-2 mb-4 overflow-x-auto px-4 hidden lg:flex">
        <h2 className="text-display2-b text-gray-600">전체</h2>
        <FilterButton text="전체" />
        <FilterButton text="면역력강화" />
        <FilterButton text="피로회복" />
        <FilterButton text="소화건강" />
        <FilterButton text="피부건강" />
      </div>

      {/* 🔹 영양제 리스트 */}
      <div className="xl:px-0 xl:w-[900px] lg:w-[900px] lg:px-[50px] md:w-[601px] w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {paginatedSupplements.map((supplement) => (
          <div key={supplement.id} onClick={() => handleCardClick(supplement.id)}>
            <SupplementCard {...supplement} />
          </div>
        ))}
      </div>

      {/* 🔹 페이지네이션 */}
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
    </div>
  );
};

export default SupplementPage;
