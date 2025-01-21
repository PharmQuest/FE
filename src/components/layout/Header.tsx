import { useRouter } from "next/router";
import React, { useState } from "react";
import AdditionalHeader from "./AdditionalHeader";
import {LogoIcon, UserIcon, ListIcon, AccountCircleIcon} from "@public/svgs"

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const pathName = router.pathname;

  // 로그인 버튼 클릭 핸들러
  const handleLoginClick = () => {
    setIsLoggedIn(true); // 로그인 상태로 변경
    router.push("/")
  };

  // 마이페이지 버튼 클릭 핸들러 (로그아웃 기능 예시)
  const handleLogoutClick = () => {
    setIsLoggedIn(false); // 로그아웃 상태로 변경
    router.push("/login")
  };

  return (
    <AdditionalHeader pathName={pathName}>
      {/* (PC)기존 헤더 코드(화면 1000px 이상일 때) */}
      <div
        className={`hidden lg:flex grow justify-center items-center h-[110px] w-full
          ${ pathName === "/map" ? "bg-white" : "bg-background" }`}>
          <div className={`
            flex items-center
            // 1001px 이상
            xl:max-px-[260px] xl:w-[900px]
            // 1000px
            lg:px-[50px] lg:w-[900px]
            `}>
            <LogoIcon className="min-w-fit" onClick={() => router.push("/")}/>
            <div className="whitespace-nowrap flex grow ml-[52px] h-[46px] justify-between items-center">
              <button
                onClick={() => router.push("/medicines")}
                className="grow px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-2.5 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
              >
                상비약 리스트
              </button>
              <button
                onClick={() => router.push("/map")}
                className="grow px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-2.5 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
              >
                약국 찾기
              </button>
              <button
                onClick={() => router.push("/community")}
                className="grow px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-2.5 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
              >
                커뮤니티
                {/* 로그인하면 보임 */}
                {!isLoggedIn && (
                  <div className="w-[18px] h-[18px] relative">
                    <div className="w-[18px] h-[18px] left-0 top-0 absolute bg-[#ff7700] rounded-full"></div>
                    <div className="left-[6px] top-0 absolute text-white text-xs font-semibold font-['Pretendard Variable'] leading-[18px]">
                      1
                    </div>
                  </div>
                )}
              </button>
              <button
                onClick={() => router.push("/supplements")}
                className="grow px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-2.5 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
              >
                해외 인기 영양제
              </button>
              {/* 로그인 상태에 따라 버튼 렌더링 */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogoutClick}
                  className="growh-10 px-6 py-2 bg-[#ff7700] rounded-lg justify-center items-center gap-2.5 inline-flex text-white text-base font-semibold font-['Pretendard Variable'] leading-normal"
                >
                  로그인
                </button>
              ) : (
                <div className="flex gap-3 items-center">
                  <UserIcon onClick={() => router.push("/mypage")}/>
                  <button
                    onClick={handleLoginClick}
                    className="h-9 px-5 grow py-2 bg-[#71bb9d] rounded-lg justify-center items-center gap-2.5 inline-flex text-white text-base font-semibold font-['Pretendard Variable'] leading-normal"
                  >
                    로그아웃
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
      {/* (태블릿, 모바일)화면 크기가 1000px미만부터는 아래 헤더로 보이도록 */}
      <div className={`
        // 공통 스타일
        h-[60px] w-full flex items-center
        ${pathName === "/map" ? "bg-white" : "bg-background"}
        lg:hidden
      `}>
        <div className={`
          // 공통 스타일
          flex justify-between items-center mx-auto
          // 태블릿 (641px ~ 999px)
          md:w-[601px]
          // 모바일 (640px 이하)
          w-full px-[20px]
        `}>
          <ListIcon/>
          <LogoIcon onClick={() => router.push("/")}/>
          <AccountCircleIcon onClick={() => router.push("/mypage")}/>
        </div>
      </div>
    </AdditionalHeader>
  );
};

export default Header;