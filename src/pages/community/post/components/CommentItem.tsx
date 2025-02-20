import React, { useEffect, useState } from "react";
import { CommentIcon, KebabIcon, LikeIcon } from "@public/svgs";
import CommentInput from "./CommentInput";
import { format } from "date-fns";
import ReplyItem from "./ReplyItem";
import Tag from "../../components/Tag";
import CommentMenu from "./CommentMenu";
import useUserCount from "@/hooks/community/useUserCount";
import { useParams } from "next/navigation";

interface Reply {
  commentId: number;
  content: string;
  userId: number;
  userName: string;
  createdAt: string;
  parentId: number;
  parentName: string;
  replies: Reply[];
  isLiked: boolean;
  likeCount: number;
  isOwnComment: boolean;
  isDeleted: boolean;
}

interface CommentItemProps {
  postUserId: number;
  commentId: number;
  content: string;
  userId: number;
  userName: string;
  createdAt: string;
  replies: Reply[];
  replyParentId: number | null;
  setReplyParentId: React.Dispatch<React.SetStateAction<number | null>>;
  commentPage: number;
  isLiked: boolean;
  likeCount: number;
  isOwnComment: boolean;
  isDeleted: boolean;
  editCommentId: number | null;
  setEditCommentId: React.Dispatch<React.SetStateAction<number | null>>
}

const CommentItem: React.FC<CommentItemProps> = ({
  postUserId,
  commentId,
  content,
  userId,
  userName,
  createdAt,
  replies,
  replyParentId,
  setReplyParentId,
  commentPage,
  isLiked,
  likeCount,
  isOwnComment,
  isDeleted,
  editCommentId,
  setEditCommentId,
}) => {

  const params = useParams();
  const postId = Number(params?.postId) || null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    isOn: isCommentLike,
    onCount: CommentLikeCount,
    handleOn: handleLike
  } = useUserCount(
    `${process.env.NEXT_PUBLIC_DOMAIN}/community/comments/${commentId}/likes`,
    ["post", postId, commentPage],
    isLiked,
    likeCount,
  );

  const handleMenu = (e: MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleClickOutside = () => {
      setIsMenuOpen(false);
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [])

  const date = new Date(createdAt);
  const formattedDate = isNaN(date.getTime()) ? "not date" : format(date, "yyyy.MM.dd")

  return (
    <div className={`md:mx-0 flex flex-col gap-5 mx-3`}>
      <div className="md:px-3 flex flex-col gap-2 px-2 pb-5 border-b border-solid border-gray-100">


        {commentId === editCommentId ? (
          <CommentInput commentId={commentId} initialContent={content} isModify={true} setEditCommentId={setEditCommentId} />
        ) : (
          <>
            <div className="flex flex-row justify-between">
              <div
                className={`
              lg:text-subhead1-sb
              text-m-subhead1-sb flex gap-1 text-gray-600`}>
                {userName}
                {postUserId === userId && <Tag variant="writer" />}
              </div>
              {!isDeleted &&
                <div className={`relative cursor-pointer`}>
                  <KebabIcon className={`lg:h-[22px] h-[20px]`} onClick={(e: MouseEvent) => { handleMenu(e) }} />
                  <CommentMenu
                    commentId={commentId}
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    isOwnComment={isOwnComment}
                    setEditCommentId={setEditCommentId} />
                </div>
              }
            </div>
            {isDeleted ? (
              <p
                className="
                  lg:text-body1-r
                  text-m-body2-r text-gray-300">삭제된 댓글입니다.</p>
            ) : (
              <p
                className="
                  lg:text-body1-r
                  text-m-body2-r text-gray-500">{content}</p>
            )}

            <div className="flex flex-row justify-between text-body2-r text-gray-400">
              <p>{formattedDate}</p>

              {!isDeleted &&
                <div className="flex flex-row gap-[10px]">
                  <div className="flex flex-row">
                    <LikeIcon
                      fill={isCommentLike ? "#FF8686" : "none"}
                      className={`w-5 cursor-pointer mr-[2px] ${isCommentLike && `text-[#FF8686]`}`}
                      onClick={() => handleLike()} />
                    {CommentLikeCount}
                  </div>
                  <div
                    className="flex flex-row cursor-pointer gap-0.5"
                    onClick={() => setReplyParentId(commentId)}>
                    <CommentIcon className={`text-gray-400 w-5`} /> 답글 달기
                  </div>
                </div>
              }
            </div>

            {replyParentId === commentId &&
              <CommentInput
                replyParentId={replyParentId}
                parentUserName={userName}
                setReplyParentId={setReplyParentId} />
            }
          </>
        )}

      </div>
      {replies?.map((reply) => (
        <ReplyItem
          postUserId={postUserId}
          key={reply.commentId}
          commentId={reply.commentId}
          content={reply.content}
          userId={reply.userId}
          userName={reply.userName}
          createdAt={reply.createdAt}
          parentName={reply.parentName}
          isLiked={reply.isLiked}
          likeCount={reply.likeCount}
          commentPage={commentPage}
          replyParentId={replyParentId}
          setReplyParentId={setReplyParentId}
          isOwnComment={reply.isOwnComment}
          isDeleted={reply.isDeleted}
          editCommentId={editCommentId}
          setEditCommentId={setEditCommentId} />
      ))}
    </div>
  );
};

export default CommentItem;
