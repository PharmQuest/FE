import React from "react";
import SubjectTag from "./SubjectTag";
import { BookmarkIcon, CommentIcon, LikeIcon } from "@public/svgs";
import { useRouter } from "next/router";
import { format } from "date-fns";

interface PopularPostItemProps {
  postId: number;
  userName: string;
  title: string;
  content: string;
  category: string;
  scrapeCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  bgColor?: string;
}

const PopularPostItem: React.FC<PopularPostItemProps> = ({
  postId,
  userName,
  title,
  content,
  category,
  scrapeCount,
  likeCount,
  commentCount,
  createdAt,
  bgColor,
}) => {
  const router = useRouter();

  const date = new Date(createdAt);
  const formattedDate = isNaN(date.getTime()) ? "not date" : format(date, "yyyy.MM.dd")

  return (
    <div
      className={`lg:gap-2 flex flex-col w-full gap-1 cursor-pointer border-b border-solid border-gray-100 bg-${bgColor} ${bgColor === "primary-50" && `px-5`} py-4 rounded-lg`}
      onClick={() => {
        router.push(`/community/post/${postId}`);
      }}
    >
      <div className="md:flex-row flex flex-col gap-2">
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
          text-m-body2-r text-gray-500 truncate w-full">{content}</p>
      <div 
        className="
          lg:text-body2-r
          mt-auto flex flex-row justify-between text-m-caption1-r text-gray-400">
        <div className={`flex gap-2`}>
          <p className={`md:hidden`}>{userName}</p>
          <p className={`md:hidden`}>|</p>
          <p>{formattedDate}</p>
        </div>
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
