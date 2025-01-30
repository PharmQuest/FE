import { BookmarkIcon } from "@public/svgs";
import React, { useState } from "react";

interface SupplementCardProps {
  country: string;
  title: string;
  tags: string[];
  isBookmarked?: boolean;
  width?: number; 
}

const SupplementCard: React.FC<SupplementCardProps> = ({
  country,
  title,
  tags,
  isBookmarked = false,
  width = 168,
}) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmarkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setBookmarked(!bookmarked);   
  };

  return (
    <div
      className="flex flex-col justify-start items-start"
      style={{
        width: `${width}px`,
        height: `226px`,
      }}
    >
    
      <div
        className="relative bg-gray-100 rounded-lg"
        style={{
          width: "100%",
          height: `${width}px`,
        }}
      >
        {/* 이미지 */}
        <img
          src="https://via.placeholder.com/168" 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />

        {/* 그라데이션 효과 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/20 rounded-lg"></div>

        {/* 북마크 버튼 */}
        <button
          className="absolute bottom-2 right-2 flex justify-center items-center"
          aria-label={bookmarked ? "북마크 해제" : "북마크 추가"}
          onClick={handleBookmarkClick} 
        >
          <BookmarkIcon
            className="w-full h-full"
            stroke={bookmarked ? "#FFD755" : "white"}
            fill={bookmarked ? "#FFD755" : "none"}
          />
        </button>
      </div>

      {/* 텍스트 정보 */}
      <div className="pl-1 pt-2 flex flex-col justify-start gap-2 w-full">
        {/* 국가 및 제목 */}
        <div className="flex justify-start items-center gap-1 w-full">
          <span className="text-black text-base font-semibold leading-normal whitespace-nowrap">
            [{country}]
          </span>
          <span
            className="text-black text-base font-semibold leading-normal truncate overflow-hidden text-ellipsis"
            title={title}
          >
            {title}
          </span>
        </div>

        {/* 태그 영역 */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className="px-2 py-0.5 bg-[#e7f3ee] rounded text-xs font-semibold text-[#474747] flex items-center"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplementCard;
