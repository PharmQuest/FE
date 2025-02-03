import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import AdditionalHeader from "./AdditionalHeader";
import {
  LogoIcon,
  UserIcon,
  MenuLogoIcon,
  AccountCircleIcon,
  HomeIcon,
  SearchBoldIcon,
} from "@public/svgs";
import useAuthStore from "@/store/useAuthStore";
import Sidebar from "./Sidebar";

const Header = () => {
  const sidebarRef = useRef<HTMLDivElement | null>(null); // Ref 타입 지정
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathName = router.pathname;

  const isHome = pathName === "/" ? true : false;

  const [title, setTitle] = useState("");

  const { isLoggedIn, logOut, checkAuth } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false)


  useEffect(() => {
    checkAuth();
    setIsMounted(true);
  }, [pathName])

  useEffect(() => {
    switch (pathName) {
      case "/community":
        setTitle("커뮤니티")
        break;

      case "/map":
        setTitle("약국 찾기")
        break;

      case "/medicines":
        setTitle("상비약 리스트")
        break;

      case "/community/activities":
        setTitle("나의 활동")
        break;

      case "/supplements":
        setTitle("해외 인기 영양제")
        break;

      default:
        setTitle("")
        break;
    }
  }, [router])

  // 로그인
  const handleLoginClick = () => {
    router.push("/login");
  };

  // 로그아웃
  const handleLogoutClick = () => {
    logOut();
    router.push("/");
  };

  // 사이드바 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // 메뉴 버튼 클릭하면
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (router.pathname === "/login") return null;

  return (
    <AdditionalHeader pathName={pathName}>
      {/* (PC)기존 헤더 코드(화면 1000px 이상일 때) */}
      <div className={`z-[500] w-full hidden lg:flex grow justify-center items-center h-[110px] bg-background`}>
        <div className={`
            // 기본 스타일
            flex items-center gap-12
            // 1000px 초과 (xl)
            xl:w-[900px] xl:mx-auto
            // 딱1000px (lg)
            lg:w-[900px] lg:mx-[50px]
            `}
        >
          <LogoIcon
            className="min-w-fit cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="whitespace-nowrap flex grow h-[46px] justify-between items-center">
            <button
              className=" px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-2.5 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
              onClick={() => router.push("/medicines")}
            >
              상비약 리스트
            </button>
            <button
              className=" px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-2.5 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
              onClick={() => router.push("/map")}
            >
              약국 찾기
            </button>
            <button
              className=" px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-1 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
              onClick={() => router.push("/community")}
            >
              커뮤니티
              {/* 로그인하면 보임 */}
              {isMounted && isLoggedIn && (
                <div className="w-[18px] h-[18px] relative">
                  <div className="w-[18px] h-[18px] left-0 top-0 absolute bg-[#ff7700] rounded-full"></div>
                  <div className="left-[6px] top-0 absolute text-white text-xs font-semibold font-['Pretendard Variable'] leading-[18px]">
                    1
                  </div>
                </div>
              )}
            </button>
            <button
              className=" px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-2.5 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
              onClick={() => router.push("/supplements")}
            >
              해외 인기 영양제
            </button>
            {/* 로그인 상태에 따라 버튼 렌더링 */}
            {isLoggedIn ? (
              // isLoggedIn이 true
              <div className="flex gap-3 items-center">
                <UserIcon onClick={() => router.push("/mypage")} />
                <button
                  onClick={handleLogoutClick}
                  className="h-9 px-5 grow py-2 bg-[#71bb9d] rounded-lg justify-center items-center gap-2.5 inline-flex text-white text-base font-semibold font-['Pretendard Variable'] leading-normal"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              // isLoggedIn이 false
              <button
                onClick={handleLoginClick}
                className="growh-10 px-6 py-2 bg-[#ff7700] rounded-lg justify-center items-center gap-2.5 inline-flex text-white text-base font-semibold font-['Pretendard Variable'] leading-normal"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>
      {/* (태블릿, 모바일)화면 크기가 1000px미만부터는 아래 헤더로 보이도록 */}
      <div
        className={`
        // 공통 스타일
        h-[60px] w-full flex items-center
        bg-background
        lg:hidden
      `}
      >
        <div
          className={`
          // 기본 스타일
          flex justify-between items-center
          // 641px ~ 999px (태블릿)
          md:w-[601px] md:mx-auto
          // 641px 미만 (모바일)
          w-full mx-[20px]
        `}
        >
          <MenuLogoIcon className="cursor-pointer w-[104px]" onClick={toggleSidebar} />

          {isHome ? (
            <LogoIcon onClick={() => router.push("/")} />
          ) : (
            <div className={`text-m-display1-b text-gray-600 text-center`}>{title}</div>
          )}

          <div className={`flex gap-4 justify-end w-[104px]`}>
            {!isHome && title === "" &&
              <SearchBoldIcon className={`w-5`} />}
            {!isHome &&
              <HomeIcon
                className={`text-gray-600 w-6`}
                onClick={() => router.push("/")} />
            }
            <AccountCircleIcon
              className={`text-gray-600 w-6`}
              onClick={() => router.push("/mypage")} />
          </div>
        </div>
      </div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        sidebarRef={sidebarRef}
        handleLoginClick={handleLoginClick}/>
    </AdditionalHeader>
  );
};

export default Header;
