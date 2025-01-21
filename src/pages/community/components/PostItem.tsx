import React from "react";
import SubjectTag from "./SubjectTag";
import Tag from "./Tag";
import { useRouter } from "next/router";
import { format } from "date-fns";

interface PostItemProps {
  id: string; // id
  isBest: boolean; // 베스트 게시글 여부
  category: string; // 카테고리
  title: string; // 제목
  user: string; // 글쓴이
  createdAt: string; // 날짜
  likeCount: number; // 좋아요 개수
  comments: number; // 댓글 개수
  scrapeCount: number; // 스크랩 개수
}

const PostItem: React.FC<PostItemProps> = ({
  id,
  isBest,
  category,
  title,
  user,
  createdAt,
  likeCount,
  comments,
  scrapeCount,
}) => {
  const router = useRouter();

  return (
    <div className="py-3 grid grid-cols-[1fr_8fr_5fr] gap-2 border-b border-solid border-gray-100">
      
      <SubjectTag text={category} />
      <div
        className="truncate flex text-body1-r text-gray-500 cursor-pointer gap-2"
        onClick={() => router.push(`/community/post/${id}`)}
      >
        <p className={`max-w-[428px] truncate`}>
          {title}
        </p>
        {isBest && <Tag variant="best" />}
      </div>
      
      
      <div className="grid grid-cols-[7fr_7fr_4fr_4fr_4fr] text-center text-body2-r text-gray-300 w-full">
        <p>{user}</p>
        <p>{format(new Date(createdAt), "yyyy.MM.dd")}</p>
        <p>{likeCount}</p>
        <p>{comments}</p>
        <p>{scrapeCount}</p>
      </div>
    </div>
  );
};

export default PostItem;
