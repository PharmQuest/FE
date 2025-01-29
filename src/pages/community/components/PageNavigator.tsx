import { ArrowRightIcon } from "@public/svgs"
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

interface PageNavigatorProps {
  totalPage: number; 
  isFirst: boolean;
  isLast: boolean; 
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  className?: string;
}

const PageNavigator: React.FC<PageNavigatorProps> = ({ totalPage, isFirst, isLast, page, setPage, className="" }) => {

  const currentPage = page

  const pageNavigate = (page: number) => {
    setPage(page)
  }

  return (
    <div className={`flex gap-3 mx-auto items-center ${className}`}>
      {!isFirst && 
        <ArrowRightIcon 
          onClick={() => pageNavigate(currentPage - 1)}
          className={`rotate-180 mb-0.5 text-gray-600 px-2 w-6 cursor-pointer`} />}
      {[...Array(totalPage)].map((_, index) => (
        <button
          key={index}
          onClick={() => pageNavigate(index + 1)}
          disabled={currentPage === index + 1}
          className={`px-3 py-1 text-subhead1-sb ${currentPage === index + 1 ? `text-secondary-500 cursor-default` : `text-gray-300`}`}>
          {index + 1}
        </button>
      ))}
      {!isLast &&
        <ArrowRightIcon 
          onClick={() => pageNavigate(currentPage + 1)}
          className={`mb-0.5 text-gray-600 px-2 w-6 cursor-pointer`} />}
    </div>
  )
}

export default PageNavigator;