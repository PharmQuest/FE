import CommentInput from "../components/CommentInput";
import ViewPost from "../components/ViewPost";
import CommentList from "../components/CommentList";
import PostList from "../../components/PostList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/apis/axios-instance";
import { ArrowRightIcon } from "@public/svgs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useModalStore from "@/store/useModalStore";
import { AxiosError } from "axios";
import useFormatCategory from "@/hooks/community/useFormatCategory";
import useAuthStore from "@/store/useAuthStore";

export default function Post() {
  const params = useParams() || {};
  const postId = Number(params.postId) || null;
  const router = useRouter();

  const [commentPage, setCommentPage] = useState(1);
  const formatCategory = useFormatCategory()

  const { isLoggedIn } = useAuthStore();

  const {
    setNoticeModalText,
    setIsNoticeModalOpen,
  } = useModalStore();

  const { data, error } = useQuery(
    {
      queryKey: ["post", postId, commentPage],
      queryFn: async () => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DOMAIN}/community/posts/${postId}?page=${commentPage}`)
        return response.data;
      },
      placeholderData: keepPreviousData,
      enabled: !!postId,
      retry: 0,
    },
  );

  const postItem = data?.result

  useEffect(() => {
    console.log(isLoggedIn)
    if(!isLoggedIn){
      router.replace("/login");
    }
  }, [])

  useEffect(() => {
    const axiosError = error as AxiosError<{ code?: string }>
    if (axiosError?.response?.data.code === "POST4005") {
      setNoticeModalText("존재하지 않는 게시글입니다.");
      setIsNoticeModalOpen(true);
      router.push("/community")
    }
  }, [error])

  return (
    isLoggedIn &&
    <>
      <div
        className="
          lg:max-w-[900px] lg:mx-auto
          md:max-w-[600px] md:mx-auto
          flex flex-col relative">
        <ViewPost
          isBestPost={postItem?.isBestPost}
          category={postItem?.category}
          title={postItem?.title}
          userName={postItem?.userName}
          createdAt={postItem?.createdAt}
          content={postItem?.content}
          likeCount={postItem?.likeCount || 0}
          commentCount={postItem?.commentCount}
          scrapeCount={postItem?.scrapeCount || 0}
          isLiked={postItem?.isLiked}
          isScraped={postItem?.isScraped}
          isOwnPost={postItem?.isOwnPost}
          imageUrl={postItem?.imageUrl}
          commentPage={postItem?.commentPage}
        />
        <div className={`flex flex-col gap-5`}>
          <CommentInput />
          <CommentList
            postUserId={postItem?.userId}
            comments={postItem?.comments}
            totalPage={postItem?.totalPage}
            isFirst={postItem?.isFirst}
            isLast={postItem?.isLast}
            commentPage={commentPage}
            setCommentPage={setCommentPage} />
        </div>
        <div className="md:mx-0 mx-5 flex flex-col mt-[60px] mb-[70px]">
          <div className={`flex justify-between`}>
            <p
              className="
                lg:text-display2-b
                flex items-center gap-2 text-m-headline1-b text-gray-600 mb-3">
              같은 주제 게시글
              <ArrowRightIcon
                  className={`
                    lg:hidden
                    content-center mb-0.5 h-3`}
                  onClick={() => router.push('/community/posts')} />
            </p>
            <p
              className={`
                lg:flex
                hidden text-gray-400 text-subhead1-sb items-center gap-2 cursor-pointer mr-3`}
              onClick={() => router.push({
                pathname: '/community/posts',
                query: { category: formatCategory(postItem?.category) }
              })}>
              더보기
              <ArrowRightIcon className={`content-center mb-0.5 h-2.5`} />
            </p>
          </div>
          <PostList category={formatCategory(postItem?.category)} postLimit={10} isPageHidden={true} />
        </div>
      </div>
    </>
  );
}
