// 약국찾기 메인화면
import React, { useState } from "react";
// import MapComponent from "./components/MapComonent";
import SearchPanel from "./components/SearchPanel";

export default function Map() {
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <>
      <hr className="border-b border-solid border-gray-100" />
      <div className="w-full  flex flex-row">
        {isSearchOpen && <SearchPanel />}

        {/* 검색창 접기 */}
        <button
          onClick={toggleSearch}
          className="z-10 bg-white w-6 h-[46px] mt-[450px] text-gray-300 border-l-0 border-b-2 border-t-2 border-r-2 border-solid border-gray-100 rounded-tr-[4px] rounded-br-[4px]"
        >
          {isSearchOpen ? "<" : ">"}
        </button>

        <div className="w-full -ml-4">{/* <MapComponent /> */}</div>
      </div>
    </>
  );
}
