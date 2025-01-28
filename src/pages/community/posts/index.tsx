// 커뮤니티_ 게시글

import UserNavbar from "../components/UserNavbar";
import { useEffect, useState } from "react";
import PostList from "../components/PostList";
import FilterButton from "@/components/common/FilterButton";
import { useRouter } from "next/router";
import useScroll from "../../../hooks/community/useScroll";

interface Category {
  value: string;
  text: string;
  isSelected: boolean;
}

export default function Posts() {

  const router = useRouter();
  const categoryQuery = router.query.category as string || "ALL";

  const {position, handleScroll} = useScroll(700);

  const [categories, setCategories] = useState<Category[]>([
    { value: "ALL", text: "전체", isSelected: true },
    { value: "FORUM", text: "자유", isSelected: false },
    { value: "PHARMACY", text: "약국", isSelected: false },
    { value: "HOSPITAL", text: "병원", isSelected: false },
    { value: "MEDICATION", text: "약", isSelected: false },
    { value: "SYMPTOM", text: "증상", isSelected: false },
    { value: "SUPPLEMENT", text: "영양제", isSelected: false },
  ]);

  useEffect(() => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        isSelected: category.value === categoryQuery,
      }))
    );
  }, [categoryQuery]);

  const [category, setCategory] = useState(router.query.category as string || "ALL");

  const handleFilterButton = (category: Category) => {
    setCategory(category.value)
    router.push({
      pathname: router.pathname,
      query: {category: category.value}
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);



  return (
    <div className={`overflow-hidden min-h-[calc(100vh-169px-188px)]`}>
      <div className="max-w-[900px] mx-auto mt-9 min-h-[460px]">
        <div className="flex flex-row gap-x-4 mt-3 ">
          <div className={`flex flex-col grow`}>
            <div className="flex flex-row items-center gap-3 mb-4">
              <p className="text-display2-b text-gray-600">게시글</p>
              {categories.map((category) => (
                <FilterButton
                  key={category.text}
                  text={category.text}
                  isSelected={category.isSelected}
                  onClickFn={() => handleFilterButton(category)} />
              ))}
            </div>
            <PostList category={category} isHiddenPage={false} />
          </div>

          <div className={`relative transition-all duration-500 ease-out`}
            style={{ top: `${position}px` }}>
            <UserNavbar />
          </div>
        </div>
      </div>
    </div>
  )
}
