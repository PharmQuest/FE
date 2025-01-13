import React from "react";

interface SupplementCardProps {
  country: string;
  title: string;
  tags: string[];
  isBookmarked?: boolean;
}

const SupplementCard: React.FC<SupplementCardProps> = ({
  country,
  title,
  tags,
  // isBookmarked = false,
}) => {
  return (
    <div className="h-[226px] flex flex-col justify-start items-start">
      {/* 이미지 영역 */}
      <div className="relative w-[168px] h-[168px] bg-gray-100 rounded-lg">
        {/* 그라데이션 효과 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/20 rounded-lg"></div>

        {/* 북마크 버튼 */}
        <div className="absolute bottom-2 right-2 w-[30px] h-[30px] justify-center items-center">
          <img
            src={"/svgs/bookmark.svg"}
            alt="북마크"
            className="w-full h-full"
            style={{ filter: "brightness(0) invert(1)" }}
            // onClick={() => {}}
          />
        </div>
      </div>

      {/* 텍스트 정보 */}
      <div className="h-[58px] pl-1 pt-2 flex flex-col justify-start gap-2 w-[168px]">
        <div className="flex justify-start items-center gap-1 w-full">
          <span className="text-black text-base font-semibold leading-normal whitespace-nowrap">
            [{country}]
          </span>
          <span className="text-black text-base font-semibold leading-normal truncate overflow-hidden text-ellipsis" title={title}>
            {title}
          </span>
        </div>
        <div className="self-stretch justify-start items-center gap-1.5 inline-flex">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className="px-2 bg-[#e7f3ee] rounded justify-center items-center flex"
            >
              <div className="text-[#474747] text-xs font-semibold leading-[18px]">
                {tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplementCard;
