import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BookmarkIcon } from "@public/svgs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/apis/axios-instance";
import axios from "axios";

interface PharmacysCardProps {
  name: string;
  region: string;
  img_url: string;
  latitude: number;
  longitude: number;
  isScrapped: boolean;
  place_id: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: (place_id: string) => void;
}

const PharmacysCard: React.FC<PharmacysCardProps> = ({
  name,
  region,
  img_url,
  latitude,
  longitude,
  isScrapped,
  place_id,
  onBookmarkToggle,
}) => {
  const [bookmarked, setBookmarked] = useState(isScrapped);
  const [src, setSrc] = useState(img_url || "/images/no_image.webp"); // 기본 이미지 설정
  const queryClient = useQueryClient();

  useEffect(() => {
    setBookmarked(isScrapped);
  }, [isScrapped]);

  const { mutate: toggleScrap } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.patch(`/pharmacy/${place_id}`);
      return response.data;
    },
    onSuccess: (data) => {
      // 스크랩 상태 토글
      setBookmarked(prev => !prev);

      // 성공 메시지 표시
      if (data.code === "PHARMACY201") {
        console.log("약국이 스크랩되었습니다.");
      } else if (data.code === "PHARMACY202") {
        console.log("약국 스크랩이 해제되었습니다.");
      }

      // 약국 목록 데이터 갱신
      queryClient.invalidateQueries({ 
        queryKey: ["mypagePharmacys"] 
      });
      
      
      if (onBookmarkToggle) {
        onBookmarkToggle(place_id);
      }
    },
    onError: (error) => {
      // 에러 메시지 처리
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "스크랩 처리 중 오류가 발생했습니다.";
        console.log(errorMessage);
        
        // 스크랩 상태 원복
        setBookmarked(isScrapped);
      }
    },
  });

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    // setBookmarked((prev) => !prev);
    // if (onBookmarkToggle) onBookmarkToggle();
    toggleScrap();
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
          stroke={bookmarked ? "#FFD755" : "#707070"}
          fill={bookmarked ? "#FFD755" : "none"}
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
        <div className="text-gray-600 text-subhead1-sb">{name}</div>
        <div className="text-gray-400 text-body1-r">{region}</div>
      </div>
    </div>
  );
};

export default PharmacysCard;
