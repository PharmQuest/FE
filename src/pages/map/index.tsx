// 약국찾기 메인화면
import React, { useState } from "react";
import {MapFindIcon, FindSearchIcon, FindGTIcon, FindLTIcon} from "@public/svgs";

export default function Map() {
  const [isSearchOpen, setIsSearchOpen] = useState(true); // 검색창 열림 상태 관리
  
  const pharmacies = [
    {
      id: 1,
      image: "/path/to/image1",
      name: "다아나약국",
      isOpen: true,
      operationTime: "18:00에 영업 종료",
      distance: "500m",
      address: "서울 중구 중앙동"
    },
    {
      id: 2,
      image: "/path/to/image2",
      name: "다아나약국",
      isOpen: false,
      operationTime: "내일 8:00에 오픈",
      distance: "1.1km",
      address: "서울 중구 중앙동"
    },
    {
      id: 3,
      image: "/path/to/image1",
      name: "다아나약국",
      isOpen: true,
      operationTime: "18:00에 영업 종료",
      distance: "500m",
      address: "서울 중구 중앙동"
    },
    {
      id: 4,
      image: "/path/to/image2",
      name: "다아나약국",
      isOpen: false,
      operationTime: "내일 8:00에 오픈",
      distance: "1.1km",
      address: "서울 중구 중앙동"
    },
    {
      id: 5,
      image: "/path/to/image1",
      name: "다아나약국",
      isOpen: true,
      operationTime: "18:00에 영업 종료",
      distance: "500m",
      address: "서울 중구 중앙동"
    },
    {
      id: 6,
      image: "/path/to/image2",
      name: "다아나약국",
      isOpen: false,
      operationTime: "내일 8:00에 오픈",
      distance: "1.1km",
      address: "서울 중구 중앙동"
    },
    {
      id: 7,
      image: "/path/to/image1",
      name: "다아나약국",
      isOpen: true,
      operationTime: "18:00에 영업 종료",
      distance: "500m",
      address: "서울 중구 중앙동"
    },
    {
      id: 9,
      image: "/path/to/image2",
      name: "다아나약국",
      isOpen: false,
      operationTime: "내일 8:00에 오픈",
      distance: "1.1km",
      address: "서울 중구 중앙동"
    },
    {
      id: 9,
      image: "/path/to/image1",
      name: "다아나약국",
      isOpen: true,
      operationTime: "18:00에 영업 종료",
      distance: "500m",
      address: "서울 중구 중앙동"
    },
  ];

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev); // 상태 토글
  };

  return (
    <>
      <div className="flex">
      <hr className="border-b border-solid border-gray-100"/>
      
      <div className="w-[404px] h-[1024px] shrink-0 flex flex-row relative">
        {isSearchOpen && (
          <div className="w-[380px] h-full shrink-0 border border-gray-100 border-t-0 flex flex-col">
            {/* 검색 */}
            <div className='h-[120px] bg-white border-b border-gray-100 flex py-5 px-7 flex-col justify-start items-start gap-4 self-stretch'>
              <div className='w-[324px] h-[40px] flex justify-start py-2 pl-2 pr-4 items-center gap-2 self-stretch  rounded-lg border-2 border-solid border-secondary-500'>
                <FindSearchIcon/>
                <input placeholder="검색어를 입력하세요." className="text-gray-300 text-base font-normal font-['Pretendard Variable'] leading-normal"></input>              
              </div>
              <div className="font-['Pretendard Variable'] leading-normal text-subhead1-sb text-gray-400">검색 결과 2건</div>
            </div>
            
            {/* 약국 목록을 반복문으로 */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {pharmacies.map((pharmacy) => (
                // 아래 코드를 button으로 수정했더니 border-gray-100가 안 보여... 어쩌지?
                <button key={pharmacy.id} className="h-[126px] bg-white outline outline-1 outline-gray-100 w-full hover:bg-gray-50 px-7 py-5 flex items-center self-stretch">
                  <div className="w-[86px] h-[86px] bg-[#cccccc] rounded"/>
                  {/* 약국 이름과 영업 정보 */}
                  <div className="flex w-[145px] flex-col items-start ml-3">
                    <div className="flex items-center mb-3 gap-[3px]">
                      <div className="text-subhead1-sb text-gray-600 text-[16px] font-['Pretendard Variable'] leading-normal">{pharmacy.name}</div>
                      <div className={`h-[18px] flex px-1 justify-center items-center gap-2.5 rounded ${pharmacy.isOpen ? 'bg-primary-300 text-white' : 'bg-green-50 text-gray-400'} text-xs font-semibold font-['Pretendard Variable'] leading-[18px]`}>
                        {pharmacy.isOpen ? '영업중' : '영업종료'}
                      </div>
                    </div>
                    {/* 약국 세부 정보 */}
                    <div className="self-stretch h-11 flex-col justify-start items-start gap-0.5 flex">
                      <div className="text-gray-400 text-sm font-normal font-['Pretendard Variable'] leading-[21px]">{pharmacy.operationTime}</div>
                      <div className="items-center gap-1.5 inline-flex">
                        <div className="text-gray-500 text-sm font-semibold">{pharmacy.distance}</div>
                        <div className="w-0.5 h-0.5 bg-[#cccccc] rounded-full"></div>
                        <div className="text-gray-400 text-sm">{pharmacy.address}</div>
                      </div>
                    </div>
                  </div>
                  {/* 경로 */}
                  <div className="w-[30px] h-[52px] ml-auto">
                    <MapFindIcon/>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        {/* 검색창 접기 */}
        <button onClick={toggleSearch} className="w-6 h-[46px] pl-[7px] bg-white mt-[450px] mb-[426px] text-gray-300 border-l-0 border-b-2 border-t-2 border-r-2 border-solid border-gray-100 rounded-tr-[4px] rounded-br-[4px]">{isSearchOpen ? <FindLTIcon/> : <FindGTIcon/>}</button>
      </div>
      {/* 현 지도에서 검색 버튼 */}
      <button className="fixed bottom-6 left-[825px] mt-[854px] h-11 px-[30px] py-2.5 bg-primary-500 rounded-full border border-[#138e5d] justify-center items-center gap-2 inline-flex text-white text-base font-semibold font-['Pretendard Variable'] leading-normal">현 지도에서 검색</button>
      </div>
    </>
  );
}
