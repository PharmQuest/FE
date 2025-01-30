import React, { useState } from "react";
import { BookmarkIcon } from "@public/svgs";

interface PharmacysCardProps {
  pharmacyName?: string;
  status?: boolean;
  closingTime?: string;
  distance?: string;
  location?: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void; // 북마크 상태 변경 함수
}

const PharmacysCard: React.FC<PharmacysCardProps> = ({
  pharmacyName = "다나아약국",
  status = true,
  closingTime = "18:00",
  distance = "500m",
  location = "서울 중구 중앙동",
  isBookmarked = false,
  onBookmarkToggle,
}) => {
  const [isBookmark, setIsBookmark] = useState(isBookmarked);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    setIsBookmark((prev) => !prev);
    if (onBookmarkToggle) onBookmarkToggle();
  };

  return (
    <div className="relative min-w-[250px] max-w-[500px] h-[126px] pl-5 py-5 rounded-lg border border-gray-200 flex items-center gap-3">
      {/* Bookmark Icon */}
      <div className="absolute top-4 right-2 h-[100%]">
        <BookmarkIcon
          className="cursor-pointer"
          onClick={handleBookmark}
          stroke={isBookmark ? "#FFD755" : "#707070"}
          fill={isBookmark ? "#FFD755" : "none"}
        />
      </div>

      {/* Thumbnail */}
      <div className="w-[86px] h-[86px] bg-gray-200 rounded"></div>

      {/* Content */}
      <div className="flex-1 flex-col justify-start items-start gap-3">
        {/* Header */}
        <div className="flex items-center gap-[3px]">
          <div className="text-gray-600 text-base font-semibold">{pharmacyName}</div>
          <div
            className={`px-1 rounded flex items-center ${
              status ? "bg-primary-300 text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            <div className="text-xs font-semibold">{status ? "영업중" : "영업종료"}</div>
          </div>
        </div>

        {/* Details */}
        <div className="w-full flex-col gap-0.5">
          <div className="text-gray-400 text-sm font-normal">{closingTime}에 영업 종료</div>
          <div className="flex items-center gap-1.5">
            <div className="text-gray-500 text-sm font-semibold">{distance}</div>
            <div className="w-0.5 h-0.5 bg-gray-200 rounded-full"></div>
            <div className="text-gray-400 text-sm font-normal">{location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacysCard;
