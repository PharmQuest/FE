import React, { useState } from "react";
import GrayButton from "../../components/GrayButton";

const CommentInput = () => {
  const handleClick = () => {
    // 등록 이벤트 처리
  };

  const [content, setContent] = useState<string>("");

  return (
    <div className="flex flex-col gap-2 w-full pt-2 pb-3 pr-3 pl-4 rounded border border-solid border-gray-200 bg-white">
      <p className="text-subhead1-sb text-gray-600">닉네임닉네임</p>
      <input
        placeholder="댓글을 남겨보세요."
        className="text-body1-r text-gray-600 placeholder-gray-300 focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex flex-row gap-3 justify-end">
        <span className="text-body1-r text-gray-300">{content.length}/600</span>
        <GrayButton 
          text="등록" 
          onClick={handleClick} 
          color={content.length > 0 ? "green" : "gray"}/>
      </div>
    </div>
  );
};

export default CommentInput;
