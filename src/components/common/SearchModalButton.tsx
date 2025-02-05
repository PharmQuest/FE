import { useRouter } from "next/router";
import { MouseEvent } from "react";

interface SearchModalButtonProps {
  text: string;
  value: string;
  countryValue: string;
  setCountryValue: React.Dispatch<React.SetStateAction<string>>;
  setCountryText: React.Dispatch<React.SetStateAction<string>>;
  setIsSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModalButton:React.FC<SearchModalButtonProps> = ({text, value, countryValue, setCountryValue, setCountryText, setIsSearchModalOpen}) => {

  const router = useRouter();
  const isHome = router.pathname === "/" ? true : false

  const handleButton = (e:MouseEvent) => {
    e.stopPropagation();
    setCountryText(text);
    setCountryValue(value);
    setIsSearchModalOpen(false);
  }

  return (
    <div 
      className={`
      ${isHome ? `lg:px-6 lg:py-1.5 lg:text-headline-b` : ``}
      w-fit text-m-subhead1-sb border-solid  rounded-full px-3 py-1 cursor-pointer
      ${value === countryValue ? `text-primary-500 border-[2px] border-primary-500` : `text-gray-300 border border-gray-300`}`}
      onClick={handleButton}>
      {text}
    </div>
  )
}

export default SearchModalButton;