import React from "react";
import PopularPostItem from "./PopularPostItem";

interface Post{
  id: number;
  category: string;
  title: string;
  content: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  scrapeCount: number;
}

interface PopularPostListProps {
  posts: Post[];
  bgColor?: string;
  gap?: boolean;
}

const PopularPostList: React.FC<PopularPostListProps> = ({posts, bgColor = "white", gap=false}) => {
  return (
    <div 
      className={`
        lg:max-w-[900px]
        md:max-w-[600px]
        flex flex-col w-full ${gap && `lg:gap-3 gap-2`}`}>
      {posts?.map((post, index) => (
        <PopularPostItem
          key={index}
          id={post.id}
          category={post.category}
          title={post.title}
          content={post.content}
          createdAt={post.createdAt}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          scrapeCount={post.scrapeCount}
          bgColor={bgColor}
        />
      ))}
    </div>
  );
};

export default PopularPostList;
