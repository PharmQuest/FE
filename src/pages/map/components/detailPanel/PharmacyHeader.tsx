import React from "react";
import Image from "next/image";
import { CloseIcon } from "@public/svgs";
import { PharmacyDetails } from "../MapComponent";
import IsOpenTag from "../IsOpenTag";
import RatingStars from "./RatingStars";
import { PharamacyDetailImage } from "@public/images";

interface PharmacyHeaderProps {
  pharmacy: PharmacyDetails;
  onClose: () => void;
}

const PharmacyHeader: React.FC<PharmacyHeaderProps> = ({
  pharmacy,
  onClose,
}) => {
  if (!pharmacy) {
    return null;
  }

  const imageSrc = pharmacy.photos?.[0]
    ? pharmacy.photos[0].getUrl({ maxWidth: 384, maxHeight: 220 })
    : PharamacyDetailImage;

  return (
    <>
      <div className="relative">
        <div className="relative h-[220px]">
          <Image
            src={imageSrc}
            alt={pharmacy.name || "약국 이미지"}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent to-40% " />
        </div>
        <CloseIcon
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-2 border-b pb-4 border-gray-100 py-4 pl-5">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-headline-m text-gray-600">{pharmacy.name}</p>
          <IsOpenTag isOpen={pharmacy.opening_hours?.isOpen() ?? false} />
        </div>
        {pharmacy.rating && <RatingStars rating={pharmacy.rating} />}
      </div>
    </>
  );
};

export default PharmacyHeader;
