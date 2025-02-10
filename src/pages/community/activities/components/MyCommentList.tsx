import React, { Dispatch, useEffect } from "react";
import MyCommentItem from "./MyCommentItem";
import TextButton from "../../components/TextButton";
import { axiosInstance } from "@/apis/axios-instance";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckBoxIcon, CheckBoxOnIcon } from "@public/svgs";
import useModalStore from "@/store/useModalStore";
import PageNavigator from "../../components/PageNavigator";

interface Comment {
  postId: number;
  commentId: number;
  title: string;
  content: string;
  createdAt: string;
}

interface MyList {
  id: number;
  isSelected: boolean;
}

interface MyCommentListProp {
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>
  myList: MyList[];
  setMyList: React.Dispatch<React.SetStateAction<MyList[]>>
  isAllSelected: boolean;
  selectedIds: number[];
}

const MyCommentList: React.FC<MyCommentListProp> = ({
  page = 1,
  setPage,
  myList = [],
  setMyList = () => { },
  isAllSelected,
  selectedIds,
}) => {

  const {
    setNoticeModalText,
    setIsNoticeModalOpen,
  } = useModalStore();

  const queryClient = useQueryClient();

  const getMyComments = async () => {
    try {
      const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DOMAIN}/mypage/activities/comments`, {
        params: {
          page,
        }
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  const handleCheckbox = (commentId: number) => {
    setMyList((prev) =>
      prev.map((item) =>
        item.id === commentId ? { ...item, isSelected: !item.isSelected } : item
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

  const handleDeleteComment = async () => {
    if (selectedIds && selectedIds?.length > 0) {
      try {
        const response = await axiosInstance.patch(`${process.env.NEXT_PUBLIC_DOMAIN}/community/comments/delete`,
          null,
          {
            params: {
              commentIds: selectedIds
            },
            paramsSerializer: (params) => {
              return new URLSearchParams(params).toString();
            }
          })
        console.log(response)
        queryClient.invalidateQueries({ queryKey: ['myComments', page] })
        setNoticeModalText(`${selectedIds?.length}개의 댓글을 삭제하였습니다.`)
        setIsNoticeModalOpen(true);
      } catch (e) {
        console.log(e)
      }
    }
  }

  const { data } = useQuery({
    queryKey: ["myComments", page],
    queryFn: getMyComments,
    placeholderData: keepPreviousData,
    retry: 0,
  })

  const commentList = data?.result?.content;

  useEffect(() => {
    setMyList(commentList?.map((comment: Comment) => ({
      id: comment.commentId,
      isSelected: false,
    })))
  }, [commentList])

  return (
    <div className="flex flex-col">
      <div className="max-lg:hidden flex justify-between items-center py-3 px-4 border-b border-solid border-gray-300 text-subhead1-sb text-gray-500">
        <p className="flex-1 text-right">댓글</p>
        <p className="flex-1 text-right">등록일</p>
      </div>

      <div className="lg:hidden flex py-4">
        <TextButton text="댓글 편집" color="white" />
      </div>

      {commentList?.map((comment: Comment, index: number) => {
        return (
          <div key={index} className={`flex gap-2`}>
            <div onClick={() => handleCheckbox(comment.commentId)} className={`mt-3`}>
              <CheckBoxIcon className={`w-6 mb-0.5 ${myList[index]?.isSelected ? `hidden` : ``}`} />
              <CheckBoxOnIcon className={`w-6 mb-0.5 ${!myList[index]?.isSelected ? `hidden` : ``}`} />
            </div>
            <div className={`grow`}>
              <MyCommentItem
                key={comment.commentId}
                postId={comment.postId}
                commentId={comment.commentId}
                content={comment.content}
                title={comment.title}
                createdAt={comment.createdAt}
              />
            </div>
          </div>
        );
      })}
      <div className={`lg:flex justify-between mt-3 hidden`}>
        <div className={`flex gap-3 text-subhead1-sb text-gray-300`}>
          <div onClick={handleAllCheckbox}>
            <CheckBoxIcon className={`w-6 mb-0.5 ${isAllSelected && `hidden`}`} />
            <CheckBoxOnIcon className={`w-6 mb-0.5 ${!isAllSelected && `hidden`}`} />
          </div>
          전체 선택
        </div>
        <button
          className={`px-3 py-1 rounded text-subhead2-sb text-gray-400 bg-gray-100`}
          onClick={handleDeleteComment}>
          삭제
        </button>
      </div>
      <div className={`lg:mt-12 mt-8`}>
        <PageNavigator page={page} totalPage={data?.result?.totalPages} isFirst={data?.result?.first} isLast={data?.result?.last} setPage={setPage} />
      </div>
    </div>
  );
};

export default MyCommentList;
