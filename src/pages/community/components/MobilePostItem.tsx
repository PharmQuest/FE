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
      className={`flex flex-col w-auto gap-3 cursor-pointer border-b border-solid border-gray-100 py-4 rounded-lg`}
      onClick={() => {
        router.push(`/community/post/${postId}`);
      }}
    >
      <div className="flex flex-col gap-2">
        <SubjectTag
          text={category}
          variant="light"
          className={`w-[50px] h-[22px] text-m-subhead2-sb px-1.5 py-0.5`} />
        <div className={`flex flex-col gap-1`}>
          <div className={`block`}>
          <p className="text-m-subhead1-sb h-[21px] truncate max-w-[calc(100vw-40px)]">{title}</p>
          </div>
          {isBestPost &&
            <Tag variant="best" />
          }
          <p className="text-m-body2-r text-gray-500 truncate">{content}</p>
        </div>
      </div>

      <div className="flex flex-row justify-between text-m-caption1-r text-gray-400">
        <div className={`flex gap-2`}>
          <p>{userName}</p>
          <p>|</p>
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
            <BookmarkIcon className="w-4 cursor-pointer" stroke={"#707070"}/>
            {scrapeCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePostItem;
