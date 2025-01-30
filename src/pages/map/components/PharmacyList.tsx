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
  return (
    <div className="flex flex-col overflow-y-scroll flex-1">
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
