import { ReactNode } from "react";
import Search from "../common/Search";

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
        <div className={`bg-background flex flex-col`}>
          {children}
          <div
            className={`
              lg:w-[900px]
              md:w-[600px] md:m-auto 
              flex gap-5 whitespace-nowrap flex-col w-full`}>
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

            {!isHome && !segments[2] &&
              <div className={`lg:mx-0 lg:mb-9 md:mx-0 mx-5 mb-4`}>
                <Search />
              </div>
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
