import React, { useState } from "react";
import Image from "next/image";
import BookmarkIcon from "@public/svgs/bookmark.svg";

interface TableData {
  label: string;
  value: string;
}

interface ProductBasicInfoProps {
  title: string;
  imageUrl?: string; 
  tags: string[];
  tableData: TableData[];
}

const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({
  title,
  imageUrl = "/images/no_image.webp", 
  tags = [],
  tableData = [],
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imgSrc, setImgSrc] = useState(imageUrl); 

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="relative h-auto md:h-[248px] md:p-6 sm:p-10 rounded-lg border border-[#eaeaea] flex flex-col md:flex-row justify-start items-start gap-4 md:gap-6">
      {/* 북마크 버튼 */}
      <button
        className="absolute lg:top-6 lg:right-6 md:top-6 md:right-6 sm:top-2 sm:right-1 w-7 h-7 flex justify-center items-center"
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

      <div className="relative w-full md:max-w-[200px] h-[200px] sm:max-w-[320px] sm:relative md:static border border-gray-200 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        <Image
          src={imgSrc}
          alt="제품 이미지"
          width={200}
          height={200}
          className="object-cover w-full h-full"
          onError={() => setImgSrc("/images/no_image.webp")}
        />
      </div>

      <div className="w-full md:w-[406px] h-auto md:h-48 flex flex-col justify-between items-start">
        <div className="self-stretch flex flex-col-reverse md:flex-col gap-3">
          <h3 className="lg:w-full md:w-[300px] text-gray-600 text-headline-b">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <div
                key={idx}
                className="px-2 py-0.5 bg-primary-50 text-subhead2-sb text-gray-500"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="h-auto md:h-[88px] w-full">
          {tableData.map((item, idx) => (
            <div key={idx} className="grid grid-cols-[auto_10px_1fr] gap-2 items-center w-full">
              <span className="text-gray-400 text-subhead1-sb">{item.label}</span>
              <span className="text-gray-400 text-subhead1-sb">|</span>
              <span className="text-gray-400 text-subhead1-sb">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductBasicInfo;
