import React, { useState } from "react";
import MapComponent, {
  Pharmacy,
  PharmacyDetails,
} from "./components/MapComponent";
import SearchPanel from "./components/SearchPanel";
import DetailPanel from "./components/detailPanel/PharmacyDetailPanel";
import MapSearchHeader from "./components/MapSearchHeader";

export default function Map() {
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [selectedPharmacy, setSelectedPharmacy] =
    useState<PharmacyDetails | null>(null);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="h-[calc(100vh-110px)] max-lg:h-[calc(100vh-60px)] w-full overflow-hidden flex flex-col">
      <MapSearchHeader
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="w-full h-full flex flex-row">
        {isSearchOpen && (
          <SearchPanel
            pharmacies={pharmacies}
            selectedPharmacy={selectedPharmacy}
            onPharmacySelect={handlePharmacySelect}
            currentPosition={currentPosition}
          />
        )}

        {selectedPharmacy && (
          <DetailPanel
            pharmacy={selectedPharmacy}
            onClose={() => setSelectedPharmacy(null)}
          />
        )}

        <div className="flex-1 relative w-full h-full">
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
