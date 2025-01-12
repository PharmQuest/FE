import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer';
import Search from '@/components/common/Search';
import FilterButton from '@/components/common/FilterButton';

export default function Home() {
  return (
    <>
      <div className='w-[1440px] h-[640px] bg-[#d1e6e7]'>
        <Header/>
        <button className=" w-[293px] h-[171px] pl-5 py-6 bg-[#138e5d] rounded-xl flex-col justify-start items-start gap-[45px] inline-flex mt-[128px] ml-[260px] text-white font-['Pretendard Variable']">
            <div className="justify-start items-center gap-2 inline-flex text-xl font-bold leading-[30px]">상비약 리스트 &gt;</div>
            <div className="text-left text-base font-normal leading-normal">증상 및 약 이름을 검색하고<br/>필요한 상비약 정보를 얻을 수 있어요.</div>
        </button>
        <button className="ml-5 mb-10 w-[293px] h-[171px] pl-5 py-6 bg-[#006367] rounded-xl flex-col justify-start items-start gap-[45px] inline-flex mt-[128px] text-white font-['Pretendard Variable']">
            <div className="justify-start items-center gap-2 inline-flex text-xl font-bold leading-[30px]">약국 찾기 &gt;</div>
            <div className="text-left text-base font-normal leading-normal">근처에 있는 약국을 검색하고<br/>길 찾기 서비스를 받을 수 있어요.</div>
        </button>
        <Search/>
        {/* 내가 만든 검색 버튼 */}
        {/* <div className="w-[797px] h-[54px] pl-6 py-3 bg-white rounded-full justify-start items-center gap-3 inline-flex mt-10 ml-[260px]">
          <img
            src="/svgs/search.svg"
            alt="검색아이콘"
            className="w-6 h-6"
          />
          <div className="w-[30px] h-[30px] relative  overflow-hidden">
              <div className="w-[22.50px] h-[22.50px] left-[3.75px] top-[3.75px] absolute">
              </div>
          </div>
          <input placeholder="복통약" className="text-[#999999] text-xl font-medium font-['Pretendard Variable'] leading-[30px]"></input>
        </div> */}
            <div className='flex gap-3 ml-[260px] mt-4'>
            <FilterButton text='진통/해열'/>
            <FilterButton text='소화/위장'/>
            <FilterButton text='감기/기침'/>
            <FilterButton text='알레르기'/>
            <FilterButton text='상처/소독'/>
            <FilterButton text='멀미'/>
            <FilterButton text='안약'/>
            <FilterButton text='기타'/>
            </div>
            <div className="text-center text-[#999999] text-sm font-normal font-['Pretendard Variable'] leading-[21px] mt-12 ml-[356px]">본 웹 사이트는 사용자의 편의를 위한 단순 참고용 정보 제공을 목표로 하며, 제공되는 정보는 의료 전문가의 조언을 대체 하지 않습니다.</div>
        </div>
        <div className='h-[366px] bg-white flex flex-col'>
          <button className="mt-10 ml-[260px] h-[42px] justify-start items-center gap-3 inline-flex text-[#333333] text-[28px] font-bold font-['Pretendard Variable'] leading-[42px]">커뮤니티 &gt;</button>
          <div className='flex'>
            <div className="mt-4 ml-[260px] w-[606px] h-[220px] flex-col justify-start items-start inline-flex">
                <div className="self-stretch py-2.5 justify-between items-center inline-flex">
                    <div className="justify-center items-center gap-2 flex">
                        <div className="h-6 px-1.5 pt-0.5 pb-px bg-[#cccccc] rounded justify-center items-center gap-2.5 flex">
                            <div className="text-center text-white text-sm font-normal font-['Pretendard Variable'] leading-[21px]">자유주제</div>
                        </div>
                        <div className="text-center text-[#474747] text-base font-normal font-['Pretendard Variable'] leading-normal">배 아플 때 이거 먹어도 되나요?</div>
                        <div className="px-1.5 py-0.5 rounded-full border-2 border-[#ff7700] justify-center items-center gap-2.5 flex">
                            <div className="text-center text-[#ff7700] text-xs font-semibold font-['Pretendard Variable'] leading-[18px]">BEST</div>
                        </div>
                    </div>
                    <div className="text-center text-[#999999] text-sm font-normal font-['Pretendard Variable'] leading-[21px]">2024.12.25.</div>
                </div>
                <div className="self-stretch py-2.5 justify-between items-start inline-flex">
                    <div className="justify-center items-center gap-2 flex">
                        <div className="h-6 px-1.5 pt-0.5 pb-px bg-[#cccccc] rounded justify-center items-center gap-2.5 flex">
                            <div className="text-center text-white text-sm font-normal font-['Pretendard Variable'] leading-[21px]">영양제</div>
                        </div>
                        <div className="text-center text-[#474747] text-base font-normal font-['Pretendard Variable'] leading-normal">영양제 추천 리스트입니다 ~</div>
                    </div>
                    <div className="text-center text-[#999999] text-sm font-normal font-['Pretendard Variable'] leading-[21px]">2024.12.25.</div>
                </div>
                <div className="self-stretch py-2.5 justify-between items-start inline-flex">
                    <div className="justify-center items-center gap-2 flex">
                        <div className="h-6 px-1.5 pt-0.5 pb-px bg-[#cccccc] rounded justify-center items-center gap-2.5 flex">
                            <div className="text-center text-white text-sm font-normal font-['Pretendard Variable'] leading-[21px]">약국</div>
                        </div>
                        <div className="text-center text-[#474747] text-base font-normal font-['Pretendard Variable'] leading-normal">약국 약사님이 엄청 친절하시더라구요. 여기까지만 나오게...</div>
                    </div>
                    <div className="text-center text-[#999999] text-sm font-normal font-['Pretendard Variable'] leading-[21px]">2024.12.25.</div>
                </div>
                <div className="self-stretch py-2.5 justify-between items-start inline-flex">
                    <div className="justify-center items-center gap-2 flex">
                        <div className="h-6 px-1.5 pt-0.5 pb-px bg-[#cccccc] rounded justify-center items-center gap-2.5 flex">
                            <div className="text-center text-white text-sm font-normal font-['Pretendard Variable'] leading-[21px]">병원</div>
                        </div>
                        <div className="text-center text-[#474747] text-base font-normal font-['Pretendard Variable'] leading-normal">***역 인근 병원 좀 추천해주세요!!!</div>
                    </div>
                    <div className="text-center text-[#999999] text-sm font-normal font-['Pretendard Variable'] leading-[21px]">2024.12.25.</div>
                </div>
                <div className="self-stretch py-2.5 justify-between items-start inline-flex">
                    <div className="justify-center items-center gap-2 flex">
                        <div className="h-6 px-1.5 pt-0.5 pb-px bg-[#cccccc] rounded justify-center items-center gap-2.5 flex">
                            <div className="text-center text-white text-sm font-normal font-['Pretendard Variable'] leading-[21px]">증상</div>
                        </div>
                        <div className="text-center text-[#474747] text-base font-normal font-['Pretendard Variable'] leading-normal">목 아플 때 @@약 드셔보신 분 계신가요?</div>
                    </div>
                    <div className="text-center text-[#999999] text-sm font-normal font-['Pretendard Variable'] leading-[21px]">2024.12.25.</div>
                </div>
            </div>
            {/* 광고 */}
            <div className=" text-white ml-[21px] mt-4 w-[293px] h-[215px] bg-gradient-to-b from-black to-black">
                {/* 광고 넘기기 버튼 */}
                <div className='flex justify-center items-center ml-[192.57px] mt-[183px] gap-[9px]'>
                    <button className="w-[12.90px] h-3.5 bg-[#f2f2f2] rounded-full text-gray-300 flex justify-center items-center">&lt;</button>
                    <div className="w-[5.53px] h-1.5 bg-[#f2f2f2] rounded-full"></div>
                    <div className="w-[5.53px] h-1.5 bg-[#f2f2f2] rounded-full"></div>
                    <div className="w-[5.53px] h-1.5 bg-[#f2f2f2] rounded-full"></div>
                    <button className="w-[12.90px] h-3.5 bg-[#f2f2f2] rounded-full text-gray-300 flex justify-center items-center">&gt;</button>
                </div>
            </div>
          </div>
        </div>
        <Footer/>
    </>
  );
}