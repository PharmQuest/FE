import { RotateIcon } from "@public/svgs";
import React from "react";

const SearchOnCurrentMapButton = () => {
  return (
    <div className="flex flex-row w-fit py-[10px] px-[30px] items-center justify-center gap-2 bg-primary-500 rounded-[1000px] border border-solid border-primary-500 cursor-pointer">
      <p className="text-subhead1-sb text-white">현 지도에서 검색</p>
      <RotateIcon />
    </div>
  );
};

export default SearchOnCurrentMapButton;
