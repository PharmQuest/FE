import React from "react";
import SupplementCard from "./components/SupplementCard";
import AdBanner from "./components/AdBanner";
import { useRouter } from "next/router";

const supplements = [
  {
    id: "1",
    country: "미국",
    title: "네이처메이드",
    tags: ["면역력강화", "피부건강"],
    isBookmarked: true,
  },
  {
    id: "2",
    country: "미국",
    title: "네이처메이드",
    tags: ["소화건강", "피로회복"],
    isBookmarked: false,
  },
  {
    id: "3",
    country: "미국",
    title: "네이처메이드",
    tags: ["눈건강", "멀티비타민"],
    isBookmarked: true,
  },
  {
    id: "4",
    country: "미국",
    title: "네이처메이드",
    tags: ["눈건강", "멀티비타민"],
    isBookmarked: true,
  },
  {
    id: "5",
    country: "한국",
    title: "몸에좋고 장에좋고 ...",
    tags: ["멀티비타민", "뼈관절건강"],
    isBookmarked: false,
  },
];

const SupplementPage: React.FC = () => {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/supplements/${id}`);
  };

  return (
    <div className="min-h-screen justify-center items-center">
      {/* 메인 콘텐츠 */}
      <div className="container mx-auto max-w-[920px] py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-[80%]">
        {supplements?.map((supplement) => (
          <div
            key={supplement.id}
            onClick={() => handleCardClick(supplement.id)}
          >
            <SupplementCard {...supplement} />
          </div>
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
