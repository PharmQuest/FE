/* eslint-disable @typescript-eslint/no-unused-vars */

import useCommentMutation from "@/hooks/community/useCommentMutation";
import useModalStore from "@/store/useModalStore";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { MouseEvent } from "react";

interface CommentMenuProp {
  commentId: number;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOwnComment: boolean;
  setEditCommentId: React.Dispatch<React.SetStateAction<number | null>>
}

const CommentMenu: React.FC<CommentMenuProp> = ({ 
  commentId, 
  isMenuOpen, 
  setIsMenuOpen, 
  isOwnComment,
  setEditCommentId,
}) => {

  const router = useRouter();
  const postId = Number(router.query.postId);

  const {
    setNoticeModalText,
    setIsNoticeModalOpen,
    setIsReportModalOpen,
    setIsCommentReport,
    setCommentId,
  } = useModalStore();

  const mutate = useCommentMutation(postId);

  const handleModify = () => {
    setEditCommentId(commentId);
  }

  const handleDelete = async () => {
    try{
      await mutate({
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/community/comments/delete?commentIds=${commentId}`,
        type: "patch",
      })
    } catch (e) {
      console.log(e);
    }
  }

  const handleReport = (e: MouseEvent) => {
    e.stopPropagation();
    setIsCommentReport(true)
    setCommentId(commentId)
    setIsReportModalOpen(true)
    setIsMenuOpen(false)
  }

  return (
    isMenuOpen && (
      isOwnComment ? (
        <div className={`absolute right-0 top-[30px] w-[100px] px-2 shadow-custom-light bg-white text-gray-600 text-subhead1-sb rounded`}>
          <div
            className={`px-1 py-3 border-b border-solid border-gray-100`}
            onClick={() => handleModify()}>수정하기
          </div>
          <div
            className={`px-1 py-3`}
            onClick={() => handleDelete()}>삭제하기
          </div>
        </div>
      ) : (
        <div className={`absolute right-0 top-[30px] w-[96px] px-2 shadow-custom-light bg-white text-gray-600 text-subhead1-sb rounded`}>
          <div
            className={`px-1 py-3`}
            onClick={(e) => handleReport(e)}>신고하기</div>
        </div>
      )
    )
  )
}

export default CommentMenu;