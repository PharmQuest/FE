import { ArrowRightIcon } from "@public/svgs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface PageNavigatorProps {
  totalPage: number;
  isFirst: boolean;
  isLast: boolean;
  page: number;
  setPage:
    | ((newPage: number) => void)
    | Dispatch<SetStateAction<number>>
    | null;
  className?: string;
}

const PageNavigator: React.FC<PageNavigatorProps> = ({
  totalPage,
  isFirst,
  isLast,
  page,
  setPage,
  className = "",
}) => {
  const currentPage = page;

  const [pageGroupSize, setPageGroupSize] = useState(10);

  useEffect(() => {
    const updatePageGroupSize = () => {
      setPageGroupSize(window.innerWidth <= 641 ? 5 : 10);
    };

    updatePageGroupSize();
    window.addEventListener("resize", updatePageGroupSize);
    return () => window.removeEventListener("resize", updatePageGroupSize);
  }, []);

  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPage);

  const pageNavigate = (page: number) => {
    if (setPage) {
      setPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`gap-3 flex mx-auto items-center justify-center ${className}`}
    >
      {!isFirst && (
        <ArrowRightIcon
          onClick={() => pageNavigate(currentPage - 1)}
          className={`px-2 rotate-180 mb-0.5 text-gray-600 h-2.5 cursor-pointer`}
        />
      )}

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => pageNavigate(pageNum)}
          disabled={page === pageNum}
          className={`
          px-3 py-1 ${
            page === pageNum
              ? `text-secondary-500 cursor-default lg:text-subhead1-sb text-m-subhead1-sb`
              : `text-gray-300 lg:text-subhead1-sb text-m-body2-r`
          }`}
        >
          {pageNum}
        </button>
      ))}

      {!isLast && (
        <ArrowRightIcon
          onClick={() => pageNavigate(currentPage + 1)}
          className={`px-2 mb-0.5 text-gray-600 h-2.5 cursor-pointer`}
        />
      )}
    </div>
  );
};

export default PageNavigator;
