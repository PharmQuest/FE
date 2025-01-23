import React from "react";
import SubjectTag from "./SubjectTag";
import Tag from "./Tag";
import { CommentIcon, LikeIcon, ScrapIcon } from "@public/svgs";
import { useRouter } from "next/router";

interface PopularPostItemProps {
  id: number; // id
  category: string; // 주제
  title: string; // 제목
  content: string; // 내용
  createdAt: string; // 날짜
  likeCount: number; // 좋아요 개수
  commentCount: number; // 댓글 개수
  scrapeCount: number; // 스크랩 개수
  bgColor?: string; // 배경색
}

const PopularPostItem: React.FC<PopularPostItemProps> = ({
  id,
  category,
  title,
  content,
  createdAt,
  likeCount,
  commentCount,
  scrapeCount,
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
        <SubjectTag text={category} variant="dark" />
        <p className="text-subhead1-sb">{title}</p>
        <Tag variant="best" />
      </div>
      <p className="text-body1-r text-gray-500 truncate">{content}</p>
      <div className="flex flex-row justify-between text-body2-r text-gray-400">
        <p>{createdAt}</p>
        <div className="flex flex-row gap-[10px]">
          <div className="flex flex-row gap-[2px]">
            <LikeIcon className="cursor-pointer" />
            {likeCount}
          </div>
          <div className="flex flex-row gap-[2px]">
            <CommentIcon className="cursor-pointer" />
            {commentCount}
          </div>
          <div className="flex flex-row gap-[2px]">
            <ScrapIcon className="cursor-pointer" />
            {scrapeCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularPostItem;
