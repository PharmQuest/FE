import React from "react";
import SubjectTag from "./SubjectTag";
import Tag from "./Tag";
import { useRouter } from "next/router";
import { format } from "date-fns";

interface PostItemProps {
  postId: number;
  userName: string;
  title: string;
  content: string;
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
  // eslint-disable-next-line
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
      
      
      <div className="grid grid-cols-[7fr_7fr_4fr_4fr_5fr] text-center text-body2-r text-gray-300 w-full">
        <p>{userName}</p>
        <p>{formattedDate}</p>
        <p>{likeCount}</p>
        <p>{commentCount}</p>
        <p>{scrapeCount}</p>
      </div>
    </div>
  );
};

export default PostItem;
