// 커뮤니티_메인화면
import FilterButton from "@/components/common/FilterButton";
import PopularPostList from "./components/PopularPostList";
import UserNavbar from "./components/UserNavbar";
import PostList from "./components/PostList";
import { useState } from "react";
import { ArrowRightIcon } from "@public/svgs";
import { useRouter } from "next/router";
import popularPosts from "@/mocks/popularPosts";

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

  return (
    <div>
      <div className="max-w-[900px] mx-auto mt-9">
        <div className="flex flex-row gap-x-4 mt-3">
          <div className={`flex flex-col`}>
            <div className={`flex justify-between mb-3`}>
              <p className="text-display2-b text-gray-600">BEST 인기글</p>
              <p
                className={`flex text-gray-400 text-subhead1-sb items-center gap-2 cursor-pointer mr-2`}
                onClick={() => router.push('/community/bestposts')}>
                더보기
                <ArrowRightIcon className={`content-center mb-0.5`} />
              </p>
            </div>
            <PopularPostList posts={popularPosts.slice(0, 3)} bgColor={"primary-50"} gap={3}/>
          </div>
          <div>
            <p className={`h-9 mb-3`} />
            <UserNavbar />
          </div>
        </div>
        <div className="flex flex-row items-center gap-3 mt-20 mb-4">
          <p className="text-display2-b text-gray-600">게시글</p>
          {categories.map((category) => (
            <FilterButton
              key={category.text}
              text={category.text}
              isSelected={category.isSelected}
              onClickFn={() => handleFilterButton(category)} />
          ))}
          <p
            className={`flex text-gray-400 text-subhead1-sb items-center gap-2 cursor-pointer mr-4 ml-auto mt-3`}
            onClick={() => router.push('/community/posts')}>
            더보기
            <ArrowRightIcon className={`content-center mb-0.5`} />
          </p>
        </div>
        <PostList category={category} />
      </div>
    </div>
  );
}
