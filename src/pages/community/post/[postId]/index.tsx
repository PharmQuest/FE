import CommentInput from "../components/CommentInput";
import ViewPost from "../components/ViewPost";
import CommentList from "../components/CommentList";
import PostList from "../../components/PostList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axiosPOSTInstance from "../../apis/axios-instance";
import { useEffect, useState } from "react";

export default function Post() {
  const params = useParams() || {};
  const postId = params.postId || null;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 클라이언트 측에서만 실행되도록 설정
  }, []);

  const { data } = useQuery(
    {
      queryKey: ['post', postId],
      queryFn: async () => {
        const response = await axiosPOSTInstance.get(`http://localhost:8080/community/posts/${postId}`)
        return response.data;
      },
      placeholderData: keepPreviousData,
      enabled: !!postId && isClient,
    },
  );

  const postItem = data?.result

  const formattedCategory = (category: string) => {
    switch (category) {
      case "자유":
        return "FORUM";

      case "약국":
        return "PHARMACY";

      case "병원":
        return "HOSPITAL";

      case "약":
        return "MEDICATION";

      case "증상":
        return "SYMPTOM";

      case "영양제":
        return "SUPPLEMENT";

      default:

        return "ALL";
    }
  }

  return (
    <div className="flex flex-col px-[260px]">
      <ViewPost
        isBestPost={postItem?.isBestPost}
        category={postItem?.category}
        title={postItem?.title}
        user={postItem?.user}
        createdAt={postItem?.createdAt}
        content={postItem?.content}
        likeCount={postItem?.likeCount}
        comments={postItem?.comments?.length || 0}
        scrapeCount={postItem?.scrapeCount}
      />
      <CommentInput />
      <CommentList />
      <div className="flex flex-col mt-[60px] mb-[170px]">
        <p className="text-display2-b text-gray-600 mb-3">같은 주제 게시글</p>
        <PostList category={formattedCategory(postItem?.category)} />
      </div>
    </div>
  );
}
