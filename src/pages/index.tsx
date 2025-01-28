import Search from '@/components/common/Search';
import FilterButton from '@/components/common/FilterButton';
import {GTIcon, WhiteGTIcon} from "@public/svgs"

const community = [
    { category: "자유", value: "배 아플 때 이거 먹어도 되나요?", isBest: true, calendar: "2024-12-25" },
    { category: "영양제", value: "영양제 추천 리스트입니다 ~", isBest: false, calendar: "2024-12-25" },
    { category: "약국", value: "약국 약사님이 엄청 친절하시더라구요. 텍스트 여기까지만 나오게 설정해주세요.", isBest: false, calendar: "2024-12-25" },
    { category: "병원", value: "***역 인근 병원 좀 추천해주세요!!!", isBest: false, calendar: "2024-12-25" },
    { category: "증상", value: "목 아플 때 @@약 드셔보신 분 계신가요?", isBest: false, calendar: "2024-12-25" },
];

export default function Home() {
  return (
    <>
        <div className='bg-[#d1e6e7] lg:pb-[36px] pb-6 flex justify-center'>
            {/* 1000px 이상일 때*/}
            <div className="hidden lg:flex lg:flex-col //grow
                            // 1001 ~ 1440px
                            xl:w-[900px]
                            // 1000일 때
                            lg:w-[900px] lg:px-[50px]">
                <div className='flex gap-5 mt-[160px]'>
                    <button className=" w-[293px] h-[171px] pl-5 py-6 bg-[#138e5d] rounded-xl flex-col justify-start items-start gap-[45px] inline-flex text-white font-['Pretendard Variable']">
                        <div className="justify-start items-center gap-2 inline-flex text-xl font-bold leading-[30px]">상비약 리스트 <WhiteGTIcon/></div>
                        <div className="text-left text-base font-normal leading-normal">증상 및 약 이름을 검색하고<br/>필요한 상비약 정보를 얻을 수 있어요.</div>
                    </button>
                    <button className="mb-10 w-[293px] h-[171px] pl-5 py-6 bg-[#006367] rounded-xl flex-col justify-start items-start gap-[45px] inline-flex text-white font-['Pretendard Variable']">
                        <div className="justify-start items-center gap-2 inline-flex text-xl font-bold leading-[30px]">약국 찾기 <WhiteGTIcon/></div>
                        <div className="text-left text-base font-normal leading-normal">근처에 있는 약국을 검색하고<br/>길 찾기 서비스를 받을 수 있어요.</div>
                    </button>
                </div>
                <Search/>
                <div className='flex lg:gap-3 gap-2 mt-4'>
                    <FilterButton text='진통/해열' isHomeButton={true}/>
                    <FilterButton text='소화/위장' isHomeButton={true}/>
                    <FilterButton text='감기/기침' isHomeButton={true}/>
                    <FilterButton text='알레르기' isHomeButton={true}/>
                    <FilterButton text='상처/소독' isHomeButton={true}/>
                    <FilterButton text='멀미' isHomeButton={true}/>
                    <FilterButton text='안약' isHomeButton={true}/>
                    <FilterButton text='기타' isHomeButton={true}/>
                </div>
                <div className="mt-[36px] text-center text-[#999999] text-sm font-normal font-['Pretendard Variable'] leading-[21px]">본 웹 사이트는 사용자의 편의를 위한 단순 참고용 정보 제공을 목표로 하며, 해당 정보는 의료 전문가의 조언을 대체 하지 않습니다.</div>
            </div>
            {/* 1000px 미만일 때 */}
            <div className='lg:hidden
                            // 태블릿 (642px-999px)
                            md:w-[601px]
                            // 모바일 (641px 미만)
                            w-full px-5'>
                <div className="text-center text-[#999999] text-[10px] font-normal font-['Pretendard Variable'] leading-[21px]">본 웹 사이트는 사용자의 편의를 위한 단순 참고용 정보 제공을 목표로 하며, <br/>해당 정보는 의료 전문가의 조언을 대체 하지 않습니다.</div>
                <div className='flex gap-4 mt-5 w-full whitespace-nowrap'>
                    <button className="flex-1 h-[114px] px-4 py-5 bg-[#138e5d] rounded-[5.06px] flex-col justify-start items-center gap-[2.5px] inline-flex text-white font-['Pretendard Variable']">
                        <div className="flex justify-center items-center gap-4 font-bold text-base leading-normal">상비약 리스트 <WhiteGTIcon/></div>
                        <div className="mt-4 self-stretch text-center font-normal leading-[15px] text-[10px]">증상 및 약 이름을 검색하고 필요한<br/>상비약 정보를 얻을 수 있어요.</div>
                    </button>
                    <button className="flex-1 mb-6 h-[114px] px-4 py-5 bg-[#006367] rounded-[5.06px] flex-col justify-start items-center gap-[2.5px] inline-flex text-white font-['Pretendard Variable']">
                        <div className="flex justify-center items-center gap-4 font-bold text-base leading-normal">약국 찾기 <WhiteGTIcon/></div>
                        <div className="mt-4 self-stretch text-center font-normal leading-[15px] text-[10px]">근처에 있는 약국을 검색하고<br/>길 찾기 서비스를 받을 수 있어요.</div>
                    </button>
                </div>
                <Search/>
                <div className='flex gap-3 mt-3 overflow-x-auto scrollbar-hide'>
                    <FilterButton text='진통/해열' isHomeButton={true}/>
                    <FilterButton text='소화/위장' isHomeButton={true}/>
                    <FilterButton text='감기/기침' isHomeButton={true}/>
                    <FilterButton text='알레르기' isHomeButton={true}/>
                    <FilterButton text='상처/소독' isHomeButton={true}/>
                    <FilterButton text='멀미' isHomeButton={true}/>
                    <FilterButton text='안약' isHomeButton={true}/>
                    <FilterButton text='기타' isHomeButton={true}/>
                </div>
            </div>
        </div>
        {/* 흰 배경 */}
        <div className='bg-white flex justify-center'>
            <div className={`
                // 1001px 이상
                xl:w-[900px]
                // 1000px
                lg:w-[900px] lg:px-[50px]
                // 642~1000px 미만
                md:w-[601px]
                // 641px 미만
                w-full px-5
            `}>
                <div className='lg:h-[366px] h-fit flex grow flex-col'>
                    <button className="mt-[36px] h-[42px] justify-start items-center gap-3 inline-flex text-[#333333] lg:text-[28px] text-xl font-bold font-['Pretendard Variable'] leading-[42px]">커뮤니티 <GTIcon/></button>
                    <div className='flex                   
                                    // 1000px 이상
                                    lg:flex-row lg:justify-between
                                    // 1000px 이하
                                    flex-col'>
                        {/* 커뮤니티 코드를 반복문으로 변경 */}
                        <div className="lg:w-[483px] w-full lg:mt-4 lg:mb-4 mr-4 h-[145px] flex-col justify-start items-start flex">
                            {community.map((item, index) => (
                                <div key={index} className="self-stretch lg:py-2 justify-between items-start inline-flex">
                                    <div className="h-[29px] flex-1 justify-start items-center gap-2 flex min-w-0">
                                        <div className="lg:w-16 w-[47px] lg:h-6 h-5 px-1.5 pt-0.5 pb-px bg-[#a0d1be] rounded justify-center items-center gap-2.5 flex shrink-0">
                                            <div className="text-center text-white lg:text-sm text-[10px] font-normal font-['Pretendard Variable'] leading-[21px]">
                                                {item.category}
                                            </div>
                                        </div>
                                        <div className="text-left overflow-hidden text-ellipsis whitespace-nowrap text-[#474747] lg:text-base text-sm font-normal font-['Pretendard Variable'] leading-normal min-w-0">
                                            {item.value}
                                        </div>
                                        {item.isBest && (
                                            <div className="h-[20px] px-1.5 py-0.5 rounded-full border-2 border-[#ff7700] justify-center items-center gap-2.5 flex">
                                                <div className="text-center text-[#ff7700] lg:text-xs text-[10px] font-semibold font-['Pretendard Variable'] leading-[18px]">
                                                    BEST
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-center text-[#999999] lg:text-sm text-xs font-normal font-['Pretendard Variable'] leading-[21px] lg:ml-4 ml-8 shrink-0">
                                        {item.calendar}
                                    </div>
                                </div>
                            ))}
                        </div>                        
                        {/* 광고 */}
                        <div className="w-full flex justify-center lg:justify-end lg:w-[287px]">
                            <div className="relative
                                            // 1000px 이상 (lg)
                                            lg:w-[287px] lg:h-[215px]
                                            // 641px-999px (md)
                                            md:max-w-[601px] md:w-full md:h-[240px]
                                            // 393px-640px (sm)
                                            sm:w-full sm:h-[238px]
                                            // 393px 미만
                                            w-full max-w-[601px] h-[238px]
                                            text-white mt-4 bg-gradient-to-b from-black to-black">
                                {/* 광고 넘기기 버튼 */}
                                <div className='absolute right-[20px] bottom-[18px] flex justify-center items-center gap-[9px]'>
                                    <button className="w-[12.90px] h-3.5 bg-[#f2f2f2] rounded-full text-gray-300 flex justify-center items-center">&lt;</button>
                                    <div className="w-[5.53px] h-1.5 bg-[#f2f2f2] rounded-full"></div>
                                    <div className="w-[5.53px] h-1.5 bg-[#f2f2f2] rounded-full"></div>
                                    <div className="w-[5.53px] h-1.5 bg-[#f2f2f2] rounded-full"></div>
                                    <button className="w-[12.90px] h-3.5 bg-[#f2f2f2] rounded-full text-gray-300 flex justify-center items-center">&gt;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </>
  );
}