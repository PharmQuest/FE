
import PostItem from "./PostItem";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import PageNavigator from "./PageNavigator";
import SkeletonList from "./SkeletonList";
import { Dispatch, SetStateAction } from "react";

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
  setPage?: Dispatch<SetStateAction<number>>;
  category?: string; 
  isPageHidden?: boolean;
  postLimit?: number;
}

const PostList: React.FC<PostListProps> = ({ page = 1, setPage, category = "ALL", isPageHidden = false, postLimit }) => {

  const getPosts = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/community/posts/lists`, {
      params: {
        category,
        page,
      }
    });
    return response.data;
  }

  const { data, isPending } = useQuery(
    {
      queryKey: ['posts', category, page],
      queryFn: getPosts,
      placeholderData: keepPreviousData,
    },
  );

  const postList = postLimit ? data?.result?.postList.slice(0, postLimit) : data?.result?.postList

  return (
    <div className="flex flex-col">
      <div className="py-3 grid grid-cols-[1fr_7fr_6fr] gap-2 justify-items-center text-subhead1-sb text-gray-500 border-b border-solid border-gray-300">
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
      {isPending ? (
        <SkeletonList listNum={postLimit || 20} />
      ) : (
        <>
          {postList?.map((post: Post, index: number) => (
            <PostItem
              key={index}
              postId={post.postId}
              isBestPost={post.isBestPost}
              category={post.category}
              title={post.title}
              content={post.content}
              userName={post.userName}
              createdAt={post.createdAt}
              likeCount={post.likeCount}
              commentCount={post.commentCount || 0}
              scrapeCount={post.scrapeCount}
            />
          ))}
          {!isPageHidden &&
            <PageNavigator className={`mt-12`} page={page} totalPage={data?.result?.totalPage} isFirst={data?.result?.isFirst} isLast={data?.result?.isLast} setPage={setPage}/>
          }
        </>
      )}
    </div>
  );
};

export default PostList;
