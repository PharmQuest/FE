// 해외 인기 영양제 메인화면
import React from "react";
import SupplementCard from "./components/SupplementCard";
import AdBanner from "./components/AdBanner";

const supplements = [
  { country: "미국", title: "네이처메이드", tags: ["면역력강화", "피부건강"], isBookmarked: true },
  { country: "미국", title: "네이처메이드", tags: ["소화건강", "피로회복"], isBookmarked: false },
  { country: "미국", title: "네이처메이드", tags: ["눈건강", "멀티비타민"], isBookmarked: true },
  { country: "미국", title: "네이처메이드", tags: ["눈건강", "멀티비타민"], isBookmarked: true },
  { country: "한국", title: "몸에좋고 장에좋고 ...", tags: ["멀티비타민", "뼈관절건강"], isBookmarked: false },
];

const SupplementPage: React.FC = () => {
  return (
    <div className="min-h-screen justify-center items-center">
      {/* 메인 콘텐츠 */}
      <div className="container mx-auto max-w-[920px] py-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-[80%]">
        {supplements?.map((supplement, idx) => (
          <SupplementCard key={idx} {...supplement} />
        ))}
      </div>

      {/* 광고 배너 */}
      <div className="mt-6">
        <AdBanner />
      </div>
    </div>
  );
};

export default SupplementPage;
