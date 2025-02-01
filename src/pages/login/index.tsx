import {
  GoogleLoginButton,
  KakaoLoginButton,
  NaverLoginButton,
  LoginBgImage,
} from "@public/images";
import { LogoSymbolIcon, LogoTextIcon } from "@public/svgs";

import Image from "next/image";

export default function Login() {
  return (
    <>
      <div className={`bg-background relative h-screen`}>
        <Image
          src={LoginBgImage}
          alt=""
          fill
          quality={90}
          className="object-cover"
          priority
          sizes="100vw"
        />

        <div
          className={`relative z-10 h-full px-[260px] flex items-center justify-center`}
        >
          <div
            className={`w-[484px] h-[665px] shrink-0 bg-white flex flex-col items-center rounded-xl shadow-lg py-12 `}
          >
            <div className="flex flex-row justify-center items-center gap-[13px] mt-5">
              <LogoSymbolIcon />
              <LogoTextIcon className="w-[133px]" />
            </div>
            <p className="text-headline-b text-gray-500 text-center mt-10">
              해외에서 당황하지 말고 <br />
              현지 상비약과 약국 정보는 <br />
              <span className="flex items-center justify-center gap-1">
                <LogoTextIcon className="w-[57px]" />
                <span>에서!</span>
              </span>
            </p>

            <p className="text-subhead1-sb text-gray-300 text-center mb-6 mt-[104px]">
              소셜 로그인으로 간편하게 시작해보세요.
            </p>
            <div className={`w-[420px] flex flex-col items-center gap-4`}>
              <Image
                src={NaverLoginButton}
                alt="Login with Naver"
                className="cursor-pointer"
              />
              <Image
                src={KakaoLoginButton}
                alt="Login with Kakao"
                className="cursor-pointer"
              />
              <Image
                src={GoogleLoginButton}
                alt="Login with Google"
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
