import CommentInput from "../components/CommentInput";
import ViewPost from "../components/ViewPost";
import CommentList from "../components/CommentList";
import PostList from "../../components/PostList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios from "axios";

export default function Post() {

  const params = useParams() || {};
  const postId = params.postId || null;
  const {data} = useQuery(
    {
      queryKey: ['post', postId],
      queryFn: async () => await axios.get(`http://localhost:8080/community/posts/${postId}`),
      placeholderData: keepPreviousData,
    },
  );
  
  const postItems = data?.data?.result

  return (
    <div className="flex flex-col px-[260px]">
      <ViewPost
        isBestPost={postItems?.isBestPost}
        category={postItems?.category}
        title={postItems?.title}
        user={postItems?.user}
        createdAt={postItems?.createdAt}
        content={postItems?.content}
        likeCount={postItems?.likeCount}
        comments={postItems?.comments?.length || 0}
        scrapeCount={postItems?.scrapeCount}
      />
      <CommentInput /> 
      <CommentList />
      <div className="flex flex-col mt-[60px] mb-[170px]">
        <p className="text-display2-b text-gray-600 mb-3">같은 주제 게시글</p>
        <PostList />
      </div>
    </div>
  );
}
