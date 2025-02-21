import { BookmarkIcon } from "@public/svgs";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { MedicineCardProps } from "@/types/medicine";
import { useMedicineScrap } from "@/hooks/medicine/useMedicineScrap";

const MedicineCard: React.FC<MedicineCardProps> = ({
  medicineTableId,
  brandName,
  genericName,
  imgUrl,
  category,
  country,
  scrapped,
  onBookmarkToggle,
}) => {
  const router = useRouter();
  const [src, setSrc] = useState(imgUrl);
  const { isScraped, toggleScrap } = useMedicineScrap(
    medicineTableId,
    scrapped,
    () => {
      // 스크랩 토글 후 콜백
      onBookmarkToggle?.(medicineTableId);
    }
  );

  const getDisplayCountry = (countryCode: string): string => {
    if (countryCode.toLowerCase() === "usa") return "미국";
    if (countryCode.toLowerCase() === "korea") return "한국";
    return countryCode;
  };

  return (
    <div
      className={`
        md:p-5 md:pr-4 md:rounded-lg md:h-[178px] hover:bg-gray-50
        h-[124px] border-gray-100 border p-3 flex items-center hover:cursor-pointer rounded truncate`}
      onClick={() => router.push(`/medicines/${medicineTableId}`)}
    >
      <div
        className={`
        md:w-[138px] md:h-[138px] 
        rounded w-[100px] h-[100px] flex items-center flex-shrink-0`}
      >
        <Image
          src={src}
          alt={`${brandName} 이미지`}
          width="138"
          height="138"
          className={`w-full h-full rounded object-contain`}
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
          {getDisplayCountry(country)}
        </div>
        <div
          className={`
            md:gap-6
            flex gap-2`}
        >
          <div
            className={`
              md:gap-1 md:w-14 md:text-subhead1-sb
              flex flex-col text-m-subhead1-sb gap-0.5 flex-shrink-0
              `}
          >
            <p>제품명</p>
            <p>일반명</p>
            <p>분류</p>
          </div>
          <div
            className={`
              md:gap-1 md:text-body1-r
              flex flex-col text-m-body2-r gap-0.5 min-w-0`}
          >
            <p className="truncate max-w-[120px] md:max-w-72">{brandName}</p>
            <p className="truncate max-w-[120px] md:max-w-72">{genericName}</p>
            <p className="truncate max-w-[120px] md:max-w-72">{category}</p>
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
          onClick={toggleScrap}
          stroke={isScraped ? "#FFD755" : "#707070"}
          fill={isScraped ? "#FFD755" : "none"}
        />
      </div>
    </div>
  );
};

export default MedicineCard;
