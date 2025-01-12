import React from "react";
import PopularPostItem from "./PopularPostItem";
import popularPosts from "../../../mocks/popularPosts";

const PopularPostList = () => {
  return (
    <div className="flex flex-col gap-3">
      {popularPosts.map((post, index) => (
        <PopularPostItem
          key={index}
          subject={post.subject}
          title={post.title}
          content={post.content}
          date={post.date}
          likes={post.likes}
          comments={post.comments}
          scraps={post.scraps}
        />
      ))}
    </div>
  );
};

export default PopularPostList;
