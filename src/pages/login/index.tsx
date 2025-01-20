// 로그인 페이지
import {KakaoIcon, NaverIcon, GoogleIcon} from "@public/svgs"

export default function Login() {
  return (
    <>
    <div className={`pl-[260px] pr-[260px] flex flex-col`}>

      <div className={`flex flex-col items-center mt-[199px] mb-[73px]`}>
        <h1 className={`text-gray-600 text-[40px] font-bold whitespace-nowrap`}>로그인</h1>
        <h2 className={`text-gray-600 text-[25px] font-bold`}>LOGIN</h2>
      </div>

      <div className={`flex flex-col items-center gap-[30px]`}>
        <button className={`pl-[287px] w-[760px] h-[54px] text-[23px] rounded-[10px] flex items-center gap-[22px] bg-[#FEE500]`}>
          <KakaoIcon/>
          카카오 로그인
        </button>
        <button className={`pl-[287px] w-[760px] h-[54px] text-[23px] rounded-[10px] flex items-center gap-[22px] bg-[#03CF5D]`}>
          <NaverIcon/>
          네이버 로그인
        </button>
        <button className={`pl-[287px] w-[760px] h-[54px] text-[23px] rounded-[10px] flex items-center gap-[22px] border-[#CBCBCB] border border-solid`}>
          <GoogleIcon/>
          구글 로그인
        </button>
      </div>
    </div>
    </>
  );
}
