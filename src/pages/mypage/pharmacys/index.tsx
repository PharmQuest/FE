// 마이페이지_내 저장목록_약국

import FilterButton from "@/components/common/FilterButton";
import PharmacysCard from "../components/PharmacysCard";

export default function MyPharmacys() {
  const count = 8;
  return (
    <div>
      <div className="max-w-[1280px] w-[80%] mx-auto my-10 px-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-gray-600 text-display1-b">
            약국 저장 목록 {count}개
          </div>
          <div className="flex gap-2">
            <FilterButton text="전체" isSelected />
            <FilterButton text="한국" />
            <FilterButton text="미국" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <PharmacysCard />
          <PharmacysCard />
          <PharmacysCard />
          <PharmacysCard />
          <PharmacysCard />
          <PharmacysCard />
          <PharmacysCard />
          <PharmacysCard />
        </div>
      </div>
    </div>
  );
}
