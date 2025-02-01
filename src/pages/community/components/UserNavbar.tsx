import React from "react";
import NavbarItem from "./NavbarItem";
import { useRouter } from "next/router";
const USER_NAVBAR_ITEMS = [
  {
    text: "마이페이지",
    path: "/mypage",
  },
  {
    text: "작성한 게시글",
    path: "/community/activities",
    activePath: "posts",
  },
  {
    text: "작성한 댓글",
    path: "/community/activities",
    activePath: "comments",
  },
  {
    text: "게시글 스크랩",
    path: "/community/activities",
    activePath: "scraps",
  },
  {
    text: "알림",
    path: "/community/activities",
    activePath: "notifications",
  },
] as const;

type UserNavbarItem = (typeof USER_NAVBAR_ITEMS)[number];

const UserNavbar = () => {
  const router = useRouter();

  const handleNavigation = (item: UserNavbarItem) => {
    const queryParam =
      "activePath" in item && item.activePath
        ? `?tab=${encodeURIComponent(item.activePath)}`
        : "";
    router.push(`${item.path}${queryParam}`);
  };

  const handleLogout = () => {
    console.log("로그아웃");
  };

  return (
    <div 
      className="
        lg:block
        hidden w-[170px] rounded-lg border-solid border-[1px] border-gray-200 flex-shrink-0">
      <div className="p-4 pt-[13px]">
        <div className={`flex gap-1`}>
          <p className="text-headline-b text-gray-600">maengso</p>
          <p className={`text-body1-r content-center`}>님</p>
        </div>
        <p className="text-caption1-r text-gray-300">naver 로그인</p>
        <div className=" flex flex-col gap-4">
          <button
            className="w-full h-[37px] py-2 text-center text-subhead2-sb bg-primary-500 text-white rounded-[4px] mt-4"
            onClick={() => router.push("/community/create")}
          >
            게시글 작성
          </button>
          <button
            className="w-full h-[37px] py-2 text-center text-subhead2-sb text-gray-400 rounded-[4px] border-solid border-[1px] border-gray-200"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      </div>
      {USER_NAVBAR_ITEMS.map((item, index) => (
        <NavbarItem
          key={index}
          text={item.text}
          onClick={() => handleNavigation(item)}
        />
      ))}
    </div>
  );
};

export default UserNavbar;
