// 마이페이지_내 저장목록_상비약

import React from "react";
import FilterButton from "@/components/common/FilterButton";
import MedicineCard from "@/components/common/MedicineCard";

const MyMedicinesPage = () => {
  const count = 16;
  return (
    <div>
      <div className="w-full h-[188px] bg-background mb-9">
        마이페이지
      </div>
      <div className="max-w-[1280px] w-[80%] mx-auto my-10 px-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-gray-600 text-display1-b">
            상비약 저장 목록 {count}개
          </div>
          <div className="flex gap-2">
            <FilterButton text="전체" isSelected />
            <FilterButton text="한국" />
            <FilterButton text="미국" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <MedicineCard />
          <MedicineCard />
          <MedicineCard />
          <MedicineCard />
          <MedicineCard />
          <MedicineCard />
          <MedicineCard />
        </div>
      </div>
    </div>
  );
};

export default MyMedicinesPage;
