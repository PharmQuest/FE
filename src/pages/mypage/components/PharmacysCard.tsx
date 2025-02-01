import React, { useState } from "react";
import Image from "next/image";
import { BookmarkIcon } from "@public/svgs";

interface PharmacysCardProps {
  pharmacyName?: string;
  location?: string;
  imageUrl?: string; // 이미지 URL 추가
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void; // 북마크 상태 변경 함수
}

const PharmacysCard: React.FC<PharmacysCardProps> = ({
  pharmacyName = "다나아약국",
  location = "서울 중구 중앙동",
  imageUrl,
  isBookmarked = false,
  onBookmarkToggle,
}) => {
  const [isBookmark, setIsBookmark] = useState(isBookmarked);
  const [src, setSrc] = useState(imageUrl || "/images/no_image.webp"); // 기본 이미지 설정

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    setIsBookmark((prev) => !prev);
    if (onBookmarkToggle) onBookmarkToggle();
  };

  return (
    <div
      className={`relative border border-gray-200 rounded-lg flex items-center gap-3 p-5
      xl:max-w-[400px] lg:w-[400px] md:max-w-full sm:w-full h-[160px] px-5`}
    >
      {/* 북마크 아이콘 */}
      <button
        className="absolute top-4 right-2 flex items-center justify-center w-7 h-7"
        onClick={handleBookmark}
      >
        <BookmarkIcon
          className="w-6 h-6 cursor-pointer"
          stroke={isBookmark ? "#FFD755" : "#707070"}
          fill={isBookmark ? "#FFD755" : "none"}
        />
      </button>

      {/* 약국 썸네일 */}
      <div
        className={`
          xl:max-w-[130px] lg:max-w-[130px] md:max-w-[100px] sm:max-w-[100px] 
          border border-solid border-gray-200 rounded-lg overflow-hidden aspect-square
        `}
      >
        <Image
          className="w-full h-full object-cover"
          src={src}
          alt="약국 이미지"
          width={100}
          height={100}
          onError={() => setSrc("/images/no_image.webp")}
        />
      </div>

      {/* 약국 정보 */}
      <div className="flex-1 flex flex-col justify-start gap-3">
        <div className="text-gray-600 text-base font-semibold">{pharmacyName}</div>
        <div className="text-gray-400 text-sm font-normal">{location}</div>
      </div>
    </div>
  );
};

export default PharmacysCard;
