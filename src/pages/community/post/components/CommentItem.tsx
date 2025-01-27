import React, { useState } from "react";
import { CommentIcon, KebabIcon, LikeIcon } from "@public/svgs";
import CommentInput from "./CommentInput";

interface CommentItemProps {
  id: number;
  writer: string;
  content: string;
  date: string;
  likes: number;
  replyId: number | null;
  setReplyId: (id: number) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  id,
  writer,
  content,
  date,
  likes,
  replyId,
  setReplyId,
}) => {

  const [isLike, setIsLike] = useState(false);

  const handleLike = () => {
    setIsLike(!isLike);
  }

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
            <LikeIcon
              fill={isLike ? "#FF8686" : "none"}
              className={`cursor-pointer mr-[2px] ${isLike && `text-[#FF8686]`}`}
              onClick={() => handleLike()} />
            {likes}
          </div>
          <div 
            className="flex flex-row cursor-pointer"
            onClick={() => setReplyId(id)}>
            <CommentIcon/> 답글 달기
          </div>
        </div>
      </div>
      {replyId === id && 
        <CommentInput/>
      }
    </div>
  );
};

export default CommentItem;
