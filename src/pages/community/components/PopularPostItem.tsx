import React from "react";
import SubjectTag from "./SubjectTag";
import Tag from "./Tag";
import { CommentIcon, LikeIcon, ScrapIcon } from "@public/svgs";
import { useRouter } from "next/router";

interface PopularPostItemProps {
  id: string; // id
  subject: string; // 주제
  title: string; // 제목
  content: string; // 내용
  date: string; // 날짜
  likes: number; // 좋아요 개수
  comments: number; // 댓글 개수
  scraps: number; // 스크랩 개수
  bgColor?: string; // 배경색
}

const PopularPostItem: React.FC<PopularPostItemProps> = ({
  id,
  subject,
  title,
  content,
  date,
  likes,
  comments,
  scraps,
  bgColor,
}) => {
  const router = useRouter();

  return (
    <div
      className={`flex flex-col w-auto h-[117px] gap-2 px-5 py-4 bg-${bgColor} rounded-lg cursor-pointer`}
      onClick={() => {
        router.push(`/community/post/${id}`);
      }}
    >
      <div className="flex flex-row gap-2">
        <SubjectTag text={subject} variant="dark" />
        <p className="text-subhead1-sb">{title}</p>
        <Tag variant="best" />
      </div>
      <p className="text-body1-r text-gray-500 truncate">{content}</p>
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
