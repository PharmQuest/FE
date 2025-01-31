import Search from "@/components/common/Search";
import FilterButton from "@/components/common/FilterButton";
import { GTIcon, WhiteGTIcon, AD, ADIphone } from "@public/svgs";
import { MedicineImage } from "@public/images";
import Image from "next/image";
import Link from "next/link";

const community = [
  {
    category: "자유",
    value: "배 아플 때 이거 먹어도 되나요?",
    isBest: true,
    calendar: "2024-12-25",
  },
  {
    category: "영양제",
    value: "영양제 추천 리스트입니다 ~",
    isBest: false,
    calendar: "2024-12-25",
  },
  {
    category: "약국",
    value:
      "약국 약사님이 엄청 친절하시더라구요. 텍스트 여기까지만 나오게 설정해주세요.",
    isBest: false,
    calendar: "2024-12-25",
  },
  {
    category: "병원",
    value: "***역 인근 병원 좀 추천해주세요!!!",
    isBest: false,
    calendar: "2024-12-25",
  },
  {
    category: "증상",
    value: "목 아플 때 @@약 드셔보신 분 계신가요?",
    isBest: false,
    calendar: "2024-12-25",
  },
];

export default function Home() {
  return (
    <>
      <div className="bg-background pb-6 flex justify-center">
        {/* 1000px 이상일 때 */}
        <div className="// 기본 스타일
                        hidden lg:flex lg:flex-col
                        // 1000px 초과 (xl)
                        xl:w-[900px] xl:mx-auto
                        // 1000px (lg)
                        lg:w-[900px] lg:mx-[50px]">
          <div className="flex gap-5 justify-center items-center text-white mb-[-40px] pl-7">
            <Link
              href="medicines"
              className="shrink-0 w-[293px] h-[171px] pl-5 py-6 bg-primary-500 rounded-xl flex-col justify-start items-start gap-[45px] inline-flex"
            >
              <p className="justify-start items-center gap-2 inline-flex text-headline-b">
                상비약 리스트 <WhiteGTIcon />
              </p>
              <p className="text-left text-body1-r">
                증상 및 약 이름을 검색하고
                <br />
                필요한 상비약 정보를 얻을 수 있어요.
              </p>
            </Link>
            <Link
              href="map"
              className="shrink-0 w-[293px] h-[171px] pl-5 py-6 bg-secondary-500 rounded-xl flex-col justify-start items-start gap-[45px] inline-flex"
            >
              <p className="justify-start items-center gap-2 inline-flex text-headline-b">
                약국 찾기 <WhiteGTIcon />
              </p>
              <p className="text-left text-body1-r">
                근처에 있는 약국을 검색하고
                <br />길 찾기 서비스를 받을 수 있어요.
              </p>
            </Link>
            <Image
              src={MedicineImage}
              alt="medicine image"
              width={351}
              height={348}
              quality={90}
              className="-ml-12"
            />
          </div>
          <Search />
          <div className="flex lg:gap-3 gap-2 mt-4">
            <FilterButton text="진통/해열" isHomeButton={true} />
            <FilterButton text="소화/위장" isHomeButton={true} />
            <FilterButton text="감기/기침" isHomeButton={true} />
            <FilterButton text="알레르기" isHomeButton={true} />
            <FilterButton text="상처/소독" isHomeButton={true} />
            <FilterButton text="멀미" isHomeButton={true} />
            <FilterButton text="안약" isHomeButton={true} />
            <FilterButton text="기타" isHomeButton={true} />
          </div>
          <p className="pt-12 text-center text-gray-300 text-body2-r">
            본 웹 사이트는 사용자의 편의를 위한 단순 참고용 정보 제공을 목표로
            하며, 해당 정보는 의료 전문가의 조언을 대체 하지 않습니다.
          </p>
        </div>

        {/* 1000px 미만일 때 */}
        <div className="// 모바일 (641px 미만)
                        w-[calc(100%-40px)]
                        mx-auto
                        lg:hidden
                        // 태블릿 (642px-999px)
                        md:w-[601px]">
          <div className="text-center text-gray-300 text-[10px] font-normal font-['Pretendard Variable'] leading-[21px]">
            본 웹 사이트는 사용자의 편의를 위한 단순 참고용 정보 제공을 목표로
            하며, <br />
            해당 정보는 의료 전문가의 조언을 대체 하지 않습니다.
          </div>
          <div className="flex gap-4 mt-5 w-full whitespace-nowrap">
            <Link
              href="medicines"
              className="flex-1 h-[114px] px-4 py-5 bg-primary-500 rounded-[5.06px] flex-col justify-start items-center gap-[2.5px] inline-flex text-white font-['Pretendard Variable']"
            >
              <p className="flex justify-center items-center gap-4 font-bold text-base leading-normal">
                상비약 리스트 <WhiteGTIcon />
              </p>
              <p className="mt-4 self-stretch text-center font-normal leading-[15px] text-[10px]">
                증상 및 약 이름을 검색하고 필요한
                <br />
                상비약 정보를 얻을 수 있어요.
              </p>
            </Link>
            <Link
              href="map"
              className="flex-1 mb-6 h-[114px] px-4 py-5 bg-secondary-500 rounded-[5.06px] flex-col justify-start items-center gap-[2.5px] inline-flex text-white font-['Pretendard Variable']"
            >
              <p className="flex justify-center items-center gap-4 font-bold text-base leading-normal">
                약국 찾기 <WhiteGTIcon />
              </p>
              <p className="mt-4 self-stretch text-center font-normal leading-[15px] text-[10px]">
                근처에 있는 약국을 검색하고
                <br />길 찾기 서비스를 받을 수 있어요.
              </p>
            </Link>
          </div>
          <Search />
          <div className="flex gap-3 mt-3 overflow-x-auto scrollbar-hide">
            <FilterButton text="진통/해열" isHomeButton={true} />
            <FilterButton text="소화/위장" isHomeButton={true} />
            <FilterButton text="감기/기침" isHomeButton={true} />
            <FilterButton text="알레르기" isHomeButton={true} />
            <FilterButton text="상처/소독" isHomeButton={true} />
            <FilterButton text="멀미" isHomeButton={true} />
            <FilterButton text="안약" isHomeButton={true} />
            <FilterButton text="기타" isHomeButton={true} />
          </div>
        </div>
      </div>
      {/* 흰 배경 */}
      <div className="bg-white flex justify-center mb-[48px]">
        <div className={`// 641px 미만
                        w-[calc(100%-40px)]
                        mx-auto
                        // 1001px 이상
                        xl:w-[900px] xl:mx-auto
                        // 1000px
                        lg:w-[900px] lg:mx-[50px]
                        // 642~1000px 미만
                        md:w-[601px] md:mx-auto`}>
          <div className="lg:h-[366px] h-fit flex grow flex-col">
            <Link
              href="community"
              className="mt-10 h-[42px] justify-start items-center gap-3 inline-flex text-gray-600 text-display1-b  "
            >
              커뮤니티 <GTIcon />
            </Link>
            <div className="flex                   
                            // 1000px 이상
                            lg:flex-row lg:gap-5
                            // 1000px 이하
                            flex-col">
              {/* 커뮤니티 코드를 반복문으로 변경 */}
              <div className="lg:flex-1 max-w-[593px] lg:mt-1 lg:mb-4 h-[174px] flex-col justify-start items-start flex">
                {community.map((item, index) => (
                  <div
                    key={index}
                    className="self-stretch lg:py-2 py-1 justify-between items-start inline-flex"
                  >
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
                    <div className="flex items-center h-full text-center text-[#999999] lg:text-sm text-xs font-normal font-['Pretendard Variable'] leading-[21px] lg:ml-4 ml-8 shrink-0">
                      {item.calendar}
                    </div>
                  </div>
                ))}
              </div>
              {/* 광고 */}
              <div className="mt-6 w-full lg:mt-2 lg:w-[287px]">
                {/* 1000px 이상일 때는 AD(287*215) */}
                <AD className="hidden lg:flex lg:w-[287px] lg:h-[215px]" />
                {/* 1000px 미만일 때는 ADIphone */}
                <div className="lg:hidden relative overflow-hidden
                                md:max-w-[601px] md:w-full md:h-[240px]
                                sm:w-full sm:h-[240px]
                                w-full h-[240px]">
                                {/* 텍스트가 광고 위에 오도록 */}
                                <div className="text-white absolute left-[30px] bottom-[30px] z-10 inline-flex flex-col items-start gap-[8px] font-['Pretendard Variable'] font-bold text-[25px] leading-[30px]">
                                  <div>건강관리는 지금부터</div>
                                  <div>BOOST YOUR HEALTH</div>
                                </div>
                                <ADIphone className="absolute right-0 h-full
                                                    // SVG 최소 너비 설정
                                                    min-w-[353px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
