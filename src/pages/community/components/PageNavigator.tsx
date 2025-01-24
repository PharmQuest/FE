import { ArrowRightIcon } from "@public/svgs"
import { useRouter } from "next/router";

const PageNavigator = ({ totalPage, isFirst, isLast }: { totalPage: number, isFirst: boolean, isLast: boolean }) => {

  const router = useRouter();
  const pathName = router.pathname;
  const currentPage = router.query.page ? parseInt(router.query.page as string, 10) : 1;

  const isHidden = pathName === "/community"

  const pageNavigate = (page: number) => {
    router.push({
      pathname: pathName,
      query: { page: page }
    })
  }

  return (
    !isHidden &&
    <div className={`flex gap-3 mx-auto mt-12 items-center`}>
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