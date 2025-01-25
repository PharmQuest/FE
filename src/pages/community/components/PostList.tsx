
import PostItem from "./PostItem";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import PageNavigator from "./PageNavigator";
import { useRouter } from "next/router";

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

const PostList: React.FC<{category?: string, isHiddenPage?: boolean }> = ({ category = "ALL", isHiddenPage = true}) => {

  const router = useRouter();
  const page = router.query.page ? parseInt(router.query.page as string, 10) : 1;

  const getPosts = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/community/posts/lists`,{
      params: {
        category,
        page,
      }
    });
    return response.data;
  }

  const {data} = useQuery(
    {
      queryKey: ['posts', category, page],
      queryFn: getPosts,
      placeholderData: keepPreviousData,
    },
  );

  const postList = router.pathname === '/community' ? data?.result?.postList.slice(0, 10) : data?.result?.postList
      

  return (
    <div className="flex flex-col">
      <div className="py-3 grid grid-cols-[1fr_7fr_6fr] gap-2 justify-items-center text-subhead1-sb text-gray-500 border-b border-solid border-gray-300">
        <p className={`w-16 text-center`}>주제</p>
        <p>제목</p>
        <div className="grid grid-cols-[7fr_7fr_4fr_4fr_5fr] text-center w-full">
          <p>작성자</p>
          <p>등록일</p>
          <p>추천</p>
          <p>댓글</p>
          <p>스크랩</p>
        </div>
      </div>
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
      <PageNavigator totalPage={data?.result?.totalPage} isFirst={data?.result?.isFirst} isLast={data?.result?.isLast} isHiddenPage={isHiddenPage}/>
    </div>
  );
};

export default PostList;
