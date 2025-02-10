import React, { useState } from "react";
import Image from "next/image";
import { BookmarkIcon } from "@public/svgs";
interface PharmacysCardProps {
  pharmacyName?: string;
  location?: string;
  imageUrl?: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
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
      className={`
        relative md:p-5 md:pr-4 md:rounded-lg md:h-[178px]
        h-[124px] border-gray-100 border p-3 flex items-center hover:cursor-pointer rounded truncate
      `}
    >
      {/* ✅ 북마크 아이콘 (위치 수정) */}
      <button
        className="absolute top-4 right-4 z-10 flex items-center justify-center"
        onClick={handleBookmark}
      >
        <BookmarkIcon
          className="md:w-[30px] w-6 cursor-pointer"
          stroke={isBookmark ? "#FFD755" : "#707070"}
          fill={isBookmark ? "#FFD755" : "none"}
        />
      </button>

      {/* ✅ 약국 썸네일 */}
      <div
        className={`
          md:w-[138px] md:h-[138px] 
          rounded w-[100px] h-[100px] flex items-center
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

      {/* ✅ 약국 정보 */}
      <div className="ml-4 flex-1 flex flex-col justify-start self-start gap-y-1 sm:gap-y-2">
        <div className="text-gray-600 text-subhead1-sb">{pharmacyName}</div>
        <div className="text-gray-400 text-body1-r">{location}</div>
      </div>
    </div>
  );
};

export default PharmacysCard;
