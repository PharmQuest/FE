import React from "react";
import MyCommentItem from "./MyCommentItem";
import comments from "../../../../mocks/comments";
import GrayButton from "../../components/GrayButton";

const MyCommentList = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center py-3 px-4 border-b border-solid border-gray-300 text-subhead1-sb text-gray-500">
        <p className="flex-1 text-right">댓글</p>
        <p className="flex-1 text-right">등록일</p>
      </div>
      {comments.map((comment) => {
        return (
          <MyCommentItem
            key={comment.id}
            id={comment.id}
            content={comment.content}
            title={comment.title}
            date={comment.date}
          />
        );
      })}
      <div className="flex flex-row mt-3 justify-between items-center">
        <div className="flex flex-row gap-2">
          <input type="checkbox" />
          <p className="text-subhead1-sb text-gray-300">전체 선택</p>
        </div>
        <GrayButton text="삭제" />
      </div>
    </div>
  );
};

export default MyCommentList;