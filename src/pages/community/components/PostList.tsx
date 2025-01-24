
import PostItem from "./PostItem";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  user: string;
  title: string;
  content: string;
  category: string;
  scrapeCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  isBestPost: boolean;
}

const PostList: React.FC<{category?: string }> = ({ category = "ALL" }) => {

  const getPosts = async () => {
    const response = await axios.get("http://localhost:8080/community/posts/lists",{
      params: {
        category,
        page: 1,
      }
    });
    return response.data;
  }

  const {data} = useQuery(
    {
      queryKey: ['posts', category],
      queryFn: getPosts,
      placeholderData: keepPreviousData,
    },
  );

  return (
    <div className="flex flex-col">
      <div className="py-3 grid grid-cols-[1fr_7fr_6fr] gap-2 justify-items-center text-subhead1-sb text-gray-500 border-b border-solid border-gray-300">
        <p>주제</p>
        <p>제목</p>
        <div className="grid grid-cols-[7fr_7fr_4fr_4fr_5fr] text-center w-full">
          <p>작성자</p>
          <p>등록일</p>
          <p>추천</p>
          <p>댓글</p>
          <p>스크랩</p>
        </div>
      </div>
      {data?.result?.postList.map((post: Post, index: number) => (
        <PostItem
          key={index}
          id={index+1}
          // id={post.id}       id 넘겨주면 수정할 계획
          isBestPost={post.isBestPost}
          category={post.category}
          title={post.title}
          content={post.content}
          user={post.user}
          createdAt={post.createdAt}
          likeCount={post.likeCount}
          commentCount={post.commentCount || 0}
          scrapeCount={post.scrapeCount}
        />
      ))}
    </div>
  );
};

export default PostList;
