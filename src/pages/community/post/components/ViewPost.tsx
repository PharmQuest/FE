import {
  CommentIcon,
  KebabIcon,
  LikeIcon,
  ScrapIcon,
} from "@public/svgs";
import Tag from "../../components/Tag";
import SubjectTag from "../../components/SubjectTag";
import React, { useState } from "react";
import { format } from "date-fns";

interface ViewPostProps {
  category: string;
  title: string;
  isBestPost?: boolean;
  userName: string;
  createdAt: string;
  content: string;
  likeCount: number;
  comments: number;
  scrapeCount: number;
}

const ViewPost: React.FC<ViewPostProps> = ({
  isBestPost = false,
  category,
  title,
  userName,
  createdAt,
  content,
  likeCount,
  comments,
  scrapeCount,
}) => {
  const date = new Date(createdAt);
  const formattedDate = isNaN(date.getTime()) ? "not date" : format(date, "yyyy.MM.dd")

  const [isLike, setIsLike] = useState(false);

  const handleLike = () => {
    setIsLike(!isLike);
  }

  return (
    <div className="mt-11 mb-8">
      <div className="flex flex-row justify-between pb-4 border-b border-solid border-gray-100">
        <div className="flex flex-row gap-3">
          <SubjectTag text={category} variant="light-big" />
          <p className="text-headline-b text-gray-500">{title}</p>
          {isBestPost && <Tag variant="best" />}
        </div>

        <div className="flex flex-row gap-5 text-body1-r text-gray-300">
          <p>{userName}</p>
          |
          <p>{formattedDate}</p>
          <KebabIcon onClick={() => { }} />
        </div>
      </div>

      <div className="mt-8 mb-12 text-body1-r text-gray-500">{content}</div>

      <div className="flex flex-row justify-end text-gray-400">
        <div className="flex flex-row text-subhead1-sb items-center gap-0.5">
          <LikeIcon
            fill={isLike ? "#FF8686" : "none"}
            className={`cursor-pointer mr-[2px] ${isLike && `text-[#FF8686]`}`}
            onClick={() => handleLike()} />
          {likeCount}
          <CommentIcon className="ml-3" />
          {comments}
          <ScrapIcon className="ml-3" />
          {scrapeCount}
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
