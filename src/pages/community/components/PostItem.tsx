import React from "react";
import SubjectTag from "./SubjectTag";

interface PostItemProps {
  subject: string; // 주제
  title: string; // 제목
  author: string; // 글쓴이
  date: string; // 날짜
  likes: number; // 좋아요 개수
  comments: number; // 댓글 개수
  scraps: number; // 스크랩 개수
}

const PostItem: React.FC<PostItemProps> = ({
  subject,
  title,
  author,
  date,
  likes,
  comments,
  scraps,
}) => {
  return (
    <div className="flex flex-row w-full justify-between border-b border-solid border-gray-100 py-3">
      <div className="flex flex-row gap-2">
        <SubjectTag text={subject} />
        <p className="text-body1-r text-gray-500">{title}</p>
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
