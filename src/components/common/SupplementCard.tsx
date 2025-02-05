import { BookmarkIcon } from "@public/svgs";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface SupplementCardProps {
  country: string;
  title: string;
  tags: string[];
  isBookmarked?: boolean;
  width?: number;
  src?: string;
}

export default function SupplementCard({
  country,
  title,
  tags,
  isBookmarked = false,
  width = 160,
  src = "",
}: SupplementCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    setImgSrc(src || "/images/no_image.webp");
  }, [src]);

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
        className="relative bg-gray-100 rounded-lg -z-10"
        style={{
          width: "100%",
          height: `${width}px`,
        }}
      >
        {/* 이미지 */}
        <Image
          src={imgSrc}
          alt={title || "이미지"}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          onError={() => setImgSrc("/images/no_image.webp")} // 이미지 로드 실패 시 대체 이미지 설정
          width={width}
          height={width}
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
            className="w-[30px] h-[30px]"
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
        <div className="flex flex-nowrap gap-1.5 overflow-hidden truncate">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className="px-2 py-0.5 bg-primary-50 rounded text-subhead2-sb text-gray-500 flex items-center"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
