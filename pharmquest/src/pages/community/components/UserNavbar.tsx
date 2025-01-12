import React from "react";
import NavbarItem from "./NavbarItem";

const UserNavbar = () => {
  const navbarItems = [
    "마이페이지",
    "작성한 게시글",
    "작성한 댓글",
    "게시글 스크랩",
    "알림",
  ];

  return (
    <div className="w-[190px] rounded-lg border-solid border-[1px] border-gray-200 flex-shrink-0">
      <div className="p-4">
        <p className="text-headline-b text-gray-600">maengso 님</p>
        <p className="text-caption1-r text-gray-300">naver 로그인</p>
        <div className=" flex flex-col gap-3">
          <button className="w-full py-2 text-center bg-primary-500 text-white rounded-[4px] mt-4">
            게시글 작성
          </button>
          <button className="w-full py-2 text-center text-gray-400 rounded-[4px] border-solid border-[1px] border-gray-200 ">
            로그아웃
          </button>
        </div>
      </div>
      {navbarItems.map((item, index) => (
        <NavbarItem key={index} text={item} />
      ))}
    </div>
  );
};

export default UserNavbar;
