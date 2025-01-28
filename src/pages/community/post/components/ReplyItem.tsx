import {
  CommentIcon,
  CornerDownRightIcon,
  KebabIcon,
  LikeIcon,
} from "@public/svgs";
import React, { useState } from "react";
import Tag from "../../components/Tag";
import CommentInput from "./CommentInput";
import { format } from "date-fns";

interface Reply {
  commentId: number;
  content: string;
  userId: number;
  userName: string;
  createdAt: string;
  parentId: number;
  parentName: string;
  replies: Reply[];
}

interface ReplyItemProps {
  postUserId: number;
  commentId: number;
  content: string;
  userId: number;
  userName: string;
  createdAt: string;
  parentId: number;
  parentName: string;
  replies: Reply[];
  replyParentId: number | null;
  setReplyParentId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ReplyItem: React.FC<ReplyItemProps> = ({
  postUserId,
  commentId,
  content,
  userId,
  userName,
  createdAt,
  parentId,
  parentName,
  replies,
  replyParentId,
  setReplyParentId,
}) => {

  

  const [isLike, setIsLike] = useState(false);

  const handleLike = () => {
    setIsLike(!isLike);
  }

  const date = new Date(createdAt);
    const formattedDate = isNaN(date.getTime()) ? "not date" : format(date, "yyyy.MM.dd")

  return (
    <div>
      <div className="flex flex-col gap-2 pl-10 pr-3 pb-5 border-b border-solid border-gray-100">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-1">
            <CornerDownRightIcon />
            <p>{userName}</p>
            {postUserId === userId && <Tag variant="writer" /> }
          </div>
          <KebabIcon />
        </div>
        <div className="flex flex-row gap-2">
          <p className="text-subhead1-sb text-secondary-500">@{parentName}</p>
          <p className="text-body1-r text-gray-500">{content}</p>
        </div>

        <div className="flex flex-row justify-between text-body2-r text-gray-400">
          <p>{formattedDate}</p>
          <div className="flex flex-row gap-[10px]">
            <div className="flex flex-row">
              <LikeIcon 
                fill={isLike ? "#FF8686" : "none"}
                className={`cursor-pointer mr-[2px] ${isLike && `text-[#FF8686]`}`}
                onClick={() => handleLike()}/>
              {0}
            </div>
            <div 
              className="flex flex-row cursor-pointer"
              onClick={() => setReplyParentId(commentId)}>
              <CommentIcon /> 답글 달기
            </div>
          </div>
        </div>
        {replyParentId === commentId &&
          <CommentInput/>
        }
      </div>
    </div>
  );
};

export default ReplyItem;
