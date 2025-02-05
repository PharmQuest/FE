import { ReactNode } from "react";
import Search from "../common/Search";
import FilterButtonList from "../common/FilterButtonList";

const FILTER_LIST = [
  {
    text: "진통/해열",
    isHomeButton: true,
  },
  {
    text: "소화/위장",
    isHomeButton: true,
  },
  {
    text: "감기/기침",
    isHomeButton: true,
  },
  {
    text: "알레르기",
    isHomeButton: true,
  },
  {
    text: "상처/소독",
    isHomeButton: true,
  },
  {
    text: "멀미",
    isHomeButton: true,
  },
  {
    text: "안약",
    isHomeButton: true,
  },
  {
    text: "기타",
    isHomeButton: true,
  },
]

const AdditionalHeader = ({
  children,
  pathName,
}: {
  children: ReactNode;
  pathName: string;
}) => {
  const segments = pathName.split("/");
  let currentTitle: string = "";



  const isHome = pathName === "/" ? true : false;

  switch (segments[1]) {
    case "medicines":
      currentTitle = `상비약 리스트`;
      break;

    case "community":
      currentTitle = `커뮤니티`;
      break;

    case "supplements":
      currentTitle = `해외 인기 영양제`;
      break;

    case "mypage":
      currentTitle = `마이페이지`;
      break;

    case "":
      break;
  }

  return (
    <>
      {currentTitle !== "" ? (
        <div className={`bg-background flex flex-col sticky top-0 z-[500]`}>
          {children}
          <div
            className={`
              lg:w-[900px] lg:gap-5
              md:w-[600px] md:m-auto 
              flex whitespace-nowrap flex-col w-full`}>
            <div
              className={`
                lg:flex
                hidden items-center gap-5`}>
              <h1 className={`text-display1-b text-gray-600 `}>
                {currentTitle}
              </h1>
              <p className={`text-body2-r text-gray-300`}>
                본 웹 사이트는 사용자의 편의를 위한 단순 참고용 정보 제공을
                목표로 하며, 제공되는 정보는 의료 전문가의 조언을 대체 하지
                않습니다.
              </p>
            </div>

            {!isHome &&
              <>
                <div className={`${segments[2] && `hidden lg:block`} lg:mx-0 lg:mb-9 md:mx-0 mx-5 mb-4`}>
                  <Search />
                </div>

                {/* 출력 하는 곳 안하는 곳 추가 수정 필요 */}
                <div className={`lg:hidden`}>
                  <FilterButtonList filterLists={FILTER_LIST} className={`md:px-0 px-5 mb-4`}/>
                </div>
              </>
            }
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default AdditionalHeader;
