import React from "react";
import { CommentIcon, KebabIcon, LikeIcon } from "@public/svgs";

interface CommentItemProps {
  id: string;
  writer: string;
  content: string;
  date: string;
  likes: number;
}

const CommentItem: React.FC<CommentItemProps> = ({
  writer,
  content,
  date,
  likes,
}) => {
  return (
    <div className="flex flex-col gap-2 px-3 py-5 border-b border-solid border-gray-100">
      <div className="flex flex-row justify-between">
        <p className={`text-subhead1-sb text-gray-600`}>{writer}</p>
        <KebabIcon />
      </div>
      <p className="text-body1-r text-gray-500">{content}</p>
      <div className="flex flex-row justify-between text-body2-r text-gray-400">
        <p>{date}</p>
        <div className="flex flex-row gap-[10px]">
          <div className="flex flex-row">
            <LikeIcon className="cursor-pointer mr-[2px]" />
            {likes}
          </div>
          <div className="flex flex-row cursor-pointer">
            <CommentIcon /> 답글 달기
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
