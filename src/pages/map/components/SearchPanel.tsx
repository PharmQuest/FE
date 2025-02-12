import React, { useCallback } from "react";
import PharmacyList from "./PharmacyList";
import { SearchIcon, XIcon } from "@public/svgs";
import { Pharmacy, PharmacyDetails, MapComponentRef } from "./MapComponent";
import { debounce } from "lodash";

interface SearchPanelProps {
  pharmacies: Pharmacy[];
  selectedPharmacy: PharmacyDetails | null;
  onPharmacySelect: (pharmacy: Pharmacy) => void;
  currentPosition: { lat: number; lng: number };
  mapRef: React.RefObject<MapComponentRef>;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({
  pharmacies = [],
  selectedPharmacy,
  onPharmacySelect,
  currentPosition,
  mapRef,
  searchTerm,
  setSearchTerm,
}) => {
  const debouncedSearch = useCallback(
    debounce(async (text: string) => {
      if (text.trim() && mapRef.current) {
        await mapRef.current.searchPharmaciesByText(text);
      }
    }, 500),
    [mapRef]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    if (mapRef.current) {
      mapRef.current.searchPharmaciesByText("");
    }
  };

  return (
    <div className="w-[380px] max-sm:w-screen h-full flex flex-col">
      <div className="lg:h-[132px] h-[45px] bg-white border-b border-gray-100 flex lg:pt-8 max-lg:justify-center px-7 flex-col items-start gap-4 self-stretch">
        <div className="max-lg:hidden w-[324px] h-10 flex justify-start py-2 pl-2 pr-4 items-center gap-2 self-stretch rounded-lg border-2 border-solid border-secondary-500 relative">
          <SearchIcon className="w-6 h-6" />
          <input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="검색어를 입력하세요."
            className="focus:outline-none text-gray-600 placeholder-gray-300 text-body1-r"
          />
          {searchTerm && (
            <XIcon
              className="absolute right-3  w-4 h-4 cursor-pointer "
              onClick={handleClearSearch}
            />
          )}
        </div>
        <p className="lg:text-subhead1-sb text-m-subhead1-sb text-gray-400">
          검색 결과 {pharmacies.length}건
        </p>
      </div>
      <PharmacyList
        pharmacies={pharmacies}
        selectedPharmacy={selectedPharmacy}
        onPharmacyClick={onPharmacySelect}
        currentPosition={currentPosition}
      />
    </div>
  );
};

export default SearchPanel;
