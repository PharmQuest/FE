import React, { useState } from "react";
import { CommentIcon, KebabIcon, LikeIcon } from "@public/svgs";
import CommentInput from "./CommentInput";
import { format } from "date-fns";
import ReplyItem from "./ReplyItem";
import Tag from "../../components/Tag";

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

interface CommentItemProps {
  postUserId: number;
  commentId: number;
  content: string;
  userId: number;
  userName: string;
  createdAt: string;
  replies: Reply[];
  replyParentId: number | null;
  setReplyParentId: React.Dispatch<React.SetStateAction<number | null>>;
}

const CommentItem: React.FC<CommentItemProps> = ({
  postUserId,
  commentId,
  content,
  userId,
  userName,
  createdAt,
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
    <div className={`flex flex-col gap-5`}>
      <div className="flex flex-col gap-2 px-3 pb-5 border-b border-solid border-gray-100">
        <div className="flex flex-row justify-between">
          <p className={`flex gap-1 text-subhead1-sb text-gray-600`}>
            {userName}
            {postUserId === userId && <Tag variant="writer" /> }
          </p>
          <KebabIcon />
        </div>
        <p className="text-body1-r text-gray-500">{content}</p>
        <div className="flex flex-row justify-between text-body2-r text-gray-400">
          <p>{formattedDate}</p>
          <div className="flex flex-row gap-[10px]">
            <div className="flex flex-row">
              <LikeIcon
                fill={isLike ? "#FF8686" : "none"}
                className={`cursor-pointer mr-[2px] ${isLike && `text-[#FF8686]`}`}
                onClick={() => handleLike()} />
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
          <CommentInput />
        }
      </div>
      {replies?.map((reply) => (
        <ReplyItem
          postUserId={postUserId}
          key={reply.commentId}
          commentId={reply.commentId}
          content={reply.content}
          userId={reply.userId}
          userName={reply.userName}
          createdAt={reply.createdAt}
          parentId={reply.parentId}
          parentName={reply.parentName}
          replies={reply.replies}
          replyParentId={replyParentId}
          setReplyParentId={setReplyParentId} />
      ))}
    </div>
  );
};

export default CommentItem;
