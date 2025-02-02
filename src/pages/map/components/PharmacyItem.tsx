import React from "react";
import IsOpenTag from "./IsOpenTag";
import { MapFindIcon } from "@public/svgs";
import { Pharmacy } from "./MapComponent";
import Image from "next/image";
import { PharamacyImage } from "@public/images";

interface PharmacyItemProps {
  pharmacy: Pharmacy;
  isSelected: boolean;
  onClick: () => void;
  currentPosition: { lat: number; lng: number };
}

const PharmacyItem: React.FC<PharmacyItemProps> = ({
  pharmacy = {},
  isSelected,
  onClick,
  currentPosition,
}) => {
  const handleDirectionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const encodedPharmacyName = encodeURIComponent(pharmacy.name || "");
    const origin = `${currentPosition.lat},${currentPosition.lng}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${encodedPharmacyName}&destination_place_id=${pharmacy.place_id}&hl=ko`;
    window.open(url, "_blank");
  };

  const imageSrc = pharmacy.photos?.[0]
    ? pharmacy.photos[0].getUrl({ maxWidth: 86, maxHeight: 86 })
    : PharamacyImage;

  const backgroundClass = isSelected ? "bg-gray-50" : "bg-white";

  return (
    <div
      className={`h-[126px] ${backgroundClass} border-b border-gray-100 px-7 py-5 flex justify-start items-center gap-3 self-stretch cursor-pointer hover:bg-gray-50`}
      onClick={onClick}
    >
      <div className="relative w-[86px] h-[86px]">
        <Image
          src={imageSrc}
          alt={pharmacy.name || "약국 이미지"}
          fill
          priority
          className="object-cover rounded"
          unoptimized
        />
      </div>

      <div className="flex w-[145px] flex-col items-start">
        <div className="w-[176px] flex items-center mb-3 gap-1">
          <p className="max-w-[122px] lg:text-subhead1-sb text-m-subhead1-sb text-gray-600 truncate">
            {pharmacy.name}
          </p>
          <IsOpenTag isOpen={pharmacy.opening_hours?.isOpen() ?? false} />
        </div>

        <div className="self-stretch h-11 flex-col justify-start items-start gap-0.5 flex">
          <p className="text-gray-500 text-subhead2-sb">{pharmacy.distance}</p>
          <p className="w-[176px] text-gray-400 text-body2-r truncate">
            {pharmacy.vicinity}
          </p>
        </div>
      </div>

      <div
        className="w-[30px] h-[52px] ml-auto cursor-pointer hover:opacity-80"
        onClick={handleDirectionsClick}
      >
        <MapFindIcon />
      </div>
    </div>
  );
};

export default PharmacyItem;
