import React from "react";

const CommentInput = () => {
  return (
    <div className="flex flex-col gap-2 w-full pt-2 pb-3 pr-3 pl-4 rounded border border-solid border-gray-200">
      <p className="text-subhead1-sb text-gray-600">닉네임닉네임</p>
      <input
        placeholder="댓글을 남겨보세요."
        className="text-body1-r text-gray-600 placeholder-gray-300 focus:outline-none"
      />
      <div className="flex flex-row gap-3 justify-end">
        <span className="text-body1-r text-gray-300">0/3000</span>
        <input
          type="button"
          value="등록"
          className="w-[49px] h-29px] text-center text-subhead2-sb text-gray-400 bg-gray-100 rounded cursor-pointer"
        ></input>
      </div>
    </div>
  );
};

export default CommentInput;
