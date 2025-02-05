import React, { useEffect, useState } from "react";
import { GreenMapPinIcon, SearchBarIcon, SearchIcon, XIcon } from "@public/svgs"
import { useRouter } from "next/router";
import SearchModal from "./SearchModal";
import { MouseEvent } from "react";


const Search = () => {

  const router = useRouter();
  const pathName = router.pathname;
  const isHomePage = pathName === '/' ? true : false;

  const [searchText, setSearchText] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [countryText, setCountryText] = useState("전체");

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleSearchModal = (e:MouseEvent) => {
    e.stopPropagation();
    setIsSearchModalOpen(!isSearchModalOpen);
  }

  useEffect(() => {
    setCountryValue("");
    setCountryText("전체");
    setIsSearchModalOpen(false);
  }, [router])



  return (
    <div className="w-full flex items-center gap-4">
      {/* 검색창 */}
      <div className={`
          ${isHomePage ? `lg:px-6 lg:w-[900px] lg:gap-2 md:w-[601px] w-full lg:h-[54px] h-[37px] px-4 py-2 gap-2.5` : `lg:px-[16px] h-10 px-4 py-2 gap-4`} 
          relative flex items-center bg-white rounded-full flex-grow w-full`}>
        {/* 위치선택 */}
        <button 
          className={`flex items-center lg:gap-2 gap-1 bg-none rounded-full text-gray-500 outline-none`}
          onClick={(e) => handleSearchModal(e)}>
          {/* 반응형 아이콘 */}
          <GreenMapPinIcon className={`
            ${isHomePage ? 'lg:w-7 w-[18px]' : `w-[20px]`} 
            ${countryValue === "" ? `text-gray-500 lg:text-headline-m` : `text-secondary-500 lg:text-headline-b`}
             `} />

          <p className={`
            ${isHomePage ?
              `w-fit text-sm 
              ${countryValue === "" ? `text-gray-500 lg:text-headline-m` : `text-secondary-500 lg:text-headline-b`}`
              :
              `w-fit text-body1-r
              ${countryValue === "" ? `text-gray-500 lg:text-body1-r` : `text-secondary-500 lg:text-body1-sb`}`}
          `}>{countryText}</p>
        </button>
        <SearchBarIcon className={`${isHomePage ? `lg:ml-3 lg:mr-2 lg:h-[22px] h-3` : `h-4`}`} />
        <div className={`lg:gap-2 flex gap-1.5 grow`}>
          <SearchIcon className={`${isHomePage ? `lg:w-[30px] w-5 lg:ml-[2px]` : `w-6`} ml-[-2px]`} />
          <input
            type="text"
            className={`w-full grow bg-transparent text-gray-600 placeholder-gray-300 focus:outline-none ${isHomePage ? `lg:text-headline-m text-sm` : `text-body1-r`}`}
            placeholder="복통약"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {searchText &&
          <XIcon
            className={`cursor-pointer ${isHomePage ? `lg:w-5 w-3` : `lg:w-4 w-[15px] mr-1`}`}
            onClick={() => setSearchText('')} />
        }

        <SearchModal countryValue={countryValue} setCountryValue={setCountryValue} setCountryText={setCountryText} isSearchModalOpen={isSearchModalOpen} setIsSearchModalOpen={setIsSearchModalOpen}/>
      </div>
    </div>
  );
};

export default Search;
