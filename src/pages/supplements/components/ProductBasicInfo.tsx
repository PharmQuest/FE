/* eslint-disable */

import React, { useState, useEffect } from "react";
import Image from "next/image";
import BookmarkIcon from "@public/svgs/bookmark.svg";
// import { axiosInstance } from "@/apis/axios-instance";
// import axios from "axios";

interface TableData {
  label: string;
  value: string;
}

interface ProductBasicInfoProps {
  id: number;
  title: string;
  imageUrl?: string;
  tags: string[];
  tableData: TableData[];
  isBookmarked: boolean;
  onBookmarkToggle: (id: number) => void;
}

const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({
  id,
  title,
  imageUrl = "/images/no_image.webp",
  tags = [],
  tableData = [],
  isBookmarked = false,
  onBookmarkToggle,
}) => {
  //const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const [imgSrc, setImgSrc] = useState(imageUrl);

  const toggleBookmark = () => {
    setBookmarked(!isBookmarked);
  };

  return (
    <div
      className={`
        lg:gap-5 lg:p-5
        md:flex-row md:relative 
        flex flex-col border border-gray-100 bg-white mt-5 rounded-xl p-4 gap-4
      `}
    >

      <div
        className={`
          lg:max-w-[200px]
          md:self-center
          border border-solid border-gray-200 rounded-lg overflow-hidden grow aspect-ratio-1/1
        `}
      >
        <Image
          priority
          className="w-full h-full object-cover"
          src={imgSrc}
          alt="제품 이미지"
          width={100}
          height={100}
          onError={() => setImgSrc("/images/no_image.webp")}
        />
      </div>

      <div className="w-full md:w-[406px] lg:h-[200px] h-auto md:h-48 flex flex-col justify-between items-start">
        <div className="self-stretch flex flex-col-reverse md:flex-col gap-3">
          <h3 className="text-gray-600 text-headline-b">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <div
                key={idx}
                className="px-2 py-0.5 bg-primary-50 rounded-lg text-subhead2-sb text-gray-500"
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

      {/* ✅ 북마크 버튼 */}
      <button onClick={() => onBookmarkToggle(id)} aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}>   
        <BookmarkIcon
          stroke={bookmarked ? "#FFD755" : "#707070"}
          fill={bookmarked ? "#FFD755" : "none"}
          className={`
            lg:right-6 lg:top-6 lg:w-7
            md:block 
            w-6 absolute hidden right-4 top-4
          `}
          onClick={toggleBookmark}
        />
      </button>
    </div>
  );
};

export default ProductBasicInfo;
