import React from "react";
import comments from "../../../../mocks/comments";
import TextButton from "../../components/TextButton";
import MyNotificationItem from "./MyNotificationItem";

const MyNotificationList = () => {
  return (
    <div className="flex flex-col">
      <div className="max-lg:hidden flex justify-between items-center py-3 px-4 border-b border-solid border-gray-300 text-subhead1-sb text-gray-500">
        <p className="flex-1 text-right">내용</p>
        <p className="flex-1 text-right">등록일</p>
      </div>

      <div className="lg:hidden flex py-4">
        <TextButton text="알림 편집" color="white" />
      </div>

      {comments.map((comment) => {
        return (
          <MyNotificationItem
            key={comment.id}
            id={comment.id}
            writer={comment.writer}
            content={comment.content}
            title={comment.title}
            date={comment.date}
          />
        );
      })}
      <div className="max-lg:hidden flex flex-row mt-3 justify-between items-center">
        <div className="flex flex-row gap-2">
          <input type="checkbox" />
          <p className="text-subhead1-sb text-gray-300">전체 선택</p>
        </div>
        <TextButton text="읽음" />
      </div>
    </div>
  );
};

export default MyNotificationList;
