import Search from "@/components/common/Search";
import { GTIcon, WhiteGTIcon } from "@public/svgs";
import { MedicineImage, ADWeb, ADMobile } from "@public/images";
import Image from "next/image";
import Link from "next/link";
import FilterButtonList from "@/components/common/FilterButtonList";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/apis/axios-instance";
import HomePostItem from "@/components/home/HomePostItem";
import { HOME_FILTER_LIST } from "@/constants/FilterList";

interface HomePostItemProp {
  title: string;
  category: string;
  post_id: number;
  created_at: string;
  isBestPost?: boolean;
};  

export default function Home() {


  const getHomePost = async () => {
    try {
      const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DOMAIN}/home/posts`);
      return response.data;
    } catch (e) {
      console.log(e)
    }
  }

  const { data } = useQuery({
    queryKey: ["homePost"],
    queryFn: getHomePost,
  })

  const hotPost = data?.result?.hotPost;
  const newPosts = data?.result?.newPosts;

  return (
    <>
      <div className="bg-background pb-6 flex justify-center">
        {/* 1000px 이상일 때 */}
        <div className="// 기본 스타일
                        hidden lg:flex lg:flex-col
                        // 1000px 초과 (xl)
                        xl:w-[900px] xl:mx-auto
                        // 1000px (lg)
                        lg:w-[900px] lg:mx-[50px]"
        >
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
          <FilterButtonList filterList={HOME_FILTER_LIST} className="mt-4 lg:gap-3 gap-2"/>
          <p className="pt-12 text-center text-gray-300 text-body2-r">
            본 웹 사이트는 사용자의 편의를 위한 단순 참고용 정보 제공을 목표로
            하며, 해당 정보는 의료 전문가의 조언을 대체 하지 않습니다.
          </p>
        </div>

        {/* 1000px 미만일 때 */}
        <div
          className="// 모바일 (641px 미만)
                        w-[calc(100%-40px)]
                        mx-auto
                        lg:hidden
                        // 태블릿 (642px-999px)
                        md:w-[601px]"
        >
          <div className="text-center text-gray-300 text-[10px] font-normal font-['Pretendard Variable'] leading-[15px]">
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
          <FilterButtonList filterList={HOME_FILTER_LIST} className={`mt-3`}/>
        </div>
      </div>
      {/* 흰 배경 */}
      <div className="bg-white flex justify-center mb-[48px]">
        <div
          className={`// 641px 미만
                        w-[calc(100%-40px)]
                        mx-auto
                        // 1001px 이상
                        xl:w-[900px] xl:mx-auto
                        // 1000px
                        lg:w-[900px] lg:mx-[50px]
                        // 642~1000px 미만
                        md:w-[601px] md:mx-auto`}
        >
          <div className="lg:h-[366px] h-fit flex grow flex-col">
            <Link
              href="community"
              className="lg:text-display1-b text-m-display1-b mt-10 h-[42px] justify-start items-center gap-3 inline-flex text-gray-600  "
            >
              커뮤니티 <GTIcon />
            </Link>
            <div
              className="flex                   
                            // 1000px 이상
                            lg:flex-row lg:gap-5
                            // 1000px 이하
                            flex-col"
            >
              {/* 커뮤니티 코드를 반복문으로 변경 */}
              <div className="lg:flex-1 max-w-[593px] lg:mt-3 lg:mb-4 h-[174px] flex-col justify-start items-start flex">
                <HomePostItem title={hotPost?.title} category={hotPost?.category} post_id={hotPost?.post_id} created_at={hotPost?.created_at} isBestPost={true}/>
                {newPosts?.map((newPost: HomePostItemProp) => (
                  <HomePostItem key={newPost.post_id} title={newPost?.title} category={newPost?.category} post_id={newPost?.post_id} created_at={newPost?.created_at} isBestPost={false}/>
                ))}

              </div>
              {/* 광고 */}
              <div className="mt-6 w-full lg:mt-2 lg:w-[287px]">
                {/* 1000px 이상일 때는 ADWeb */}
                <Image
                  src={ADWeb}
                  alt="Advertisement"
                  className="hidden lg:flex lg:w-[287px] lg:h-[215px]"
                />
                {/* 1000px 미만일 때는 ADMobile */}
                <div
                  className="lg:hidden relative overflow-hidden
                                md:max-w-[601px] md:w-full md:h-[240px]
                                sm:w-full sm:h-[240px]
                                w-full h-[240px]"
                >
                  {/* 텍스트가 광고 위에 오도록 */}
                  <div className="text-white absolute left-[30px] bottom-[30px] z-10 inline-flex flex-col items-start gap-[8px] font-['Pretendard Variable'] font-bold text-[25px] leading-[30px]">
                    <div>건강관리는 지금부터</div>
                    <div>BOOST YOUR HEALTH</div>
                  </div>
                  <Image
                    src={ADMobile}
                    alt="Mobile Advertisement"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="right"
                    className="absolute right-0 h-full min-w-[353px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}