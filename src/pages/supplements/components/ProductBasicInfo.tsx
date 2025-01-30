import React, { useState } from "react";
import BookmarkIcon from "@public/svgs/bookmark.svg";

interface TableData {
  label: string;
  value: string;
}

interface ProductBasicInfoProps {
  title: string;
  imageUrl: string;
  tags: string[];
  tableData: TableData[];
}

const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({
  title,
  // 사용하지 않는 변수가 있다면 해당 주석을 바로 위에 달면 빌드 에러 해결됩니다
  // eslint-disable-next-line
  imageUrl,
  tags = [],
  tableData = [],
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="relative h-auto md:h-[248px] p-6 rounded-lg border border-[#eaeaea] flex flex-col md:flex-row justify-start items-start gap-4 md:gap-6">
      {/* 북마크 버튼 - 전체 div의 오른쪽 위에 배치 */}
      <button
        className="absolute top-4 right-4 h-9 flex justify-center items-center"
        onClick={toggleBookmark}
        aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
      >
        <BookmarkIcon
          style={{
            stroke: isBookmarked ? "#FFD755" : "gray",
            fill: isBookmarked ? "#FFD755" : "none",
          }}
        />
      </button>

      {/* 이미지 */}
      <div className="relative w-full max-w-[200px] h-[200px]">
        {/* <img
          src={imageUrl}
          alt="제품 이미지"
          className="absolute top-[46px] w-full h-[108px] rounded border border-[#cccccc] object-cover"
        /> */}
        <div className="absolute w-full h-full top-0 left-0 border border-[#cccccc] rounded"></div>
      </div>

      {/* 텍스트 정보 */}
      <div className="w-full md:w-[406px] h-auto md:h-48 flex flex-col justify-between items-start">
        {/* 제목 및 태그 */}
        <div className="self-stretch flex flex-col gap-3">
          <h3 className="text-[#333333] text-xl font-bold leading-[30px]">
            {title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <div
                key={idx}
                className="px-2 py-0.5 bg-[#e7f3ee] rounded text-sm font-semibold text-[#474747]"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* 브랜드 / 제조사 / 원산지 정보 (| 정렬) */}
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
