import React from "react";

const Footer = () => {
	return (
		<div className="w-full bg-secondary-500 text-white">
            <div className="box-border
			mx-auto
                // PC 1001-1440px
				xl:w-[900px] xl:px-auto
                // PC 1000px
				lg:w-[900px] lg:px-[50px]
                // 태블릿 (641px - 1000px)
                md:w-[900px] md:px-auto
                // 모바일 (641px 미만)
                w-full px-5">
		<div className=" flex flex-col mt-[48px] gap-6 pt-3 pb-6">
			<div className="flex flex-row gap-3 text-subhead1-sb">
				<p className="cursor-pointer">Service 안내</p>|
				<p className="cursor-pointer">개인정보처리방침</p>|
				<p className="cursor-pointer">이용약관</p>
			</div>
			<p className="text-display1-b">로고 타입</p>
		</div>
		</div>
		</div>
	);
};

export default Footer;
