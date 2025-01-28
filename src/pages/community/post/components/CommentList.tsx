import React, { useState } from "react";
import CommentItem from "./CommentItem";
import { ArrowRightIcon } from "@public/svgs";

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

interface Comment {
  commentId: number;
  content: string;
  userId: number;
  userName: string;
  createdAt: string;
  parentId: number | null;
  parentName: string | null;
  replies: Reply[];
}

const CommentList = ({ postUserId, comments }: { postUserId: number, comments: Comment[] }) => {
  const totalPage = 2;
  const isFirst = true;
  const isLast = false;
  const currentPage = 1;

  const [replyParentId, setReplyParentId] = useState<number | null>(null);

  const pageNavigate = (page: number) => {
    console.log(page)
  }
  
  return (
    comments?.length > 0 &&
    <div className="flex flex-col bg-gray-50 p-5 gap-5">
      {comments?.map((comment) => (
        <CommentItem
          key={comment.commentId}
          postUserId={postUserId}
          commentId={comment.commentId}
          content={comment.content}
          userId={comment.userId}
          userName={comment.userName}
          createdAt={comment.createdAt}
          replies={comment.replies}
          replyParentId={replyParentId}
          setReplyParentId={setReplyParentId} />
      ))}

      {/* PageNavigator */}

      <div className={`flex gap-3 mx-auto items-center`}>
        {!isFirst &&
          <ArrowRightIcon
            onClick={() => pageNavigate(currentPage - 1)}
            className={`rotate-180 mb-0.5 text-gray-600 px-2 w-6 cursor-pointer`} />}
        {[...Array(totalPage)].map((_, index) => (
          <button
            key={index}
            onClick={() => pageNavigate(index + 1)}
            disabled={currentPage === index + 1}
            className={`px-3 py-1 text-subhead1-sb ${currentPage === index + 1 ? `text-secondary-500 cursor-default` : `text-gray-300`}`}>
            {index + 1}
          </button>
        ))}
        {!isLast &&
          <ArrowRightIcon
            onClick={() => pageNavigate(currentPage + 1)}
            className={`mb-0.5 text-gray-600 px-2 w-6 cursor-pointer`} />}
      </div>
    </div>
  );
};

export default CommentList;
