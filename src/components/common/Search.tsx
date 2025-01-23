import React, { useState } from "react";
import { MapPinIcon, SearchBar, SearchIcon, XIcon } from "@public/svgs"
import { useRouter } from "next/router";

interface SearchProps {
  textLabel?: string; // TextLabel은 선택적
  countryLabel?: string; // 나라 이름 (ex: 전체, 한국, 미국)
}

const Search: React.FC<SearchProps> = ({
  textLabel,
  countryLabel = "전체", // 기본값
}) => {

  const router = useRouter();
  const pathName = router.pathname;

  const [searchText, setSearchText] = useState("");

  return (
    <div className="w-[100%] flex items-center gap-4">
      {/* TextLabel */}
      {textLabel && (
        <span className="text-display1-b text-gray-800">{textLabel}</span>
      )}

      {/* 검색창 */}
      <div className={`flex items-center bg-white rounded-full flex-grow shadow-md ${pathName === '/' ? `h-[54px] px-6 py-3 gap-5` : `h-10 px-4 py-2 gap-4`} `}>
        {/* 위치선택 */}
        <button className={`flex items-center gap-2 bg-none rounded-full text-gray-500`}>
          <MapPinIcon className={`${pathName === '/' ? `w-7` : `w-5`}`} />
          <p className={`${pathName === '/' ? `w-[35px] text-headline-m` : `w-7 text-body1-r`}`}>{countryLabel}</p>
        </button>
        <SearchBar />
        <div className={`flex gap-2 grow`}>
          <SearchIcon className={`${pathName === '/' ? `w-[30px]` : `w-6`}`} />
          <input
            type="text"
            className={`grow bg-transparent text-gray-600 placeholder-gray-300 focus:outline-none ${pathName === '/' ? `text-headline-m` : `text-body1-r`}`}
            placeholder="복통약"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {searchText &&
          <XIcon
            className={`cursor-pointer ${pathName === '/' ? `w-5` : `w-4 mr-1`}`}
            onClick={() => setSearchText('')} />
        }
      </div>
    </div>
  );
};

export default Search;
