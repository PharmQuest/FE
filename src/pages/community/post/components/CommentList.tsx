import React from "react";
import comments from "../../../../mocks/comments";
import CommentItem from "./CommentItem";
import ReplyItem from "./ReplyItem";
import { ArrowRightIcon } from "@public/svgs";

const CommentList = () => {
  const totalPage=2;
  const isFirst=true;
  const isLast=false;
  const currentPage=1;

  const findParentWriter = (parentId: string) => {
    const parentComment = comments.find((comment) => comment.id === parentId);
    return parentComment?.writer || "";
  };

  const pageNavigate = (page: number) => {
    console.log(page)
  }

  return (
    <div className="flex flex-col bg-gray-50 p-5">
      {comments.map((comment) => {
        if (comment.parentId) {
          // 답글
          return (
            <ReplyItem
              key={comment.id}
              id={comment.id}
              writer={comment.writer}
              content={comment.content}
              date={comment.date}
              likes={comment.likes}
              parentWriter={findParentWriter(comment.parentId)}
            />
          );
        } else {
          // 일반 댓글
          return (
            <CommentItem
              key={comment.id}
              id={comment.id}
              writer={comment.writer}
              content={comment.content}
              date={comment.date}
              likes={comment.likes}
            />
          );
        }
      })}

      <div className={`flex gap-3 mx-auto mt-5 items-center`}>
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
