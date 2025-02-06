// 상비약 리스트
import FilterButton from "@/components/common/FilterButton";
import MedicineCardList from "@/components/common/MedicineCardList";
import { useMedicineList } from "@/hooks/community/useMedicineList";
import { useState } from "react";

const FILTER_CATEGORY = [
  "전체",
  "진통/해열",
  "소화/위장",
  "감기/기침",
  "알레르기",
  "상처/소독",
  "멀미",
  "안약",
  "기타",
];

const Medicine = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const {
    data: medicines,
    isLoading,
    isError,
  } = useMedicineList({
    category: selectedCategory,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">데이터를 불러오는데 실패했습니다.</div>
      </div>
    );
  }

  return (
    <>
      {/* container */}
      <div
        className={`
        lg:w-[900px] lg:mx-auto
        md:w-[600px] md:mx-auto
        sm:w-full 
        min-h-[calc(100vh-412px)] w-full px-5`}
      >
        <div
          className={`
            md:text-display2-b md:my-9
            text-m-subhead1-sb flex items-center gap-3 w-100% my-3`}
        >
          <h1 className={`min-w-fit`}>전체</h1>

          <div
            className={`
              md:flex
              hidden h-fit content-center gap-2 overflow-y-scroll scrollbar-hide`}
          >
            {FILTER_CATEGORY?.map((item, index) => (
              <FilterButton key={index} text={item} />
            ))}
          </div>
        </div>
        <MedicineCardList medicines={medicines || []} />
      </div>
    </>
  );
};

export default Medicine;
