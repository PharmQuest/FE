import React from "react";

interface PharmacysCardProps {
  pharmacyName?: string;
  status?: string;
  closingTime?: string;
  distance?: string;
  location?: string;
}

const PharmacysCard: React.FC<PharmacysCardProps> = ({
  pharmacyName = "다나아약국",
  status = "영업중",
  closingTime = "18:00",
  distance = "500m",
  location = "서울 중구 중앙동",
}) => {
  return (
    <div className="h-[126px] pl-5 py-5 rounded-lg border border-gray-200 justify-start items-center gap-3 inline-flex">
      {/* Thumbnail */}
      <div className="w-[86px] h-[86px] bg-gray-200 rounded"></div>

      {/* Content */}
      <div className="w-[145px] flex-col justify-start items-start gap-3 inline-flex">
        {/* Header */}
        <div className="bg-white justify-start items-center gap-[3px] inline-flex">
          <div className="text-gray-600 text-base font-semibold">{pharmacyName}</div>
          <div className="px-1 bg-primary-300 rounded justify-center items-center gap-2.5 flex">
            <div className="text-white text-xs font-semibold">{status}</div>
          </div>
        </div>

        {/* Details */}
        <div className="self-stretch h-11 flex-col justify-start items-start gap-0.5 flex">
          <div className="self-stretch text-gray-400 text-sm font-normal">
            {closingTime}에 영업 종료
          </div>
          <div className="self-stretch justify-start items-center gap-1.5 inline-flex">
            <div className="text-gray-500 text-sm font-semibold">{distance}</div>
            <div className="w-0.5 h-0.5 bg-gray-200 rounded-full"></div>
            <div className="text-gray-400 text-sm font-normal">{location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacysCard;
