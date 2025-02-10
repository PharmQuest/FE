import React from "react";
import SubjectTag from "./SubjectTag";
import Tag from "./Tag";
import { BookmarkIcon, CommentIcon, LikeIcon } from "@public/svgs";
import { useRouter } from "next/router";
import { format } from "date-fns";

interface PostItemProps {
  postId: number;
  title: string;
  userName: string;
  content: string;
  category: string;
  scrapeCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  isBestPost: boolean;
}

const MobilePostItem: React.FC<PostItemProps> = ({
  postId,
  title,
  userName,
  content,
  category,
  scrapeCount,
  likeCount,
  commentCount,
  createdAt,
  isBestPost,
}) => {

  const router = useRouter();

  const date = new Date(createdAt);
  const formattedDate = isNaN(date.getTime()) ? "not date" : format(date, "yyyy.MM.dd")

  return (
    <div
      className={`max-w-full flex flex-col w-auto gap-3 cursor-pointer py-4 rounded-lg`}
      onClick={() => {
        router.push(`/community/post/${postId}`);
      }}
    >
      <div className="flex flex-col gap-2">
        <SubjectTag
          text={category}
          variant="light"
          className={`
            lg:w-[64px] lg:text-body2-r
            min-w-[50px] w-[50px] h-[22px] px-1.5 py-0.5 text-m-subhead2-sb`} />
        <div className={`flex flex-col gap-1`}>
          <div className={`flex gap-2 items-center`}>
            <p
              className="
              lg:text-subhead1-sb
              text-m-subhead1-sb truncate">{title}</p>
            {isBestPost &&
              <Tag variant="best" className={`!text-m-caption2-r !border`} />
            }
          </div>

          <p
            className="
              lg:text-body1-r 
              text-m-body2-r text-gray-500 truncate">{content}</p>
        </div>
      </div>

      <div className="
          lg:text-body2-r
          mt-auto flex flex-row justify-between text-m-caption1-r text-gray-400">
        <div className={`flex gap-2`}>
          {userName &&
            <>
              <p>{userName}</p>
              <p>|</p>
            </>
          }
          <p>{formattedDate}</p>
        </div>
        <div className="flex flex-row gap-[10px]">
          <div className="flex flex-row gap-[2px] items-center">
            <LikeIcon className="w-4 cursor-pointer" />
            {likeCount}
          </div>
          <div className="flex flex-row gap-[2px] items-center">
            <CommentIcon className="w-4 cursor-pointer" />
            {commentCount}
          </div>
          <div className="flex flex-row gap-[2px] items-center">
            <BookmarkIcon className="w-4 cursor-pointer" stroke={"#707070"} />
            {scrapeCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePostItem;
