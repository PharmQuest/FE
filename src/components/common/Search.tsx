import React, { useEffect, useState } from "react";
import { GreenMapPinIcon, SearchBarIcon, SearchIcon, XIcon } from "@public/svgs"
import { useRouter } from "next/router";
import SearchModal from "./SearchModal";
import { MouseEvent } from "react";


const Search = () => {

  const router = useRouter();
  const pathName = router.pathname;
  const segments = pathName.split("/");
  const isHomePage = pathName === '/' ? true : false;

  const [searchText, setSearchText] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [countryText, setCountryText] = useState("전체");

  const [searchUrl, setSearchUrl] = useState("");

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleSearchModal = (e: MouseEvent) => {
    e.stopPropagation();
    setIsSearchModalOpen(!isSearchModalOpen);
  }

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      router.push(
        {
          pathname: searchUrl,
          query: {...router.query, "keyword": searchText, "country": countryValue || "NONE"},
        }
      )
    }
  }

  useEffect(() => {
    switch (segments[1]) {
      case "community":
        setSearchUrl("/community/posts/search")
        break;

      case "supplements":
        setSearchUrl("/supplements")
        break;

      default:
        setSearchUrl("/medicines")
        break;
    }
  }, [segments])

  useEffect(() => {
    setIsSearchModalOpen(false);
  }, [router.pathname])

  useEffect(() => {
    setCountryValue("");
    setCountryText("전체");
    setSearchText("")
    setIsSearchModalOpen(false);
  }, [searchUrl])

  useEffect(() => {
    // pathname이 /supplements이고 query가 비어있을 때 (헤더에서 해외인기영양제 클릭 시)
    if (router.pathname === '/supplements' && Object.keys(router.query).length === 0) {
      setCountryValue("");
      setCountryText("전체");
      setSearchText("");  // 검색어 초기화
      setIsSearchModalOpen(false);
    }
  }, [router.pathname, router.query]);

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
              min-w-[25px]
          `}>{countryText}</p>
        </button>
        <SearchBarIcon className={`${isHomePage ? `lg:ml-3 lg:mr-2 lg:h-[22px] h-3` : `h-4`}`} />
        <form
          action={handleSearch}
          className={`lg:gap-2 flex gap-1.5 grow`}>
          <SearchIcon className={`${isHomePage ? `lg:w-[30px] w-5 lg:ml-[2px]` : `w-6`} ml-[-2px]`} />
          <input
            type="text"
            className={`w-full grow bg-transparent text-gray-600 placeholder-gray-300 focus:outline-none ${isHomePage ? `lg:text-headline-m text-sm` : `text-body1-r`}`}
            placeholder="복통약"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
        {searchText &&
          <XIcon
            className={`cursor-pointer ${isHomePage ? `lg:w-5 w-3` : `lg:w-4 w-[15px] mr-1`}`}
            onClick={() => setSearchText('')} />
        }

        <SearchModal countryValue={countryValue} setCountryValue={setCountryValue} setCountryText={setCountryText} isSearchModalOpen={isSearchModalOpen} setIsSearchModalOpen={setIsSearchModalOpen} />
      </div>
    </div>
  );
};

export default Search;
