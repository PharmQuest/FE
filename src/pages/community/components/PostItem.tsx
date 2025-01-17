import React from "react";
import SubjectTag from "./SubjectTag";
import Tag from "./Tag";
import { useRouter } from "next/router";

interface PostItemProps {
  id: string; // id
  isBest: boolean; // 베스트 게시글 여부
  subject: string; // 주제
  title: string; // 제목
  author: string; // 글쓴이
  date: string; // 날짜
  likes: number; // 좋아요 개수
  comments: number; // 댓글 개수
  scraps: number; // 스크랩 개수
}

const PostItem: React.FC<PostItemProps> = ({
  id,
  isBest,
  subject,
  title,
  author,
  date,
  likes,
  comments,
  scraps,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-row w-full justify-between border-b border-solid border-gray-100 py-3">
      <div className="flex flex-row gap-2">
        <SubjectTag text={subject} />
        <p
          className="text-body1-r text-gray-500 cursor-pointer"
          onClick={() => router.push(`/community/post/${id}`)}
        >
          {title}
        </p>
        {isBest && <Tag variant="best" />}
      </div>
      <div className="flex flex-row gap-7 text-body2-r text-gray-300">
        <p>{author}</p>
        <p>{date}</p>
        <p>{likes}</p>
        <p>{comments}</p>
        <p>{scraps}</p>
      </div>
    </div>
  );
};

export default PostItem;
