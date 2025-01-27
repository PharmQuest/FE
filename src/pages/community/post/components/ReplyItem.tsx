import {
  CommentIcon,
  CornerDownRightIcon,
  KebabIcon,
  LikeIcon,
} from "@public/svgs";
import React, { useState } from "react";
import Tag from "../../components/Tag";
import CommentInput from "./CommentInput";

interface ReplyItemProps {
  id: number;
  writer: string;
  content: string;
  date: string;
  likes: number;
  parentWriter: string; // 부모 댓글 작성자
  replyId: number | null;
  setReplyId: (id: number) => void;
}

const ReplyItem: React.FC<ReplyItemProps> = ({
  id,
  writer,
  content,
  date,
  likes,
  parentWriter,
  replyId,
  setReplyId,
}) => {

  const [isLike, setIsLike] = useState(false);

  const handleLike = () => {
    setIsLike(!isLike);
  }


  return (
    <div>
      <div className="flex flex-col gap-2 pl-10 pr-3 pb-5 border-b border-solid border-gray-100">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-1">
            <CornerDownRightIcon />
            <p>{writer}</p>
            <Tag variant="writer" />
          </div>
          <KebabIcon />
        </div>
        <div className="flex flex-row gap-2">
          <p className="text-subhead1-sb text-secondary-500">@{parentWriter}</p>
          <p className="text-body1-r text-gray-500">{content}</p>
        </div>

        <div className="flex flex-row justify-between text-body2-r text-gray-400">
          <p>{date}</p>
          <div className="flex flex-row gap-[10px]">
            <div className="flex flex-row">
              <LikeIcon 
                fill={isLike ? "#FF8686" : "none"}
                className={`cursor-pointer mr-[2px] ${isLike && `text-[#FF8686]`}`}
                onClick={() => handleLike()}/>
              {likes}
            </div>
            <div 
              className="flex flex-row cursor-pointer"
              onClick={() => setReplyId(id)}>
              <CommentIcon /> 답글 달기
            </div>
          </div>
        </div>
        {replyId === id &&
          <CommentInput/>
        }
      </div>
    </div>
  );
};

export default ReplyItem;
