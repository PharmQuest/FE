import React, { useState } from "react";
import BookmarkIcon from "@public/svgs/bookmark.svg";

interface TableData {
  label: string;
  value: string;
}

interface ProductBasicInfoProps {
  title: string;
  // imageUrl: string;  // ✅ 항상 존재한다고 가정 → 주석 처리
  tags: string[];
  tableData: TableData[];
}

const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({
  title,
  // imageUrl, // ✅ 주석 처리
  tags = [],
  tableData = [],
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="relative h-auto md:h-[248px] md:p-6 sm:p-10 rounded-lg border border-[#eaeaea] flex flex-col md:flex-row justify-start items-start gap-4 md:gap-6">
      <button
        className="absolute md:top-2 md:right-2 sm:top-2 sm:right-1 w-8 h-8 flex justify-center items-center"
        onClick={toggleBookmark}
        aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
      >
        <BookmarkIcon
          className="w-7 h-7"
          style={{
            stroke: isBookmarked ? "#FFD755" : "gray",
            fill: isBookmarked ? "#FFD755" : "none",
          }}
        />
      </button>

      <div className="relative w-full md:max-w-[200px] h-[200px] sm:max-w-[320px] sm:relative md:static">
        {/* <img
          src={imageUrl}
          alt="제품 이미지"
          className="w-full h-full rounded border border-gray-200 object-cover"
        /> */}
        <div className="w-full h-full border border-gray-200 rounded bg-gray-100"></div>
      </div>
      <div className="w-full md:w-[406px] h-auto md:h-48 flex flex-col justify-between items-start">
        <div className="self-stretch flex flex-col-reverse md:flex-col gap-3">
          <h3 className="text-gray-600 text-xl font-bold leading-[30px]">
            {title}
          </h3>

          {/* ✅ 태그 (sm에서는 제목 위, md 이상에서는 제목 아래) */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <div
                key={idx}
                className="px-2 py-0.5 bg-primary-50 rounded text-sm font-semibold text-[#474747]"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="h-auto md:h-[88px] w-full">
          {tableData.map((item, idx) => (
            <div key={idx} className="grid grid-cols-[auto_10px_1fr] gap-2 items-center w-full">
              <span className="text-gray-400 text-base font-semibold">{item.label}</span>
              <span className="text-gray-400 text-base font-semibold">|</span>
              <span className="text-gray-400 text-base font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductBasicInfo;
