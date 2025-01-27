import { useRouter } from "next/router";
import React from "react";

const Footer = () => {
  const router = useRouter();
  if (router.pathname === "/map") return null;

  return (
    <div className="flex flex-col mt-[48px] gap-6 w-full h-32 px-[260px] pt-3 pb-6 box-border bg-secondary-500 text-white">
      <div className="flex flex-row gap-3 text-subhead1-sb">
        <p className="cursor-pointer">Service 안내</p>|
        <p className="cursor-pointer">개인정보처리방침</p>|
        <p className="cursor-pointer">이용약관</p>
      </div>
      <p className="text-display1-b">로고 타입</p>
    </div>
  );
};

export default Footer;
