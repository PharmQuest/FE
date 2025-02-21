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
import { useEffect, useState } from "react";
import { setAccessToken, setRefreshToken, clearTokens } from "@/utils/cookie"; // 쿠키 관리 모듈 import
import useAuthStore from "@/store/useAuthStore";
import { axiosInstance } from "@/apis/axios-instance";

export default function Login() {
  const router = useRouter();
  const { access_token, refresh_token } = router.query;
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!router.isReady) return;

    // 1. URL에서 access_token & refresh_token 숨기기
    if (access_token && refresh_token) {
      const cleanURL = router.pathname;
      router.replace(cleanURL, undefined, { shallow: true }).then(() => {
        // 2. URL 정리 후 토큰 저장
        try {
          clearTokens(); // 기존 쿠키 삭제
          setAccessToken(access_token as string);
          setRefreshToken(refresh_token as string);

          console.log("토큰이 저장되었습니다.");
          setLoading(false);

          // 3. 메인 페이지로 이동
          router.push("/");
        } catch (error) {
          console.error("🚨 토큰 저장 중 오류 발생:", error);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  }, [router.isReady, access_token, refresh_token]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);

    try {
      clearTokens();
      const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_DOMAIN}/tempLogin?name=local1312`)
      const accessToken = response?.data?.accessToken
      const refreshToken = response?.data?.refreshToken

      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      router.push('/')
    } catch (error) {
      console.error("로그인 요청 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(isLoggedIn){
      router.replace("/")
    }
    
  }, [isLoggedIn]);

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
              <LogoSymbolIcon className="sm:w-[57px] sm:h-[59px] w-11 h-[45px]" />
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

            <p className="md:text-subhead1-sb text-m-subhead1-sb text-gray-300 text-center mb-6 mt-[104px]">
              소셜 로그인으로 간편하게 시작해보세요.
            </p>
            <div className="w-full px-8 flex flex-col items-center md:gap-4 gap-3">
              {/* 일반 로그인 버튼 */}
              <Image
                src={NaverLoginButton}
                alt="Login with Naver"
                className="hidden md:block cursor-pointer"
                onClick={() => handleLogin()}
                priority
              />
              <Image
                src={KakaoLoginButton}
                alt="Login with Kakao"
                className="hidden md:block cursor-pointer"
                onClick={() => handleLogin()}
              />
              <Image
                src={GoogleLoginButton}
                alt="Login with Google"
                className="hidden md:block cursor-pointer"
                onClick={() => handleLogin()}
              />

              {/* 반응형 로그인 버튼 */}
              <Image
                src={MobileNaverLoginButton}
                alt="Login with Naver"
                className="md:hidden cursor-pointer"
                onClick={() => handleLogin()}
              />
              <Image
                src={MobiieKakaoLoginButton}
                alt="Login with Kakao"
                className="md:hidden cursor-pointer"
                onClick={() => handleLogin()}
              />
              <Image
                src={MobileGoogleLoginButton}
                alt="Login with Google"
                className="md:hidden cursor-pointer"
                onClick={() => handleLogin()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
