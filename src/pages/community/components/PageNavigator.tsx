import { ArrowRightIcon } from "@public/svgs"
import { Dispatch, SetStateAction } from "react";

interface PageNavigatorProps {
  totalPage: number; 
  isFirst: boolean;
  isLast: boolean; 
  page: number;
  setPage: Dispatch<SetStateAction<number>> | null;
  className?: string;
}

const PageNavigator: React.FC<PageNavigatorProps> = ({ totalPage, isFirst, isLast, page, setPage, className="" }) => {

  const currentPage = page

  const pageNavigate = (page: number) => {
    if (setPage){
      setPage(page)
      console.log(page)
      window.scrollTo({top: 0, behavior: "smooth"});
    }
  }

  return (
    <div className={`gap-3 flex mx-auto items-center justify-center ${className}`}>
      {!isFirst && 
        <ArrowRightIcon 
          onClick={() => pageNavigate(currentPage - 1)}
          className={`px-2 rotate-180 mb-0.5 text-gray-600 h-2.5 cursor-pointer`} />}
      {[...Array(totalPage)].map((_, index) => (
        <button
          key={index}
          onClick={() => pageNavigate(index + 1)}
          disabled={currentPage === index + 1}
          className={`
            px-3 py-1 ${currentPage === index + 1 ? `text-secondary-500 cursor-default lg:text-subhead1-sb text-m-subhead1-sb` : `text-gray-300 lg:text-subhead1-sb text-m-body2-r`}`}>
          {index + 1}
        </button>
      ))}
      {!isLast &&
        <ArrowRightIcon 
          onClick={() => pageNavigate(currentPage + 1)}
          className={`px-2 mb-0.5 text-gray-600 h-2.5 cursor-pointer`} />}
    </div>
  )
}

export default PageNavigator;