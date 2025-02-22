import { ReactNode } from "react";
import Search from "../common/Search";
import FilterButtonList from "../common/FilterButtonList";
import {
  MOBILE_COMMUNIY_FILTER_LIST,
  MOBILE_MEDICINE_FILTER_LIST,
  MOBILE_SUPPLEMENT_FILTER_LIST,
} from "@/constants/FilterList";
import { useRouter } from "next/router";

const AdditionalHeader = ({
  children,
  pathName,
}: {
  children: ReactNode;
  pathName: string;
}) => {
  const router = useRouter();
  const segments = pathName.split("/");
  let currentTitle: string = "";
  let url: string = "";
  let filterList: {
    text: string;
    isHomeButton?: boolean;
    isMobileButton?: boolean;
  }[] = [];

  const isHome = pathName === "/" ? true : false;

  switch (segments[1]) {
    case "medicines":
      currentTitle = `상비약 리스트`;
      filterList = MOBILE_MEDICINE_FILTER_LIST;
      url = "/medicines";
      break;

    case "community":
      if (segments[2] === "activities") {
        currentTitle = `나의 활동`;
        url = "/community/activities";
      } else {
        currentTitle = `커뮤니티`;
        url = "/community";
        filterList = MOBILE_COMMUNIY_FILTER_LIST;
      }
      break;

    case "supplements":
      currentTitle = `해외 인기 영양제`;
      url = "/supplements";
      filterList = MOBILE_SUPPLEMENT_FILTER_LIST;
      break;

    case "mypage":
      currentTitle = `마이페이지`;
      url = "/mypage";
      break;

    case "":
      break;
  }

  return (
    <>
      {currentTitle !== "" ? (
        <div
          className={`bg-background flex flex-col sticky top-0 z-[500] ${
            (segments[2] === "activities" || segments[1] === "mypage") &&
            `lg:pb-[30px]`
          }`}
        >
          {children}
          <div
            className={`
              lg:w-[900px] lg:gap-5
              md:w-[600px] md:m-auto 
              flex whitespace-nowrap flex-col w-full`}
          >
            <div
              className={`
                lg:flex
                hidden items-center gap-4`}
            >
              <h1
                className={`text-display1-b text-gray-600 cursor-pointer`}
                onClick={() => router.push(url)}
              >
                {currentTitle}
              </h1>
              <p className={`text-body2-r text-gray-300`}>
                본 웹 사이트는 사용자의 편의를 위한 단순 참고용 정보 제공을
                목표로 하며, 해당 정보는 의료 전문가의 조언을 대체 하지
                않습니다.
              </p>
            </div>

            {!isHome && (
              <>
                {segments[2] !== "activities" && segments[1] !== "mypage" && (
                  <div
                    className={`${
                      segments[2] &&
                      segments[2] !== "posts" &&
                      segments[2] !== "bestposts" &&
                      segments[2] !== "search" &&
                      `hidden lg:block`
                    } 
                  lg:mx-0 lg:mb-9 md:mx-0 mx-5 mb-4`}
                  >
                    <Search />
                  </div>
                )}

                {(segments.length < 3 ||
                  segments[2] === "posts" ||
                  segments[2] === "search") &&
                  segments[1] !== "mypage" && (
                    <div className={`lg:hidden`}>
                      <FilterButtonList
                        filterList={filterList}
                        className={`md:px-0 px-5 mb-4`}
                      />
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default AdditionalHeader;
