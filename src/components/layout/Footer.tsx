import { useRouter } from "next/router";
import React from "react";
import { useRouter } from "next/router";
import { FooterLogoIcon } from "@public/svgs";

const Footer = () => {
  const router = useRouter();
  if (router.pathname === "/map") return null;

  return (
    <div className="w-full bg-secondary-500 text-white">
      <div
        className="box-border
				mx-auto
                // PC 1001-1440px
				xl:w-[900px]
                // PC 1000px일 때
				lg:w-[900px] lg:px-[50px]
                // 태블릿 (641px - 1000px)
                md:w-[601px]
                // 모바일 (641px 미만)
                w-full px-5"
      >
        <div className=" flex flex-col mt-[48px] gap-6 pt-3 pb-6">
          <div className="flex flex-row gap-3 lg:text-subhead1-sb text-sm">
            <p className="cursor-pointer">Service 안내</p>|
            <p className="cursor-pointer">개인정보처리방침</p>|
            <p className="cursor-pointer">이용약관</p>
          </div>
          <FooterLogoIcon />
        </div>
      </div>
    </div>
  );
};

export default Footer;
