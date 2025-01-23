import React from "react";
import PopularPostItem from "./PopularPostItem";


const PopularPostList = ({posts, bgColor = "white"}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {posts.map((post, index) => (
        <PopularPostItem
          key={index}
          id={post.id}
          subject={post.subject}
          title={post.title}
          content={post.content}
          date={post.date}
          likes={post.likes}
          comments={post.comments}
          scraps={post.scraps}
          bgColor={bgColor}
        />
      ))}
    </div>
  );
};

export default PopularPostList;
