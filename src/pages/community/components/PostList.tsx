
import PostItem from "./PostItem";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PageNavigator from "./PageNavigator";
import SkeletonList from "./SkeletonList";
import { Dispatch, SetStateAction } from "react";
import MobilePostItem from "./MobilePostItem";
import { axiosInstance } from "@/apis/axios-instance";

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
  isBestPost: boolean;
}

interface PostListProps {
  page?: number;
  setPage?: Dispatch<SetStateAction<number>> | null;
  category?: string;
  isPageHidden?: boolean;
  postLimit?: number;
  isSearch?: boolean;
  keyword?: string;
  country?: string;
  setPostsCount?: Dispatch<SetStateAction<number | null>> | null;
}

const PostList: React.FC<PostListProps> = ({ page = 1, setPage = null, category = "ALL", isPageHidden = false, postLimit, isSearch = false, keyword, country, setPostsCount }) => {

  const getPosts = async () => {
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DOMAIN}/community/posts/lists`, {
      params: {
        category,
        page,
      }
    });
    return response.data;
  }

  const searchPosts = async () => {
    try{
      const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DOMAIN}/community/search`, {
        params: {
          keyword,
          country,
          category,
          page,
        }
      });
      if (setPostsCount)
        setPostsCount(response?.data?.result?.totalElements)
  
      return response.data;
    } catch (e){
      const error = e as {response?: {data?: {message?: string}}};

      if (error?.response?.data?.message === "해당하는 게시글이 존재하지 않습니다."){
        if(setPostsCount)
          setPostsCount(0);
      }
      return { result: { postList: [], totalElements: 0, totalPage: 1, isFirst: true, isLast: true } };
    }
  }

  const { data, isPending, isError } = useQuery(
    {
      queryKey: isSearch ? ['searchPosts', keyword, country, category, page] : ['posts', category, page],
      queryFn: isSearch ? searchPosts : getPosts,
      placeholderData: keepPreviousData,
      retry: 0,
    },
  );

  const postList = postLimit ? data?.result?.postList.slice(0, postLimit) : data?.result?.postList

  return (
    <>
      {/* 웹 뷰 */}
      <div className="lg:grid py-3 hidden grid-cols-[1fr_7fr_6fr] gap-2 justify-items-center text-subhead1-sb text-gray-500 border-b border-solid border-gray-300">
        <p className={`w-16 text-center`}>주제</p>
        <p>제목</p>
        <div className="grid grid-flow-col gap-5 justify-items-center text-center w-full">
          <p className={`w-[73px] truncate`}>작성자</p>
          <p className={`w-[73px] truncate`}>등록일</p>
          <div className={`flex gap-5`}>
            <p className={`w-[36px] truncate`}>추천</p>
            <p className={`w-[36px] truncate`}>댓글</p>
            <p className={`w-[42px] truncate`}>스크랩</p>
          </div>
        </div>
      </div>
      <div className={`hidden lg:block`}>
        {isPending ? (
          <SkeletonList listNum={postLimit || 20} />
        ) : (
          isError ? (
            <>
            </>
          ) : (
            <>
              {postList?.map((post: Post, index: number) => (
                <PostItem
                  key={index}
                  postId={post.postId}
                  userName={post.userName}
                  title={post.title}
                  category={post.category}
                  scrapeCount={post.scrapeCount}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount || 0}
                  createdAt={post.createdAt}
                  isBestPost={post.isBestPost}
                />
              ))}
              {!isPageHidden &&
                <PageNavigator className={`mt-12`} page={page} totalPage={data?.result?.totalPage} isFirst={data?.result?.isFirst} isLast={data?.result?.isLast} setPage={setPage} />
              }
            </>
          )

        )}
      </div>


      {/* 모바일 뷰 */}
      <div className={`
        lg:max-w-[900px] lg:hidden 
        md:max-w-[600px]
        flex flex-col w-full`}>
        {postList?.map((post: Post, index: number) => (
          <MobilePostItem
            key={index}
            postId={post.postId}
            userName={post.userName}
            title={post.title}
            content={post.content}
            category={post.category}
            scrapeCount={post.scrapeCount}
            likeCount={post.likeCount}
            commentCount={post.commentCount || 0}
            createdAt={post.createdAt}
            isBestPost={post.isBestPost}
          />
        ))}
        {!isPageHidden &&
          <PageNavigator className={`mt-12`} page={page} totalPage={data?.result?.totalPage} isFirst={data?.result?.isFirst} isLast={data?.result?.isLast} setPage={setPage} />
        }
      </div>
    </>
  );
};

export default PostList;
