import React from "react";
import SubjectTag from "./SubjectTag";
import { BookmarkIcon, CommentIcon, LikeIcon } from "@public/svgs";
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
      className={`lg:gap-2 flex flex-col w-auto h-[117px] gap-1 cursor-pointer border-b border-solid border-gray-100 bg-${bgColor} ${bgColor === "primary-50" && `px-5`} py-4 rounded-lg`}
      onClick={() => {
        router.push(`/community/post/${id}`);
      }}
    >
      <div className="flex flex-row gap-2">
        <SubjectTag 
          text={category} 
          variant="dark"
          className={`
            lg:w-[64px] lg:text-body2-r
            min-w-[50px] w-[50px] h-[22px] px-1.5 py-0.5 text-m-subhead2-sb`}/>
        <p 
          className="
            lg:text-subhead1-sb
            text-m-subhead1-sb truncate">{title}</p>
      </div>
      <p 
        className="
          lg:text-body1-r 
          text-m-body2-r text-gray-500 truncate">{content}</p>
      <div 
        className="
          lg:text-body2-r
          mt-auto flex flex-row justify-between text-m-caption1-r text-gray-400">
        <p>{createdAt}</p>
        <div className="flex flex-row gap-[10px]">
          <div className="flex flex-row gap-[2px] items-center">
            <LikeIcon className="lg:w-5 w-4 cursor-pointer" />
            {likeCount}
          </div>
          <div className="flex flex-row gap-[2px] items-center">
            <CommentIcon className="lg:w-5 w-4 cursor-pointer" />
            {commentCount}
          </div>
          <div className="flex flex-row gap-[2px] items-center">
            <BookmarkIcon className="lg:w-5 w-4 cursor-pointer" stroke={"#707070"}/>
            {scrapeCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularPostItem;
