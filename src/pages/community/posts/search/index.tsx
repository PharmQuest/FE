// 커뮤니티_ 게시글

import UserNavbar from "../../components/UserNavbar";
import { useEffect, useState } from "react";
import PostList from "../../components/PostList";
import FilterButton from "@/components/common/FilterButton";
import { useRouter } from "next/router";
import useScroll from "../../../../hooks/community/useScroll";
import { ArrowRightIcon } from "@public/svgs";

interface Category {
  value: string;
  text: string;
  isSelected: boolean;
}

export default function SearchPosts() {

  const router = useRouter();

  const { position, maxScroll } = useScroll();

  const [postsCount, setPostsCount] = useState<number | null>(null);

  const [page, setPage] = useState<number>(1)
  const [categories, setCategories] = useState<Category[]>([
    { value: "ALL", text: "전체", isSelected: false },
    { value: "FORUM", text: "자유", isSelected: false },
    { value: "PHARMACY", text: "약국", isSelected: false },
    { value: "HOSPITAL", text: "병원", isSelected: false },
    { value: "MEDICATION", text: "약", isSelected: false },
    { value: "SYMPTOM", text: "증상", isSelected: false },
    { value: "SUPPLEMENT", text: "영양제", isSelected: false },
  ]);

  const [categoryValue, setCategoryValue] = useState(router.query.category as string || "ALL");

  useEffect(() => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        isSelected: category.value === categoryValue,
      }))
    );
  }, [categoryValue]);

  const handleFilterButton = (category: Category) => {
    setCategoryValue(category.value)
    setPage(1)
  }

  useEffect(() => {
    setCategoryValue(router.query.category as string || "ALL")
  }, [router.query.category])

  return (
    <div
      className="
        lg:max-w-[900px] lg:mx-auto lg:px-0
        md:max-w-[600px] md:mx-auto md:px-0 lg:mt-9
        w-screen px-5">
      <div className="max-w-[900px] mx-auto min-h-[460px]">
        <div className="flex flex-row gap-x-4 mt-3 ">
          <div className={`flex flex-col grow max-w-full`}>
            <div className="lg:mb-4 flex flex-row items-center gap-3">
              <p className="
                lg:text-display2-b 
                text-m-headline1-b text-gray-600">검색결과 {postsCount}건</p>
              {postsCount !== 0 &&
                <div
                  className={`
                  lg:flex
                  hidden flex-row items-center gap-2`}>
                  {categories.map((category) => (
                    <FilterButton
                      key={category.text}
                      text={category.text}
                      isSelected={category.isSelected}
                      onClickFn={() => handleFilterButton(category)} />
                  ))}
                </div>
              }
            </div>
            {postsCount !== 0 ? (
              <PostList
                page={page}
                setPage={setPage}
                category={categoryValue}
                isPageHidden={false}
                isSearch={true}
                keyword={router.query.keyword as string}
                country={router.query.country as string}
                setPostsCount={setPostsCount} />
            ) : (
              <div
                className={`
                lg:text-headline-m lg:h-[60px] lg:mt-[146px] lg:mb-[162px] 
                text-center text-gray-300
              `}>
                찾는 내용이 없으신가요?<br />
                철자를 확인하거나 다른 키워드로 검색해주세요!
              </div>
            )}
          </div>

          <div>
            <div
              className={`
              lg:block
              hidden relative transition-all duration-500 ease-out`}
              style={{ top: `${postsCount !== 0 ? Math.max(48, Math.min(position, maxScroll)) : `48`}px` }}>
              <UserNavbar />
            </div>
          </div>
        </div>
        {postsCount === 0 &&
          <div className={`lg:block hidden`}>
            <div className={`flex mt-[83px] mb-3`}>
              <p className={`lg:text-display2-b lg:block text-gray-600 hidden`}>
                최근 게시글
              </p>
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
              <PostList page={1} category={"ALL"} isPageHidden={true} postLimit={10} />
            </div>
          </div>
        }
      </div>
    </div>
  )
}
