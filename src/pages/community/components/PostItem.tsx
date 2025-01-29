import React from "react";
import SubjectTag from "./SubjectTag";
import Tag from "./Tag";
import { useRouter } from "next/router";
import { format } from "date-fns";

interface PostItemProps {
  postId: number;
  userName: string;
  title: string;
  category: string;
  scrapeCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  isBestPost: boolean;
}

const PostItem: React.FC<PostItemProps> = ({
  postId,
  userName,
  title,
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
    <div className="py-3 grid grid-cols-[1fr_7fr_6fr] gap-2 border-b border-solid border-gray-100">

      <SubjectTag text={category} />
      <div
        className="truncate flex text-body1-r text-gray-500 cursor-pointer gap-2"
        onClick={() => router.push(`/community/post/${postId}`)}
      >
        <p className={`max-w-[428px] truncate`}>
          {title}
        </p>
        {isBestPost && <Tag variant="best" />}
      </div>

      <div className="grid grid-flow-col gap-5 text-center items-center justify-items-center text-body2-r text-gray-300 w-full">
        <p className={`w-[73px] truncate`}>{userName}</p>
        <p className={`w-[73px] truncate`}>{formattedDate}</p>
        <div className={`flex gap-5`}>
          <p className={`w-[36px] truncate`}>{likeCount}</p>
          <p className={`w-[36px] truncate`}>{commentCount}</p>
          <p className={`w-[42px] truncate`}>{scrapeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
