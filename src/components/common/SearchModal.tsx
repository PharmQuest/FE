import { XIcon } from "@public/svgs";
import SearchModalButton from "./SearchModalButton";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const SearchModal = ({
  countryValue, 
  setCountryValue,
  setCountryText,
  isSearchModalOpen,
  setIsSearchModalOpen,
} : {
  countryValue: string,
  setCountryValue: React.Dispatch<React.SetStateAction<string>>,
  setCountryText: React.Dispatch<React.SetStateAction<string>>,
  isSearchModalOpen: boolean,
  setIsSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

) => {

  const router = useRouter();

  const COMMUNITY_COUNTRY = [
    {value:"ALL", text:"전체", isSelected:true},
    {value:"KOREA", text:"한국", isSelected:false},
    {value:"JAPAN", text:"일본", isSelected:false},
    {value:"CHINA", text:"중국", isSelected:false},
    {value:"USA", text:"미국", isSelected:false},
    {value:"CANADA", text:"캐나다", isSelected:false},
    {value:"AUSTRALIA", text:"호주", isSelected:false},
    {value:"THAILAND", text:"태국", isSelected:false},
    {value:"VIETNAM", text:"베트남", isSelected:false},
    {value:"PHILIPPINES", text:"필리핀", isSelected:false},
    {value:"SINGAPORE", text:"싱가폴", isSelected:false},
    {value:"EUROPE", text:"유럽", isSelected:false},
  ]

  const MEDICINE_COUNTRY = [
    {value:"ALL", text:"전체", isSelected:true},
    {value:"KOREA", text:"한국", isSelected:false},
    {value:"USA", text:"미국", isSelected:false},
    {value:"JAP", text:"일본", isSelected:false},
  ]
  
  const segments = router.pathname.split("/");

  const isCommunity = segments[1] === "community" ? true : false
  const isHome = router.pathname === "/" ? true : false
  const Countrys = isCommunity ? COMMUNITY_COUNTRY : MEDICINE_COUNTRY;


  const handleModal = () => {
    setIsSearchModalOpen(false);
  }

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsSearchModalOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    }

  }, []);

  return (
    <div 
      ref={modalRef}
      className={`
      ${!isSearchModalOpen && `hidden`}
      ${isCommunity ? `w-full ` : `w-fit `} 
      ${isHome ? `lg:top-[62px] lg:px-7 lg:py-6 top-11` : `top-12`}
      absolute left-0 flex rounded-[16px] bg-white shadow-[0_0_20px_0_rgba(0,0,0,0.10)] p-4 z-50`}>
      <div className={`flex flex-col gap-4 grow`}>
        <div className={`${!isCommunity && `hidden`} grow flex justify-between text-gray-600 text-m-headline2-b`}>
          국가 선택
          <XIcon 
            className={`w-4 cursor-pointer`}
            onClick={handleModal}/>
        </div>
        <div className={`${isHome ? `lg:gap-4 gap-2` : `gap-2`} flex flex-wrap ${isCommunity ? `flex-row` : `flex-col`}`}>
          {Countrys?.map((item, index) => (
            <SearchModalButton 
              key={index} 
              text={item.text} 
              value={item.value} 
              countryValue={countryValue} 
              setCountryValue={setCountryValue}
              setCountryText={setCountryText}
              setIsSearchModalOpen={setIsSearchModalOpen}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchModal;