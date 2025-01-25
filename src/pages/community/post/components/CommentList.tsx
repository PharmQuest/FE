import React from "react";
import comments from "../../../../mocks/comments";
import CommentItem from "./CommentItem";
import ReplyItem from "./ReplyItem";

const CommentList = () => {
  const findParentWriter = (parentId: string) => {
    const parentComment = comments.find((comment) => comment.id === parentId);
    return parentComment?.writer || "";
  };

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
    </div>
  );
};

export default CommentList;
