import React from "react";
import SubjectTag from "./SubjectTag";
import BestTag from "./BestTag";
import { CommentIcon, LikeIcon, ScrapIcon } from "@public/svgs";

interface PopularPostItemProps {
  subject: string; // 주제
  title: string; // 제목
  content: string; // 내용
  date: string; // 날짜
  likes: number; // 좋아요 개수
  comments: number; // 댓글 개수
  scraps: number; // 스크랩 개수
}

const PopularPostItem: React.FC<PopularPostItemProps> = ({
  subject,
  title,
  content,
  date,
  likes,
  comments,
  scraps,
}) => {
  return (
    <div className="flex flex-col w-auto h-[117px] gap-2 px-5 py-4 bg-primary-50 rounded-lg">
      <div className="flex flex-row gap-2">
        <SubjectTag text={subject} />
        <p className="text-subhead1-sb">{title}</p>
        <BestTag />
      </div>
      <p className="text-body1-r text-gray-500">{content}</p>
      <div className="flex flex-row justify-between text-body2-r text-gray-400">
        <p>{date}</p>
        <div className="flex flex-row gap-[10px]">
          <div className="flex flex-row gap-[2px]">
            <LikeIcon className="cursor-pointer" />
            {likes}
          </div>
          <div className="flex flex-row gap-[2px]">
            <CommentIcon className="cursor-pointer" />
            {comments}
          </div>
          <div className="flex flex-row gap-[2px]">
            <ScrapIcon className="cursor-pointer" />
            {scraps}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularPostItem;
