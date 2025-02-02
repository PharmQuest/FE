import React, { useState } from "react";
import PharmacyList from "./PharmacyList";
import { SearchIcon } from "@public/svgs";
import { Pharmacy, PharmacyDetails } from "./MapComponent";

interface SearchPanelProps {
  pharmacies: Pharmacy[];
  selectedPharmacy: PharmacyDetails | null;
  onPharmacySelect: (pharmacy: Pharmacy) => void;
  currentPosition: { lat: number; lng: number };
}

const SearchPanel: React.FC<SearchPanelProps> = ({
  pharmacies = [],
  selectedPharmacy,
  onPharmacySelect,
  currentPosition,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPharmacies =
    pharmacies?.filter((pharmacy) =>
      pharmacy.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

  return (
    <div className="w-[380px] max-sm:w-screen h-full flex flex-col">
      <div className="lg:h-[132px] h-[45px] bg-white border-b border-gray-100 flex lg:pt-8 max-lg:justify-center px-7 flex-col items-start gap-4 self-stretch">
        <div className="max-lg:hidden w-[324px] h-[40px] flex justify-start py-2 pl-2 pr-4 items-center gap-2 self-stretch rounded-lg border-2 border-solid border-secondary-500">
          <SearchIcon className="w-6 h-6" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력하세요."
            className="focus:outline-none text-gray-600 placeholder-gray-300 text-body1-r"
          />
        </div>
        <p className="lg:text-subhead1-sb text-m-subhead1-sb text-gray-400">
          검색 결과 {filteredPharmacies.length}건
        </p>
      </div>
      <PharmacyList
        pharmacies={filteredPharmacies}
        selectedPharmacy={selectedPharmacy}
        onPharmacyClick={onPharmacySelect}
        currentPosition={currentPosition}
      />
    </div>
  );
};

export default SearchPanel;
