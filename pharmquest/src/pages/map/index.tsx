// 약국찾기 메인화면

export default function Map() {
  return (
    <>
      <div className="w-[404px] h-[1024px] shrink-0 flex flex-row bg-orange-200">
        <div className="w-[380px] h-[1002px] shrink-0">
          <div className='h-[120px] bg-white border-b border-gray-100 flex py-5 px-7 mt-[102px] flex-col items-start gap-4 self-stretch'>
            <div className='w-[324px] h-[40px] flex py-2 pl-2 pr-4 items-center gap-2 self-stretch mb-4 rounded-lg border-2 border-solid border-secondary-500 text-gray-300'>
              <img
                src="/svgs/search.svg"
                alt="검색아이콘"
                className="w-6 h-6"
              />
              검색어를 입력하세요.
            </div>
            <div className="text-subhead1-sb text-gray-400">검색 결과 16건</div>
          </div>
          <div className="h-[126px] bg-white border-b border-gray-100 pl-7 py-5 flex items-center gap-3 self-stretch">
            <img src="" alt="약국사진" className="w-[86px] h-[86px] bg-gray-200 mr-3"/>
            <div className="flex w-[145px] flex-col items-start">
              <div className="flex mb-3">
                <div className="text-subhead1-sb text-gray-600 text-[16px]">다아나약국</div>
                <div className="flex py-0 px-1 justify-center items-center gap-[10px] rounded-[4px] bg-green-300 text-white ml-[3px] text-[12px]">영업중</div>
              </div>
              <div className="self-stretch text-gray-400 text-[14px]">18:00에 영업 종료</div>
              <div className="w-[150px] flex items-center gap-[6px] self-stretch text-[14px]">
                <div className="text-gray-500">500m</div>
                <div className="text-gray-200">*</div>
                <div className="text-gray-400">서울 중구 중앙동</div>
              </div>
            </div>
            <div className="bg-red-100 w-[30px] h-[52px] ml-[1.6px]">
              <div className="w-[30px] h-[30px] shrink-0 rounded-full border-gray-400 mb-1 bg-gray-400 mr-7">
                
              </div>
              <div className="text-gray-400 text-[12px] text-center">경로</div>
            </div>
          </div>
          <div className="h-[126px] bg-white border-b border-gray-100"></div>
          <div className="h-[126px] bg-white border-b border-gray-100"></div>
          <div className="h-[126px] bg-white border-b border-gray-100"></div>
          <div className="h-[126px] bg-white border-b border-gray-100"></div>
          <div className="h-[126px] bg-white border-b border-gray-100"></div>
        </div>
        <button className="w-6 h-[46px] bg-white mt-[566px] mb-[426px] text-gray-300">&lt;</button>
      
      </div>
    </>
  );
}
