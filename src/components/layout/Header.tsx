import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import AdditionalHeader from "./AdditionalHeader";
import {LogoIcon, UserIcon, MenuLogoIcon, AccountCircleIcon, GTIcon} from "@public/svgs"

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null); // Ref 타입 지정
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();
  const pathName = router.pathname;

  // 로그인
  const handleLoginClick = () => {
    setIsLoggedIn(true); // 로그아웃 상태로 변경
    router.push("/login")    
  };

  // 로그아웃
  const handleLogoutClick = () => {
    setIsLoggedIn(false); // 로그인 상태로 변경
    router.push("/")
  };

  // 사이드바 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
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

  return (
    <AdditionalHeader pathName={pathName}>
      {/* (PC)기존 헤더 코드(화면 1000px 이상일 때) */}
      <div
        className={`w-full hidden lg:flex grow justify-center items-center h-[110px] bg-background`}>
          <div className={`
            // 기본 스타일
            flex items-center gap-12
            // 1000px 초과 (xl)
            xl:w-[900px] xl:mx-auto
            // 딱1000px (lg)
            lg:w-[900px] lg:mx-[50px]
            `}>
            <LogoIcon className="min-w-fit cursor-pointer" onClick={() => router.push("/")}/>
            <div className="whitespace-nowrap flex grow h-[46px] justify-between items-center">
              <button className=" px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-2.5 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
                      onClick={() => router.push("/medicines")}>상비약 리스트</button>
              <button className=" px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-2.5 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
                      onClick={() => router.push("/map")}>약국 찾기</button>
              <button className=" px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-1 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
                      onClick={() => router.push("/community")}>커뮤니티
                      {/* 로그인하면 보임 */}
                      {isLoggedIn && (
                        <div className="w-[18px] h-[18px] relative">
                          <div className="w-[18px] h-[18px] left-0 top-0 absolute bg-[#ff7700] rounded-full"></div>
                          <div className="left-[6px] top-0 absolute text-white text-xs font-semibold font-['Pretendard Variable'] leading-[18px]">
                            1
                          </div>
                        </div>
                      )}
              </button>
              <button className=" px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-2.5 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
                      onClick={() => router.push("/supplements")}>해외 인기 영양제</button>
              {/* 로그인 상태에 따라 버튼 렌더링 */}
              {isLoggedIn ? (
                // isLoggedIn이 true
                <div className="flex gap-3 items-center">
                  <UserIcon onClick={() => router.push("/mypage")}/>
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
          // 모바일 (641px 미만)
          w-full
        `}>
          <MenuLogoIcon className="cursor-pointer" onClick={toggleSidebar}/>
          <LogoIcon onClick={() => router.push("/")}/>
          <AccountCircleIcon onClick={() => router.push("/mypage")}/>
        </div>
      </div>
      {/* 사이드바 */}
      {isSidebarOpen && (
        <>
          {/* 사이드바 말고 나머지 배경에 #000000 opacity 30% 적용 */}
          <div onClick={() => setIsSidebarOpen(false)} // 오버레이 클릭 시 사이드바 닫기
              className="fixed top-0 left-0 w-full h-full bg-black/30 z-40"></div>
          {/* 사이드바 부분 */}
          <div ref={sidebarRef} className="fixed top-0 left-0 h-screen w-[240px] bg-white shadow-lg z-50">
            <div className="h-[662px]">
              {/* 사이드바 안에 내용 */}
              <div className="flex flex-col">
                {/* 로고와 로그인 버튼 */}
                <div className="h-[150px] border-b border-gray-100 flex flex-col justify-center items-center">
                  <LogoIcon className="min-w-fit cursor-pointer" onClick={() => { router.push("/"); setIsSidebarOpen(false); }}/>
                  <button onClick={() => { handleLoginClick(); setIsSidebarOpen(false); }}  className="mt-[25px] w-[168px] h-10 px-[38px] py-2 bg-[#ff7700] rounded-lg justify-center items-center gap-2.5 inline-flex text-white text-base font-semibold font-['Pretendard Variable'] leading-normal">로그인</button>
                </div>
                {/* 메뉴 시작 */}                
                <button onClick={() => { router.push("/medicines"); setIsSidebarOpen(false); }} className="w-full">
                  <div className="h-16 px-8 py-5 border-b border-gray-100">
                    <div className="flex justify-between items-center text-[#333333] text-base font-bold font-['Pretendard Variable'] leading-normal">
                      <span>상비약 리스트</span>
                      <span><GTIcon/></span>
                    </div>
                  </div>
                </button>
                {/* test */}
                <button onClick={() => { router.push("/map"); setIsSidebarOpen(false); }} className="w-full">
                  <div className="h-16 px-8 py-5 border-b border-gray-100">
                    <div className="flex justify-between items-center text-[#333333] text-base font-bold font-['Pretendard Variable'] leading-normal">
                      <span>약국 찾기</span>
                      <span><GTIcon/></span>
                    </div>
                  </div>
                </button> 
                <button onClick={() => { router.push("/community"); setIsSidebarOpen(false); }} className="w-full">
                  <div className="h-16 px-8 py-5 border-b border-gray-100"> 
                    <div className="flex justify-between items-center text-[#333333] text-base font-bold font-['Pretendard Variable'] leading-normal">
                      <span>커뮤니티</span>
                      <span><GTIcon/></span>
                    </div>
                  </div>
                </button>                   
                <button onClick={() => { router.push("/supplements"); setIsSidebarOpen(false); }} className="w-full">
                  <div className="h-16 px-8 py-5 border-b border-gray-100"> 
                    <div className="flex justify-between items-center text-[#333333] text-base font-bold font-['Pretendard Variable'] leading-normal">
                      <span>해외 인기 영양제</span>
                      <span><GTIcon/></span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </AdditionalHeader>
  );
};

export default Header;