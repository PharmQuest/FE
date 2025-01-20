// 약국찾기 메인화면
import React, { useState } from "react";

export default function Map() {
  const [isSearchOpen, setIsSearchOpen] = useState(true); // 검색창 열림 상태 관리
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev); // 상태 토글
  };

  return (
    <>
      <hr className="border-b border-solid border-gray-100"/>
      
      <div className="w-[404px] h-[1024px] shrink-0 flex flex-row">

      {isSearchOpen && (
        <div className="w-[380px] h-[1002px] shrink-0 border border-gray-100 border-t-0">
          {/* 검색 */}
          <div className='h-[120px] bg-white border-b border-gray-100 flex py-5 px-7 flex-col justify-start items-start gap-4 self-stretch'>
            <div className='w-[324px] h-[40px] flex justify-start py-2 pl-2 pr-4 items-center gap-2 self-stretch mb-4 rounded-lg border-2 border-solid border-secondary-500'>
              <img
                src="/svgs/search.svg"
                alt="검색아이콘"
                className="w-6 h-6"
              />
              <input placeholder="검색어를 입력하세요." className="text-gray-300 text-base font-normal font-['Pretendard Variable'] leading-normal"></input>              
            </div>
            <div className="font-['Pretendard Variable'] leading-normal text-subhead1-sb text-gray-400">검색 결과 2건</div>
          </div>
          {/* 약국 정보 */}
          <div className="h-[126px] bg-white border-b border-gray-100 pl-7 py-5 flex justify-start items-center gap-3 self-stretch">
            <div className="w-[86px] h-[86px] bg-[#cccccc] rounded"/>
            {/* 약국 정보 */}
            <div className="flex w-[145px] flex-col items-start">
              <div className="flex items-center mb-3 gap-[3px]">
                <div className="text-subhead1-sb text-gray-600 text-[16px] font-['Pretendard Variable'] leading-normal">다아나약국</div>
                <div className="h-[18px] flex px-1 justify-center items-center gap-2.5 rounded bg-primary-300 text-white text-xs font-semibold font-['Pretendard Variable'] leading-[18px]">영업중</div>
              </div>
              {/* 약국 세부 정보 */}
              <div className="self-stretch h-11 flex-col justify-start items-start gap-0.5 flex">
                  <div className="text-gray-400 text-sm font-normal font-['Pretendard Variable'] leading-[21px]">18:00에 영업 종료</div>
                  <div className="items-center gap-1.5 inline-flex">
                      <div className="text-gray-500 text-sm font-semibold">500m</div>
                      <div className="w-0.5 h-0.5 bg-[#cccccc] rounded-full"></div>
                      <div className="text-gray-400 text-sm">서울 중구 중앙동</div>
                  </div>
              </div>
            </div>
            {/* 경로 */}
            <div className="w-[30px] h-[52px] ml-[1.6px]">
              <img
                  src="/svgs/map-find.svg"
                  alt="검색아이콘"
                  className="w-[30px] h-[52px]"
              />
            </div>
          </div>
          {/* 약국 정보2 */}
          <div className="h-[126px] bg-white border-b border-gray-100 pl-7 py-5 flex justify-start items-center gap-3 self-stretch">
            <div className="w-[86px] h-[86px] bg-[#cccccc] rounded"/>
            {/* 약국 정보 */}
            <div className="flex w-[145px] flex-col items-start">
              <div className="flex items-center mb-3 gap-[3px]">
                <div className="text-subhead1-sb text-gray-600 text-[16px] font-['Pretendard Variable'] leading-normal">다아나약국</div>
                <div className="h-[18px] flex px-1 justify-center items-center gap-2.5 rounded bg-green-50 text-gray-400 text-xs font-semibold font-['Pretendard Variabl'] leading-[18px]">영업종료</div>
              </div>
              {/* 약국 세부 정보 */}
              <div className="self-stretch h-11 flex-col justify-start items-start gap-0.5 flex">
                  <div className="text-gray-400 text-sm font-normal font-['Pretendard Variable'] leading-[21px]">내일 8:00에 오픈</div>
                  <div className="items-center gap-1.5 inline-flex">
                      <div className="text-gray-500 text-sm font-semibold">1.1km</div>
                      <div className="w-0.5 h-0.5 bg-[#cccccc] rounded-full"></div>
                      <div className="text-gray-400 text-sm">서울 중구 중앙동</div>
                  </div>
              </div>
            </div>
            {/* 경로 */}
            <div className="w-[30px] h-[52px] ml-[1.6px]">
              <img
                src="/svgs/map-find.svg"
                alt="검색아이콘"
                className="w-[30px] h-[52px]"
              />
            </div>
          </div>
          
          <div className="h-[126px] bg-white border-b border-gray-100"></div>
          <div className="h-[126px] bg-white border-b border-gray-100"></div>
          <div className="h-[126px] bg-white border-b border-gray-100"></div>
          <div className="h-[126px] bg-white border-b border-gray-100"></div>
        </div>
      )}

        {/* 검색창 접기 */}
        <button onClick={toggleSearch} className="w-6 h-[46px] bg-white mt-[566px] mb-[426px] text-gray-300 border-l-0 border-b-2 border-t-2 border-r-2 border-solid border-gray-100 rounded-tr-[4px] rounded-br-[4px]">{isSearchOpen ? "<" : ">"}</button>
      </div>
    </>
  );
}
