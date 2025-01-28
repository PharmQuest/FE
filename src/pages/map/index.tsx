import React, { useState } from "react";
import MapComponent, {
  Pharmacy,
  PharmacyDetails,
} from "./components/MapComponent";
import SearchPanel from "./components/SearchPanel";
import DetailPanel from "./components/PharmacyDetailPanel";

export default function Map() {
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [selectedPharmacy, setSelectedPharmacy] =
    useState<PharmacyDetails | null>(null);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });

  const handlePharmaciesFound = (found: Pharmacy[]) => {
    setPharmacies(found);
  };

  const handlePharmacySelect = (pharmacy: PharmacyDetails) => {
    setSelectedPharmacy(pharmacy);
  };

  const handlePositionUpdate = (position: { lat: number; lng: number }) => {
    setCurrentPosition(position);
  };

  return (
    <div className="h-[calc(100vh-110px)] overflow-hidden">
      <hr className="border-b border-solid border-gray-100" />
      <div className="w-full h-full flex flex-row">
        {isSearchOpen && (
          <SearchPanel
            pharmacies={pharmacies}
            selectedPharmacy={selectedPharmacy}
            onPharmacySelect={handlePharmacySelect}
            currentPosition={currentPosition}
          />
        )}

        <button
          onClick={() => setIsSearchOpen((prev) => !prev)}
          className="z-10 bg-white w-6 h-[46px] mt-[450px] text-gray-300 border-l-0 border-b-2 border-t-2 border-r-2 border-solid border-gray-100 rounded-tr-[4px] rounded-br-[4px]"
        >
          {isSearchOpen ? "<" : ">"}
        </button>

        {selectedPharmacy && (
          <DetailPanel
            pharmacy={selectedPharmacy}
            onClose={() => setSelectedPharmacy(null)}
          />
        )}

        <div className="w-full -ml-4">
          <MapComponent
            onPharmaciesFound={handlePharmaciesFound}
            onPharmacySelect={handlePharmacySelect}
            onPositionUpdate={handlePositionUpdate}
          />
        </div>
      </div>
    </div>
  );
}
