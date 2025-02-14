import React from "react";
import PopularPostItem from "./PopularPostItem";
import PopularSkeletonList from "./PopularSkeletonList";

interface Post {
  postId: number;
  userName: string;
  title: string;
  content: string;
  category: string;
  scrapeCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

interface PopularPostListProps {
  posts: Post[];
  bgColor?: string;
  gap?: boolean;
  isPending: boolean;
  listNum: number;
}

const PopularPostList: React.FC<PopularPostListProps> = ({ posts, bgColor = "white", gap = false, isPending, listNum }) => {
  return (
    isPending ? (
      <PopularSkeletonList listNum={listNum} />
    ) : (
      <div
        className={`
        lg:max-w-[900px]
        md:max-w-[600px]
        grid grid-cols-1 w-full max-w-full ${gap && `lg:gap-3 gap-2`
          }`}>
        {posts?.map((post, index) => (
          <PopularPostItem
            key={index}
            postId={post.postId}
            userName={post.userName}
            title={post.title}
            content={post.content}
            category={post.category}
            scrapeCount={post.scrapeCount}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            createdAt={post.createdAt}
            bgColor={bgColor}
          />
        ))}
      </div>
    )
  );
};

export default PopularPostList;
