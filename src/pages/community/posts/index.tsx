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
  const { position, maxScroll } = useScroll();

  const [page, setPage] = useState<number>(1);
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
    setCategoryValue(category.value);
    setPage(1);
  };

  useEffect(() => {
    setCategoryValue(router.query.category as string || "ALL");
  }, [router.query.category]);

  return (
    <div className="lg:max-w-[900px] lg:mx-auto lg:px-0 md:max-w-[600px] md:mx-auto md:px-0 lg:mt-9 w-screen px-5">
      <div className="max-w-[900px] mx-auto min-h-[460px]">
        <div className="flex flex-row gap-x-4 mt-3">
          <div className={`flex flex-col grow max-w-full`}>
            <div className="lg:mb-4 flex flex-row items-center gap-3">
              <p className="lg:text-display2-b text-m-headline1-b text-gray-600">게시글</p>
              <div className="lg:flex hidden flex-row items-center gap-2">
                {categories.map((category) => (
                  <FilterButton
                    key={category.text}
                    text={category.text}
                    isSelected={category.isSelected}
                    onClickFn={() => handleFilterButton(category)}
                  />
                ))}
              </div>
            </div>
            <PostList page={page} setPage={setPage} category={categoryValue} isPageHidden={false} />
          </div>

          <div>
            <div
              className="lg:block hidden relative transition-all duration-500 ease-out"
              style={{ top: `${Math.max(48, Math.min(position, maxScroll))}px` }}
            >
              <UserNavbar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
