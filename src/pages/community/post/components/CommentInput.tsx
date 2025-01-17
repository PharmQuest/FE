import React from "react";
import GrayButton from "../../components/GrayButton";

const CommentInput = () => {
  const handleClick = () => {
    // 등록 이벤트 처리
  };

  return (
    <div className="flex flex-col gap-2 w-full pt-2 pb-3 pr-3 pl-4 rounded border border-solid border-gray-200">
      <p className="text-subhead1-sb text-gray-600">닉네임닉네임</p>
      <input
        placeholder="댓글을 남겨보세요."
        className="text-body1-r text-gray-600 placeholder-gray-300 focus:outline-none"
      />
      <div className="flex flex-row gap-3 justify-end">
        <span className="text-body1-r text-gray-300">0/3000</span>
        <GrayButton text="등록" onClick={handleClick} />
      </div>
    </div>
  );
};

export default CommentInput;
