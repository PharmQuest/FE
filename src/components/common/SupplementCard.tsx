import { BookmarkIcon } from "@public/svgs";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { axiosInstance } from "@/apis/axios-instance";
import axios from "axios";

interface ScrapResponse {
  code: string;
  message: string;
  result?: {
    supplementId: number;
    scrapCount: number;
    message: string;
    selectCategories: string[];
    scrapped: boolean;
  };
  isSuccess: boolean;
}

interface SupplementCardProps {
  id: number;
  country: string;
  productName: string;
  categories: string[];
  scrapped?: boolean;
  width?: number;
  src?: string;
  onBookmarkToggle?: (id: number) => void;
  ad?: boolean;
}

export default function SupplementCard({
  id,
  country,
  productName,
  categories,
  scrapped = false,
  width = 160,
  src = "/images/no_image.webp",
  onBookmarkToggle,
  ad = false,
}: SupplementCardProps) {
  const [bookmarked, setBookmarked] = useState(scrapped);
  const [imgSrc, setImgSrc] = useState(src || "/images/no_image.webp");

  useEffect(() => {
    setImgSrc(src || "/images/no_image.webp");
  }, [src]);

  useEffect(() => {
    setBookmarked(scrapped);
  }, [scrapped]);
  
  // const handleBookmarkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.stopPropagation();
  //   setBookmarked(!bookmarked);
  // };

  const handleBookmarkClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      const response = await axiosInstance.patch<ScrapResponse>(`/supplements/${id}/scrap`);
      
      if (response.data.code === "AUTH4001") {
        alert("로그인이 필요한 서비스입니다.");
        return;
      }
      
      if (response.data.isSuccess) {
        setBookmarked(!bookmarked);
        console.log("스크랩id=", id);
        console.log("스크랩data=", response);
        onBookmarkToggle?.(id);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          alert("로그인이 필요한 서비스입니다.");
          return;
        }
        console.error("북마크 처리 중 오류 발생:", error);
    }
  };

  return (
    <div
      className={`flex flex-col justify-start items-start ${ad ? 'cursor-default' : 'cursor-pointer'}`}
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
        <Image
          src={imgSrc || "/images/no_image.webp"}
          alt={productName || "이미지"}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          onError={() => setImgSrc("/images/no_image.webp")} // 이미지 로드 실패 시 대체 이미지 설정
          width={width}
          height={width}
        />

        {/* 그라데이션 효과 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/20 rounded-lg"></div>

        {/* 북마크 버튼 */}
        {!ad && (
          <button
            className="absolute bottom-2 right-2 flex justify-center items-center"
            aria-label={bookmarked ? "북마크 해제" : "북마크 추가"}
            onClick={(e) => handleBookmarkClick(e)}
          >
            <BookmarkIcon
              className={`w-[30px] h-[30px]`}
              stroke={bookmarked ? "#FFD755" : "white"}
              fill={bookmarked ? "#FFD755" : "none"}
            />
          </button>
        )}
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
            title={productName}
          >
            {productName}
          </span>
        </div>

        {/* 태그 영역 */}
        <div className="flex flex-nowrap gap-1.5 overflow-hidden overflow-x-auto scrollbar-hide whitespace-nowrap">
          {categories?.map((tag, idx) => (
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
