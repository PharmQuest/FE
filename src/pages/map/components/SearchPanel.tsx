import React from "react";
import PharmacyList from "./PharmacyList";
import { SearchIcon } from "@public/svgs";

const SearchPanel = () => {
  return (
    <div className="w-[380px] h-fit shrink-0 ">
      <div className="h-[120px] bg-white border-b border-gray-100 flex py-5 px-7 flex-col justify-start items-start gap-4 self-stretch">
        <div className="w-[324px] h-[40px] flex justify-start py-2 pl-2 pr-4 items-center gap-2 self-stretch mb-4 rounded-lg border-2 border-solid border-secondary-500">
          <SearchIcon />
          <input
            placeholder="검색어를 입력하세요."
            className="focus:outline-none text-gray-300 text-base font-normal font-['Pretendard Variable'] leading-normal"
          ></input>
        </div>
        <div className="font-['Pretendard Variable'] leading-normal text-subhead1-sb text-gray-400">
          검색 결과 2건
        </div>
      </div>
      <PharmacyList />
    </div>
  );
};

export default SearchPanel;
