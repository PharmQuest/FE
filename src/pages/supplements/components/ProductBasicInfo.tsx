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
    <div className="lg:p-6 md:flex-row border border-gray-100 rounded-xl p-4 flex flex-col md:gap-4 gap-1 mt-5">
      <div className="lg:w-[200px] lg:h-[200px] max-md:h-[200px] border border-gray-200 rounded-lg overflow-hidden">
          <Image
            className="w-full h-full object-contain"
            src={imgSrc}
            alt="제품 이미지"
            width={200}
            height={200}
            onError={() => setImgSrc("/images/no_image.webp")}
        />
      </div>

      <div className="flex flex-col gap-2 grow">
        <h3 className="text-gray-600 lg:text-headline-b text-m-headline2-b">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className="px-2 py-0.5 bg-primary-50 rounded text-subhead2-sb text-gray-500"
            >
              {tag}
            </div>
          ))}
        </div>

        <div className="h-auto w-full mt-auto">
          {tableData.map((item, idx) => (
            <div key={idx} className="grid grid-cols-[auto_10px_1fr] gap-2 items-center w-full">
              <span className="text-gray-400 text-m-subhead1-sb lg:text-subhead1-sb">{item.label}</span>
              <span className="text-gray-400 text-m-subhead1-sb lg:text-subhead1-sb">|</span>
              <span className="text-gray-400 text-m-body2-r lg:text-body1-r">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ 북마크 버튼 */}
      <div className="flex items-start gap-4 md:block hidden" onClick={() => onBookmarkToggle(id)} aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}>
        <BookmarkIcon
          className="w-6 cursor-pointer"
          stroke={bookmarked ? "#FFD755" : "#707070"}
          fill={bookmarked ? "#FFD755" : "none"}
          onClick={toggleBookmark}
        />
    
      </div>
    </div>
  );
};

export default ProductBasicInfo;
