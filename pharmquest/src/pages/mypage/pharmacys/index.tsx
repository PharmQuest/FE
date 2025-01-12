// 마이페이지_내 저장목록_약국

import FilterButton from "@/components/common/FilterButton";
import PharmacysCard from "../components/PharmacysCard";
import Header from "@/components/layout/Header";

export default function MyPharmacys() {
  const count = 8;
  return (
    <div>
      <div className="w-full h-[188px] bg-background mb-9">
          <Header />
          <div className="max-w-[920px] mx-auto flex items-center gap-4 mt-4">
              <div className="text-gray-600 text-display1-b">
                  마이페이지
              </div>
              <div className="text-gray-300 text-body2-r mt-2">
                  본 웹 사이트는 사용자의 편의를 위한 단순 참고용 정보 제공을 목표로 하며, 제공되는 정보는 의료 전문가의 조언을 대체 하지 않습니다.
              </div>
          </div>
      </div>
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
