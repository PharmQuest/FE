import { useRouter } from "next/router";
import React, { useState } from "react";
import MedicineHeader from "./AdditionalHeader";
import {LogoIcon, UserIcon} from "@public/svgs"

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
    <MedicineHeader pathName={pathName}>
      <div
        className={`px-[260px] flex grow items-center h-[110px] ${
          pathName === "/map" ? "bg-white" : "bg-background"
        }`}
        >
        <LogoIcon onClick={() => router.push("/")}/>
        {/* <button
          onClick={() => router.push("/")}
          className="flex grow my-7 w-[127px] h-[46px] px-10 py-2 bg-[#c6c6c6]/50 justify-center items-center gap-2.5 inline-flex text-[#284440] text-xl font-semibold font-['Inter']"
        >
          로고 타입
        </button> */}
        <div className="flex grow ml-[52px] w-[739px] h-[46px] justify-between items-center inline-flex">
          <button
            onClick={() => router.push("/medicines")}
            className="px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-2.5 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
          >
            상비약 리스트
          </button>
          <button
            onClick={() => router.push("/map")}
            className="flex grow px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-2.5 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
          >
            약국 찾기
          </button>
          <button
            onClick={() => router.push("/community")}
            className="flex grow px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-2.5 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
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
            className="flex grow px-4 py-2 bg-[#c6c6c6]/0 justify-center items-center gap-2.5 flex text-[#333333] text-xl font-bold font-['Pretendard Variable'] leading-[30px]"
          >
            해외 인기 영양제
          </button>
          {/* 로그인 상태에 따라 버튼 렌더링 */}
          {isLoggedIn ? (
            <button
              onClick={handleLogoutClick}
              className="flex growh-10 px-6 py-2 bg-[#ff7700] rounded-lg justify-center items-center gap-2.5 inline-flex text-white text-base font-semibold font-['Pretendard Variable'] leading-normal"
            >
              로그인
            </button>
          ) : (
            <div className="flex gap-3 items-center">
              <UserIcon onClick={() => router.push("/mypage")}/>
              <button
                onClick={handleLoginClick}
                className="h-9 px-5 py-1.5 flex grow py-2 bg-[#71bb9d] rounded-lg justify-center items-center gap-2.5 inline-flex text-white text-base font-semibold font-['Pretendard Variable'] leading-normal"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </MedicineHeader>
  );
};

export default Header;