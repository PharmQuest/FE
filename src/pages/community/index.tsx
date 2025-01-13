// 커뮤니티_메인화면
import FilterButton from "@/components/common/FilterButton";
import PopularPostList from "./components/PopularPostList";
import UserNavbar from "./components/UserNavbar";
import PostList from "./components/PostList";

const FILTER_CATEGORIES = [
  "전체",
  "자유",
  "약국",
  "병원",
  "약",
  "증상",
  "영양제",
] as const;

export default function Community() {
  return (
    <div>
      <div className="px-[260px] mt-9">
        <p className="text-display2-b text-gray-600">BEST 인기글</p>
        <div className="flex flex-row gap-x-4 mt-3">
          <PopularPostList />
          <UserNavbar />
        </div>
        <div className="flex flex-row gap-3 mt-10 mb-6">
          <p className="text-display2-b text-gray-600">게시글</p>
          {FILTER_CATEGORIES.map((category) => (
            <FilterButton key={category} text={category} />
          ))}
        </div>
        <PostList />
      </div>
    </div>
  );
}
