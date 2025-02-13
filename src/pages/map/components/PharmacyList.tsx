import React from "react";
import PharmacyItem from "./PharmacyItem";
import { Pharmacy, PharmacyDetails } from "./MapComponent";

interface PharmacyListProps {
  pharmacies: Pharmacy[];
  selectedPharmacy: PharmacyDetails | null;
  onPharmacyClick: (pharmacy: Pharmacy) => void;
  currentPosition: { lat: number; lng: number };
}

const PharmacyList: React.FC<PharmacyListProps> = ({
  pharmacies = [],
  selectedPharmacy,
  onPharmacyClick,
  currentPosition,
}) => {
  if (pharmacies.length === 0) {
    return (
      <div className="text-headline-m flex flex-col flex-1 items-center justify-center text-gray-300">
        <p>검색결과가 없습니다.</p>
        <p>키워드 및 지역을 확인해주세요.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-scroll flex-1 scrollbar-hide">
      {pharmacies?.map((pharmacy) => (
        <PharmacyItem
          key={pharmacy.place_id}
          pharmacy={pharmacy}
          isSelected={selectedPharmacy?.place_id === pharmacy.place_id}
          onClick={() => onPharmacyClick(pharmacy)}
          currentPosition={currentPosition}
        />
      ))}
    </div>
  );
};

export default PharmacyList;
