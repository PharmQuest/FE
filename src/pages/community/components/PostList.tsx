
import PostItem from "./PostItem";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import PageNavigator from "./PageNavigator";
import SkeletonList from "./SkeletonList";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MobilePostItem from "./MobilePostItem";
import { axiosInstance } from "@/apis/axios-instance";
import { CheckBoxIcon, CheckBoxOnIcon } from "@public/svgs";
import useModalStore from "@/store/useModalStore";
import useFormatCategory from "@/hooks/community/useFormatCategory";

interface Post {
  postId: number;
  userName: string;
  writerName: string;
  title: string;
  content: string;
  category: string;
  scrapeCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  isBestPost: boolean;
}

interface MyList {
  id: number;
  isSelected: boolean;
}

interface PostListProps {
  page?: number;
  setPage?: Dispatch<SetStateAction<number>> | null;
  category?: string;
  isPageHidden?: boolean;
  postLimit?: number;

  // 검색 리스트 Props
  isSearchPage?: boolean;
  keyword?: string;
  country?: string;
  setPostsCount?: Dispatch<SetStateAction<number | null>> | null;

  // 나의 활동 게시글 리스트 Props
  isMyPostPage?: boolean;
  isMyScrapPage?: boolean;
  myList?: MyList[];
  setMyList?: React.Dispatch<React.SetStateAction<MyList[]>>
  isAllSelected?: boolean;
  selectedIds?: number[];
}

const PostList: React.FC<PostListProps> = ({
  page = 1,
  setPage = null,
  category = "ALL",
  isPageHidden = false,
  postLimit,

  // 검색 리스트 Props
  isSearchPage = false,
  keyword,
  country,
  setPostsCount,

  // 나의 활동 리스트 Props
  isMyPostPage = false,
  isMyScrapPage = false,
  myList = [],
  setMyList = () => { },
  isAllSelected,
  selectedIds,
}) => {

  const queryClient = useQueryClient();
  const { unformatCategory } = useFormatCategory();

  const {
    setIsNoticeModalOpen,
    setNoticeModalText,
  } = useModalStore();

  const [isOnEdit, setIsOnEdit] = useState(false);
  const [isOnTrigger, setIsOnTrigger] = useState(false);

  const getPosts = async () => {
    try {
      const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DOMAIN}/community/posts/lists`, {
        params: {
          category,
          page,
        }
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  const searchPosts = async () => {
    try {
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
    } catch (e) {
      const error = e as { response?: { data?: { message?: string } } };

      if (error?.response?.data?.message === "해당하는 게시글이 존재하지 않습니다.") {
        if (setPostsCount)
          setPostsCount(0);
      }
      return { result: { postList: [], totalElements: 0, totalPage: 1, isFirst: true, isLast: true } };
    }
  }

  const getMyPosts = async () => {
    try {
      const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DOMAIN}/mypage/activities/post?page=${page}`)

      return response.data;
    } catch (e) {
      console.log(e)
    }
  }

  const getMyScraps = async () => {
    try {
      const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DOMAIN}/mypage/activities/scrap?page=${page}`)

      return response.data;
    } catch (e) {
      console.log(e)
    }
  }

  const handleCheckbox = (postId: number) => {
    setMyList((prev) =>
      prev.map((item) =>
        item.id === postId ? { ...item, isSelected: !item.isSelected } : item
      )
    )
  }

  const handleAllCheckbox = () => {
    setMyList((prev) =>
      prev.map((item) => (
        { ...item, isSelected: !isAllSelected }
      ))
    )
  }

  const handleDeletePosts = async () => {
    if (selectedIds && selectedIds?.length > 0) {
      try {
        await axiosInstance.delete(`${process.env.NEXT_PUBLIC_DOMAIN}/community/posts`, {
          params: {
            postIds: selectedIds
          },
          paramsSerializer: (params) => {
            return new URLSearchParams(params).toString();
          }
        })
        queryClient.invalidateQueries({ queryKey: ['myPosts', page] })
        setNoticeModalText(`${selectedIds?.length}개의 게시글을 삭제하였습니다.`)
        setIsNoticeModalOpen(true);
      } catch (e) {
        console.log(e)
      }
    }
  }

  const handleUnscrapPosts = async () => {
    if (selectedIds && selectedIds?.length > 0) {
      try {
        await axiosInstance.delete(`${process.env.NEXT_PUBLIC_DOMAIN}/community/posts/scraps`, {
          params: {
            postIds: selectedIds
          },
          paramsSerializer: (params) => {
            return new URLSearchParams(params).toString();
          }
        })
        queryClient.invalidateQueries({ queryKey: ['myScraps', page] })
        setNoticeModalText(`${selectedIds?.length}개의 스크랩을 취소하였습니다.`)
        setIsNoticeModalOpen(true);
      } catch (e) {
        console.log(e)
      }
    }
  }

  const handleUnscrapPost = async (postId: number) => {
    try {
      await axiosInstance.delete(`${process.env.NEXT_PUBLIC_DOMAIN}/community/posts/scraps`, {
        params: {
          postIds: postId
        },
      })
      queryClient.invalidateQueries({ queryKey: ['myScraps', page] })
      setNoticeModalText(`1개의 스크랩을 취소하였습니다.`)
      setIsNoticeModalOpen(true);
    } catch (e) {
      console.log(e)
    }
  }

  const unscrapAllPost = () => {
    handleAllCheckbox();
    setIsOnTrigger(true);
  }

  const { data, isPending, isError } = useQuery(
    {
      queryKey:
        isSearchPage
          ? ['searchPosts', keyword, country, category, page]
          : isMyPostPage
            ? ['myPosts', page]
            : isMyScrapPage
              ? ['myScraps', page]
              : ['posts', category, page],
      queryFn:
        isSearchPage
          ? searchPosts
          : isMyPostPage
            ? getMyPosts
            : isMyScrapPage
              ? getMyScraps
              : getPosts,
      placeholderData: keepPreviousData,
      retry: 0,
    },
  );

  const content = data?.result?.postList || data?.result?.content;
  const postList = postLimit ? content?.slice(0, postLimit) : content

  useEffect(() => {
    const unscrapAll = () => {
      handleUnscrapPosts();
      setIsOnTrigger(false);
    }

    if (isOnTrigger && isAllSelected)
      unscrapAll();

  }, [isOnTrigger, isAllSelected])

  useEffect(() => {
    const list = postList?.map((post: Post) => ({
      id: post.postId,
      isSelected: false,
    }))
    setMyList(list);
  }, [postList]);

  console.log(postList)
  return (
    <>
      {/* 웹 뷰 */}
      {!isPending && postList?.length === 0 ? (
        <div className={`
          lg:text-headline-m
          min-h-full text-gray-300 text-center m-auto grow content-center`}>
          {isMyPostPage && <p>작성한 게시글이 없어요.<br/>커뮤니티에 게시글을 남겨보세요!</p>}
          {isMyScrapPage && <p>스크랩한 게시글이 없어요.<br/>커뮤니티에서 게시글을 스크랩해보세요!</p>}
        </div>
      ) : (
        <>
          <div className={`${(isMyPostPage || isMyScrapPage) && `lg:pl-8`} lg:grid py-3 hidden grid-cols-[1fr_7fr_6fr] gap-2 justify-items-center text-subhead1-sb text-gray-500 border-b border-solid border-gray-300`}>
            <p className={`w-16 text-center`}>주제</p>
            <p>제목</p>
            <div className="grid grid-flow-col gap-5 justify-items-center text-center w-full">
              <p className={`w-[73px] truncate`}>{!isMyPostPage && "작성자"}</p>
              <p className={`w-[73px] truncate`}>등록일</p>
              <div className={`flex gap-5`}>
                <p className={`w-[36px] truncate`}>추천</p>
                <p className={`w-[36px] truncate`}>댓글</p>
                <p className={`w-[42px] truncate`}>스크랩</p>
              </div>
            </div>
          </div >
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
                    <div key={index} className={`flex gap-2 items-center`}>
                      {(isMyPostPage || isMyScrapPage) &&
                        <div onClick={() => handleCheckbox(post.postId)}>
                          <CheckBoxIcon className={`w-6 mb-0.5 ${myList[index]?.isSelected && `hidden`}`} />
                          <CheckBoxOnIcon className={`w-6 mb-0.5 ${!myList[index]?.isSelected && `hidden`}`} />
                        </div>
                      }
                      <PostItem
                        postId={post.postId}
                        userName={post.userName || post.writerName}
                        title={post.title}
                        category={unformatCategory(post.category)}
                        scrapeCount={post.scrapeCount}
                        likeCount={post.likeCount}
                        commentCount={post.commentCount || 0}
                        createdAt={post.createdAt}
                        isBestPost={post.isBestPost}
                      />
                    </div>
                  ))}
                  {(isMyPostPage || isMyScrapPage) &&
                    <div className={`flex justify-between mt-3`}>
                      <div className={`flex gap-3 text-subhead1-sb text-gray-300`}>
                        <div onClick={handleAllCheckbox}>
                          <CheckBoxIcon className={`w-6 mb-0.5 ${isAllSelected && `hidden`}`} />
                          <CheckBoxOnIcon className={`w-6 mb-0.5 ${!isAllSelected && `hidden`}`} />
                        </div>
                        전체 선택
                      </div>
                      <button
                        className={`px-3 py-1 rounded text-subhead2-sb text-gray-400 bg-gray-100`}
                        onClick={isMyPostPage ? handleDeletePosts : handleUnscrapPosts}>
                        {isMyPostPage ? `삭제` : `스크랩 취소`}
                      </button>
                    </div>
                  }
                  {!isPageHidden &&
                    <PageNavigator
                      className={`mt-12`}
                      page={page}
                      totalPage={data?.result?.totalPage || data?.result?.totalPages}
                      isFirst={data?.result?.isFirst || data?.result?.first}
                      isLast={data?.result?.isLast || data?.result?.last}
                      setPage={setPage} />
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
            {(isMyPostPage || isMyScrapPage) &&
              <div className={`mt-4 flex justify-between`}>
                {isOnEdit ? (
                  <>
                    <button
                      className={`rounded text-m-subhead2-sb text-gray-400 px-3 py-2 border border-solid border-gray-100`}
                      onClick={() => setIsOnEdit(!isOnEdit)}>
                      편집 완료
                    </button>
                    <button
                      className={`rounded text-m-subhead2-sb text-gray-400 px-3 py-2 bg-gray-100`}
                      onClick={
                        isMyPostPage ?
                          () => { } :
                          unscrapAllPost}>
                      {isMyPostPage ? `전체 삭제` : `전체 스크랩 취소`}
                    </button>
                  </>
                ) : (
                  <button
                    className={`rounded text-m-subhead2-sb text-gray-400 px-3 py-2 border border-solid border-gray-100`}
                    onClick={() => setIsOnEdit(!isOnEdit)}>
                    {isMyPostPage ? `게시글 편집` : `스크랩 편집`}
                  </button>
                )}

              </div>
            }
            {postList?.map((post: Post, index: number) => (
              <div
                key={index}
                className={`flex items-center gap-3 w-full border-b border-solid border-gray-100`}>
                <div className={`grow overflow-hidden`}>
                  <MobilePostItem
                    key={index}
                    postId={post.postId}
                    userName={post.userName || post.writerName}
                    title={post.title}
                    content={post.content}
                    category={unformatCategory(post.category)}
                    scrapeCount={post.scrapeCount}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount || 0}
                    createdAt={post.createdAt}
                    isBestPost={post.isBestPost}
                  />
                </div>
                {isOnEdit &&
                  <button
                    className={`min-w-[45px] w-[45px] h-[26px] rounded text-m-subhead2-sb text-gray-400 px-3 py-1 bg-gray-100`}
                    onClick={() => handleUnscrapPost(post.postId)}>
                    {isMyPostPage ? `삭제` : `취소`}
                  </button>
                }
              </div>
            ))}
            {!isPageHidden &&
              <PageNavigator
                className={`mt-12`}
                page={page}
                totalPage={data?.result?.totalPage || data?.result?.totalPages}
                isFirst={data?.result?.isFirst || data?.result?.first}
                isLast={data?.result?.isLast || data?.result?.last}
                setPage={setPage} />
            }
          </div>
        </>
        )
      }
    </>
  );
};

export default PostList;
