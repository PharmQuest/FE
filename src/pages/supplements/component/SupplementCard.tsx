import { useState } from "react";
import Bookmark from "@public/svgs/bookmark.svg";
import BookmarkFill from "@public/svgs/bookmark-fill.svg";

interface SupplementCardProps {
  id: string;
  name: string;
  imageUrl: string;
  isBookmarked?: boolean; // 북마크 상태를 props로 받음 (기본값은 false)
}

function SupplementCard({
  id,
  name,
  imageUrl,
  isBookmarked = false,
}: SupplementCardProps) {
  const [active, setActive] = useState(isBookmarked);

  // 북마크 토글 핸들러
  const toggleBookmark = () => setActive(!active);

  return (
    <div
      className="relative h-[168px] min-w-[150px] bg-gradient-to-b from-black to-black rounded-lg"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 북마크 버튼 */}
      <button
        className="absolute top-2 right-2 w-6 h-6"
        onClick={toggleBookmark}
        aria-label={active ? "북마크 해제" : "북마크 추가"}
      >
        {active ? (
          <BookmarkFill className="w-full h-full text-yellow-400" />
        ) : (
          <Bookmark className="w-full h-full text-white" />
        )}
      </button>

      {/* 영양제 이름 */}
      <span className="absolute bottom-2 left-2 text-white text-sm font-bold p-2 bg-black/50 rounded">
        {name}
      </span>
    </div>
  );
}

export default SupplementCard;
