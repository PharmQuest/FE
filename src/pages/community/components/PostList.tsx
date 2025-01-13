import React from "react";
import PostItem from "./PostItem";
import posts from "../../../mocks/posts";

const PostList = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row text-subhead1-sb text-gray-500 justify-between border-b border-solid border-gray-300">
        <p>주제</p>
        <p>제목</p>
        <div className="flex flex-row gap-7">
          <p>작성자</p>
          <p>등록일</p>
          <p>추천</p>
          <p>댓글</p>
          <p>스크랩</p>
        </div>
      </div>
      {posts.map((post, index) => (
        <PostItem
          key={index}
          subject={post.subject}
          title={post.title}
          author={post.author}
          date={post.date}
          likes={post.likes}
          comments={post.comments}
          scraps={post.scraps}
        />
      ))}
    </div>
  );
};

export default PostList;
