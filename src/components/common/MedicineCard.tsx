import { BookmarkIcon } from "@public/svgs";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { MedicineCardProps } from "@/types/medicine";

const MedicineCard: React.FC<MedicineCardProps> = ({
  medicineTableId,
  brandName,
  genericName,
  imgUrl,
  category,
  country,
}) => {
  const router = useRouter();
  const [isBookmark, setIsBookmark] = useState(false);
  const [src, setSrc] = useState(imgUrl);

  const handleBoomark = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 컴포넌트 클릭 방지
    setIsBookmark(!isBookmark);
    // 추후에 추가할 북마크 추가 기능 API ~~
  };

  return (
    <div
      className={`
        md:p-5 md:pr-4 md:rounded-lg md:h-[178px]
        h-[124px] border-gray-100 border p-3 flex items-center hover:cursor-pointer rounded truncate`}
      onClick={() => router.push(`medicines/${medicineTableId}`)}
    >
      {/* medicine-image */}
      <div
        className={`
        md:w-[138px] md:h-[138px] 
        rounded w-[100px] h-[100px] flex items-center`}
      >
        <Image
          src={src}
          alt={`${brandName} 이미지`}
          width="100"
          height="100"
          className={`w-full rounded`}
          onError={() => setSrc("/images/no_image.webp")}
          priority
        />
      </div>
      {/* info-wrapper */}
      <div
        className={`
          md:gap-3 md:ml-4 
          flex flex-col gap-2 ml-3 grow`}
      >
        {/* tag */}
        <div
          className={`
            md:text-body2-r text-white bg-primary-200 w-fit rounded px-2 pt-0.5 pb-[1px] text-center
            text-m-caption2-r
            `}
        >
          {country}
        </div>
        <div
          className={`
            md:gap-6
            flex gap-2`}
        >
          <div
            className={`
              md:gap-1 md:w-14 md:text-subhead1-sb
              flex flex-col text-m-subhead1-sb gap-0.5
              `}
          >
            <p>제품명</p>
            <p>일반명</p>
            <p>분류</p>
          </div>
          <div
            className={`
              md:gap-1 md:text-body1-r
              flex flex-col text-m-body2-r gap-0.5`}
          >
            <p className={`max-w-[100px] truncate`}>{brandName}</p>
            <p className={`max-w-[100px] truncate`}>{genericName}</p>
            <p className={`max-w-[100px] truncate`}>{category}</p>
          </div>
        </div>
      </div>
      <div
        className={`
          h-[100%] relative min-w-[30px]`}
      >
        <BookmarkIcon
          className={`
            md:w-[30px]
            absolute top-0 right-0 w-6`}
          onClick={(e: React.MouseEvent) => handleBoomark(e)}
          stroke={isBookmark ? "#FFD755" : "#707070"}
          fill={isBookmark ? "#FFD755" : "none"}
        />
      </div>
    </div>
  );
};

export default MedicineCard;
