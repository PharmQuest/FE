import React from "react";
import PostItem from "./PostItem";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

const PostList: React.FC<{category?: string }> = ({ category = "ALL" }) => {

  const {data} = useQuery(
    {
      queryKey: ['post', category],
      queryFn: async () => await axios.get("http://localhost:8080/community/posts/lists",{
        params: {
          category,
          page: 1,
        }
      }),
      placeholderData: keepPreviousData,
    },
  );

  return (
    <div className="flex flex-col">
      <div className="py-3 grid grid-cols-[1fr_8fr_5fr] gap-2 justify-items-center text-subhead1-sb text-gray-500 border-b border-solid border-gray-300">
        <p>주제</p>
        <p>제목</p>
        <div className="grid grid-cols-[7fr_7fr_4fr_4fr_4fr] text-center w-full">
          <p>작성자</p>
          <p>등록일</p>
          <p>추천</p>
          <p>댓글</p>
          <p>스크랩</p>
        </div>
      </div>
      {data?.data?.result?.postList.map((post, index) => (
        <PostItem
          key={index}
          id={post.id}
          isBest={post.isBestPost}
          category={post.category}
          title={post.title}
          user={post.user}
          createdAt={post.createdAt}
          likeCount={post.likeCount}
          comments={post.comments}
          scrapeCount={post.scrapeCount}
        />
      ))}
    </div>
  );
};

export default PostList;
