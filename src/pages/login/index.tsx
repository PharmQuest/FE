import {
  GoogleLoginButton,
  KakaoLoginButton,
  NaverLoginButton,
  LoginBgImage,
  MobileNaverLoginButton,
  MobiieKakaoLoginButton,
  MobileGoogleLoginButton,
} from "@public/images";
import { LogoSymbolIcon, LogoTextIcon, XIcon } from "@public/svgs";

import Image from "next/image";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  return (
    <>
      <div className="md:bg-background bg-white relative h-screen">
        <button
          onClick={() => router.back()}
          className="md:hidden block absolute top-4 right-4 z-20 p-2 hover:bg-gray-50 rounded-full"
          aria-label="뒤로 가기"
        >
          <XIcon />
        </button>

        <div className="md:block hidden">
          <Image
            src={LoginBgImage}
            alt=""
            fill
            quality={90}
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="w-[484px] h-[665px] md:shrink-0 bg-white flex flex-col items-center rounded-xl md:shadow-lg py-12">
            <div className="flex flex-row justify-center items-center gap-[13px] mt-5">
              <LogoSymbolIcon className="sm:w-[57px] sm:h-[59px] w-11 h-[45px] " />
              <LogoTextIcon className="sm:w-[133px] w-[103px]" />
            </div>
            <p className="md:text-headline-b text-m-headline1-b text-gray-500 text-center mt-10">
              해외에서 당황하지 말고 <br />
              현지 상비약과 약국 정보는 <br />
              <span className="flex items-center justify-center gap-1">
                <LogoTextIcon className="md:w-[57px] w-[52px]" />
                <span>에서!</span>
              </span>
            </p>

            <p className="md:text-subhead1-sb text-m-subhead1-sb  text-gray-300 text-center mb-6 mt-[104px]">
              소셜 로그인으로 간편하게 시작해보세요.
            </p>
            <div className="w-full px-8 flex flex-col items-center gap-4">
              {/* 일반 로그인 버튼 */}
              <Image
                src={NaverLoginButton}
                alt="Login with Naver"
                className="hidden md:block cursor-pointer"
                priority
              />
              <Image
                src={KakaoLoginButton}
                alt="Login with Kakao"
                className="hidden md:block cursor-pointer"
              />
              <Image
                src={GoogleLoginButton}
                alt="Login with Google"
                className="hidden md:block cursor-pointer"
              />

              {/* 반응형 로그인 버튼 */}
              <Image
                src={MobileNaverLoginButton}
                alt="Login with Naver"
                className="md:hidden cursor-pointer"
              />
              <Image
                src={MobiieKakaoLoginButton}
                alt="Login with Kakao"
                className="md:hidden cursor-pointer"
              />
              <Image
                src={MobileGoogleLoginButton}
                alt="Login with Google"
                className="md:hidden cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
