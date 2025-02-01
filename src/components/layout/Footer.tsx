import React from "react";
import { useRouter } from "next/router";
import { FooterLogoIcon } from "@public/svgs";

const Footer = () => {
  const router = useRouter();
  if (router.pathname === "/map") return null;
  if (router.pathname === "/login") return null;

  return (
    <div className="w-full bg-secondary-500 text-white">
      <div className="box-border
                      // 641px 미만 (모바일)
                      w-[calc(100%-40px)] mx-5
                      // 641px - 999px (태블릿)
                      md:w-[601px] md:mx-auto
                      // 1000px
                      lg:w-[900px] lg:mx-[50px]
                      // 1001px 이상
                      xl:w-[900px] xl:mx-auto">
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
