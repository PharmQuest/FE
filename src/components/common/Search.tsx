import React, { useState } from "react";
import { SearchBarIcon, SearchIcon, XIcon, GreenMapPinIcon, SmallGreenMapPinIcon } from "@public/svgs"
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
  const isHomePage = pathName === '/' ? true : false;

  const [searchText, setSearchText] = useState("");

  return (
    <div className="w-[100%] flex items-center gap-4">
      {/* TextLabel */}
      {textLabel && (
        <span className="text-display1-b text-gray-800">{textLabel}</span>
      )}

      {/* 검색창 */}
      <div className={`flex items-center bg-white rounded-full flex-grow shadow-md ${isHomePage ? `lg:w-[900px] md:w-[601px] w-full lg:h-[54px] h-[37px] px-6 py-3 gap-5` : `h-10 px-4 py-2 gap-4`} `}>
        {/* 위치선택 */}
        <button className={`flex items-center gap-2 bg-none rounded-full text-gray-500`}>
          {/* <GreenMapPinIcon className={`${isHomePage ? `lg:w-7` : `w-5`}`} /> */}
          {/* 반응형 아이콘 */}
          <GreenMapPinIcon className={`hidden lg:block ${isHomePage ? 'w-7' : 'w-5'}`} /> {/* lg에서만 보이는 GreenMapPinIcon */}
          <SmallGreenMapPinIcon className={`lg:hidden ${isHomePage ? 'w-4' : 'w-5'}`} /> {/* lg 이하에서만 보이는 SmallGreenMapPinIcon */}
          
          <p className={`${isHomePage ? `w-[35px] lg:text-headline-m text-sm text-[#006367]` : `w-7 text-body1-r`}`}>{countryLabel}</p>
        </button>
        <SearchBarIcon className={`${isHomePage ? `lg:h-[22px] h-3` : `h-4`}`}/>
        <div className={`flex gap-2 grow`}>
          <SearchIcon className={`${isHomePage ? `lg:w-[30px] w-3` : `w-6`}`} />
          <input
            type="text"
            className={`grow bg-transparent text-gray-600 placeholder-gray-300 focus:outline-none ${isHomePage ? `lg:text-headline-m text-sm` : `text-body1-r`}`}
            placeholder="복통약"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {searchText &&
          <XIcon
            className={`cursor-pointer ${isHomePage ? `lg:w-5 w-[6.67px]` : `w-4 mr-1`}`}
            onClick={() => setSearchText('')} />
        }
      </div>
    </div>
  );
};

export default Search;
