import { GTIcon, LogoIcon } from "@public/svgs";
import { useRouter } from "next/router";

interface SidebarProp {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  handleLoginClick: () => void;
}

const Sidebar: React.FC<SidebarProp> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  sidebarRef,
  handleLoginClick,
}) => {

  const router = useRouter();

  return (
    <>
      {/* 사이드바 말고 나머지 배경에 #000000 opacity 30% 적용 */}
      <div
        onClick={() => setIsSidebarOpen(false)} // 오버레이 클릭 시 사이드바 닫기
        className={`
          ${isSidebarOpen ? `opacity-100` : `opacity-0 pointer-events-none`}
          fixed top-0 left-0 w-full h-full bg-black/30 z-[60] transition-all duration-500 ease-out`}
      ></div>
      {/* 사이드바 부분 */}
      <div
        ref={sidebarRef}
        className={`
          ${isSidebarOpen ? `left-0` : `left-[-240px] pointer-events-none`}
          fixed top-0 left-0 h-screen w-[240px] bg-white shadow-lg z-[999] transition-all duration-300 ease-out`}
      >
        <div className="h-[662px]">
          {/* 사이드바 안에 내용 */}
          <div className="flex flex-col">
            {/* 로고와 로그인 버튼 */}
            <div className="h-[150px] border-b border-gray-100 flex flex-col justify-center items-center">
              <LogoIcon
                className="min-w-fit cursor-pointer"
                onClick={() => {
                  router.push("/");
                  setIsSidebarOpen(false);
                }}
              />
              <button
                onClick={() => {
                  handleLoginClick();
                  setIsSidebarOpen(false);
                }}
                className="mt-[25px] w-[168px] h-10 px-[38px] py-2 bg-[#ff7700] rounded-lg justify-center items-center gap-2.5 inline-flex text-white text-base font-semibold font-['Pretendard Variable'] leading-normal"
              >
                로그인
              </button>
            </div>
            {/* 메뉴 시작 */}
            <button
              onClick={() => {
                router.push("/medicines");
                setIsSidebarOpen(false);
              }}
              className="w-full"
            >
              <div className="h-16 px-8 py-5 border-b border-gray-100">
                <div className="flex justify-between items-center text-[#333333] text-base font-bold font-['Pretendard Variable'] leading-normal">
                  <span>상비약 리스트</span>
                  <span>
                    <GTIcon />
                  </span>
                </div>
              </div>
            </button>
            {/* test */}
            <button
              onClick={() => {
                router.push("/map");
                setIsSidebarOpen(false);
              }}
              className="w-full"
            >
              <div className="h-16 px-8 py-5 border-b border-gray-100">
                <div className="flex justify-between items-center text-[#333333] text-base font-bold font-['Pretendard Variable'] leading-normal">
                  <span>약국 찾기</span>
                  <span>
                    <GTIcon />
                  </span>
                </div>
              </div>
            </button>
            <button
              onClick={() => {
                router.push("/community");
                setIsSidebarOpen(false);
              }}
              className="w-full"
            >
              <div className="h-16 px-8 py-5 border-b border-gray-100">
                <div className="flex justify-between items-center text-[#333333] text-base font-bold font-['Pretendard Variable'] leading-normal">
                  <span>커뮤니티</span>
                  <span>
                    <GTIcon />
                  </span>
                </div>
              </div>
            </button>
            <button
              onClick={() => {
                router.push("/supplements");
                setIsSidebarOpen(false);
              }}
              className="w-full"
            >
              <div className="h-16 px-8 py-5 border-b border-gray-100">
                <div className="flex justify-between items-center text-[#333333] text-base font-bold font-['Pretendard Variable'] leading-normal">
                  <span>해외 인기 영양제</span>
                  <span>
                    <GTIcon />
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar;