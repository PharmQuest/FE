import React, { useCallback } from "react";
import { ListViewIcon, MapViewIcon, SearchIcon, XIcon } from "@public/svgs";
import { debounce } from "lodash";
import { MapComponentRef } from "./MapComponent";

interface SearchHeaderProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  mapRef: React.RefObject<MapComponentRef | null>;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  isSearchOpen,
  setIsSearchOpen,
  searchTerm,
  setSearchTerm,
  mapRef,
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
    <div className="w-full bg-background border-b border-gray-100 lg:hidden">
      <div className="container mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex-1 relative">
          <div className="flex items-center h-[37px] rounded-[1000px] bg-white py-2 px-3 gap-1">
            <SearchIcon className="w-6 h-6" />
            <input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="검색어를 입력하세요."
              className="w-full focus:outline-none text-gray-600 text-body2-r placeholder-gray-300"
            />
            {searchTerm && (
              <XIcon
                className="w-3 cursor-pointer"
                onClick={handleClearSearch}
              />
            )}
          </div>
        </div>
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="min-w-[37px] h-[37px] flex items-center justify-center bg-primary-300 rounded-[4px]"
        >
          {isSearchOpen ? <MapViewIcon /> : <ListViewIcon />}
        </button>
      </div>
    </div>
  );
};

export default SearchHeader;
