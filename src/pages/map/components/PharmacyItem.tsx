import React from "react";
import IsOpenTag from "./IsOpenTag";
import { MapFindIcon } from "@public/svgs";

interface PharmacyItemProps {
  name: string;
  hours: string;
  distance: string;
  location: string;
}

const PharmacyItem: React.FC<PharmacyItemProps> = ({
  name = "다나아약국",
  hours = "18:00에 영업 종료",
  distance = "500m",
  location = "서울 중구 중앙동",
}) => {
  return (
    <>
      {/* 약국 정보 */}
      <div className="h-[126px] bg-white border-b border-gray-100 pl-7 py-5 flex justify-start items-center gap-3 self-stretch">
        <div className="w-[86px] h-[86px] bg-[#cccccc] rounded" />
        <div className="flex w-[145px] flex-col items-start">
          <div className="flex items-center mb-3 gap-[3px]">
            <div className="text-subhead1-sb text-gray-600 text-[16px] font-['Pretendard Variable'] leading-normal">
              {name}
            </div>
            <IsOpenTag isOpen={true} />
          </div>
          {/* 약국 세부 정보 */}
          <div className="self-stretch h-11 flex-col justify-start items-start gap-0.5 flex">
            <div className="text-gray-400 text-sm font-normal font-['Pretendard Variable'] leading-[21px]">
              {hours}
            </div>
            <div className="items-center gap-1.5 inline-flex">
              <div className="text-gray-500 text-sm font-semibold">
                {distance}
              </div>
              <div className="w-0.5 h-0.5 bg-[#cccccc] rounded-full"></div>
              <div className="text-gray-400 text-sm">{location}</div>
            </div>
          </div>
        </div>
        {/* 경로 */}
        <div className="w-[30px] h-[52px] justify-self-end px-">
          <MapFindIcon />
        </div>
      </div>
    </>
  );
};

export default PharmacyItem;
