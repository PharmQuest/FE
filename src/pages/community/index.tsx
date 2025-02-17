// 커뮤니티_메인화면
import FilterButton from "@/components/common/FilterButton";
import PopularPostList from "./components/PopularPostList";
import UserNavbar from "./components/UserNavbar";
import PostList from "./components/PostList";
import { useState } from "react";
import { ArrowRightIcon, PlusIcon } from "@public/svgs";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import CommunityModal from "./components/CommunityModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Category {
  value: string;
  text: string;
  isSelected: boolean;
}

export default function Community() {

  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([
    { value: "ALL", text: "전체", isSelected: true },
    { value: "FORUM", text: "자유", isSelected: false },
    { value: "PHARMACY", text: "약국", isSelected: false },
    { value: "HOSPITAL", text: "병원", isSelected: false },
    { value: "MEDICATION", text: "약", isSelected: false },
    { value: "SYMPTOM", text: "증상", isSelected: false },
    { value: "SUPPLEMENT", text: "영양제", isSelected: false },
  ]);

  const [category, setCategory] = useState("ALL");

  const handleFilterButton = (category: Category) => {
    setCategory(category.value)
    setCategories((prev) =>
      prev.map(item =>
        item.value === category.value
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    )
  }

  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const handleMobileModal = (e:MouseEvent) => {
    e.stopPropagation();
    setIsMobileModalOpen(!isMobileModalOpen);
 
  }

  const getRandomBestPost = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/community/best-posts/random`);
    return response.data;
  }

  const { data, isPending } = useQuery(
    {
      queryKey: ["bestPost"],
      queryFn: getRandomBestPost,
      placeholderData: keepPreviousData,
    },
  )

  return (
    <div>
      <div
        className="
          lg:max-w-[900px] lg:mx-auto lg:px-0
          md:max-w-[600px] md:mx-auto md:px-0 md:mt-9
          w-screen px-5">
        <div
          className="
            lg:w-full lg:flex lg:flex-row lg:gap-x-4
            mt-3 grow w-full">
          <div className={`flex flex-col grow w-full`}>
            <div className={`flex justify-between mb-3`}>
              <p
                className="
                  lg:text-display2-b
                  flex text-m-headline1-b text-gray-600 items-center gap-2">
                BEST 인기글
                <ArrowRightIcon
                  className={`
                    lg:hidden
                    content-center mb-0.5 h-3`}
                  onClick={() => router.push('/community/bestposts')} />
              </p>
              <p
                className={`
                  lg:flex
                  hidden text-gray-400 text-subhead1-sb items-center gap-2 cursor-pointer mr-2`}
                onClick={() => router.push('/community/bestposts')}>
                더보기
                <ArrowRightIcon className={`content-center mb-0.5 h-2.5`} />
              </p>
            </div>
            <PopularPostList posts={data?.result?.postList} bgColor={"primary-50"} gap={true} isPending={isPending} listNum={3}/>
          </div>
          <div className={`lg:block hidden`}>
            <p className={`h-9 mb-3`} />
            <UserNavbar />
          </div>
        </div>
        <div className="lg:mt-20 lg:mb-4 flex flex-row items-center gap-3 mt-9">
          <p
            className="
              lg:text-display2-b 
              flex text-m-headline1-b text-gray-600 items-center gap-2">
            게시글
            <ArrowRightIcon
              className={`
                lg:hidden
                content-center mb-0.5 h-3`}
              onClick={() => router.push('/community/posts')} />
          </p>

          <div
            className={`
              lg:flex 
              gap-2 hidden`}>
            {categories.map((category) => (
              <FilterButton
                key={category.text}
                text={category.text}
                isSelected={category.isSelected}
                onClickFn={() => handleFilterButton(category)} />
            ))}
          </div>
          <p
            className={`
              lg:flex
              hidden text-gray-400 text-subhead1-sb items-center gap-2 cursor-pointer mr-4 ml-auto mt-3`}
            onClick={() => router.push('/community/posts')}>
            더보기
            <ArrowRightIcon className={`content-center mb-0.5 h-2.5`} />
          </p>
        </div>
        <div>
          <PostList page={1} category={category} isPageHidden={true} postLimit={10} />
        </div>
      </div>
      <CommunityModal isMobileModalOpen={isMobileModalOpen} setIsMobileModalOpen={setIsMobileModalOpen}/>
      <div 
        className={`lg:hidden z-[999] fixed right-5 bottom-5 w-[52px] h-[52px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-full transition-all duration-300 ease-out ${isMobileModalOpen ? `bg-white` : `bg-primary-500`}`}
        onClick={(e) => handleMobileModal(e)}>
        <PlusIcon className={`transition-all duration-300 ease-out ${isMobileModalOpen ? `text-primary-500` : `text-white`}`}/>
      </div>
    </div>
  );
}
