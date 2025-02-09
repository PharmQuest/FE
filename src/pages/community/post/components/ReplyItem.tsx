import {
  CommentIcon,
  CornerDownRightIcon,
  KebabIcon,
  LikeIcon,
} from "@public/svgs";
import Tag from "../../components/Tag";
import CommentInput from "./CommentInput";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import useUserCount from "@/hooks/community/useUserCount";
import CommentMenu from "./CommentMenu";
import { useEffect, useState } from "react";

interface ReplyItemProps {
  postUserId: number;
  commentId: number;
  content: string;
  userId: number;
  userName: string;
  createdAt: string;
  parentId: number;
  parentName: string;
  replyParentId: number | null;
  setReplyParentId: React.Dispatch<React.SetStateAction<number | null>>;
  isLiked: boolean;
  likeCount: number;
  commentPage: number;
  isOwnComment: boolean;
}

const ReplyItem: React.FC<ReplyItemProps> = ({
  postUserId,
  commentId,
  content,
  userId,
  userName,
  createdAt,
  // eslint-disable-next-line
  parentId,
  parentName,
  replyParentId,
  setReplyParentId,
  isLiked,
  likeCount,
  commentPage,
  isOwnComment,
}) => {

  const params = useParams();
  const postId = Number(params?.postId) || null;

  const {
    isOn: isReplyLike,
    onCount: replyLikeCount,
    handleOn: handleLike
  } = useUserCount(
    `${process.env.NEXT_PUBLIC_DOMAIN}/community/comments/${commentId}/likes`,
    ["post", postId, commentPage],
    isLiked,
    likeCount,
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  })

  const date = new Date(createdAt);
  const formattedDate = isNaN(date.getTime()) ? "not date" : format(date, "yyyy.MM.dd")

  return (
    <div>
      <div className="md:pl-10 flex flex-col gap-2 pl-4 pr-3 pb-5 border-b border-solid border-gray-100">
        <div className="flex flex-row justify-between">
          <div className="
              lg:text-subhead1-sb
              text-m-subhead1-sb flex flex-row gap-1">
            <CornerDownRightIcon />
            <p>{userName}</p>
            {postUserId !== userId && <Tag variant="writer" className={`lg:text-subhead3-sb text-m-subhead2-sb`} />}
          </div>
          <div className={`relative cursor-pointer`}>
            <KebabIcon className={`lg:h-[22px] h-[20px]`} onClick={(e: MouseEvent) => { handleMenu(e) }} />
            <CommentMenu commentId={commentId} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isOwnComment={isOwnComment} />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <p
            className="
              lg:text-subhead1-sb
              text-m-subhead1-sb text-secondary-500">@{parentName}</p>
          <p
            className="
              lg:text-body1-r
              text-m-body2-r  text-gray-500">{content}</p>
        </div>

        <div className="flex flex-row justify-between text-body2-r text-gray-400">
          <p>{formattedDate}</p>
          <div className="flex flex-row gap-[10px]">
            <div className="flex flex-row">
              <LikeIcon
                fill={isReplyLike ? "#FF8686" : "none"}
                className={`w-5 cursor-pointer mr-[2px] ${isReplyLike && `text-[#FF8686]`}`}
                onClick={() => handleLike()} />
              {replyLikeCount}
            </div>
            <div
              className="flex flex-row cursor-pointer gap-0.5"
              onClick={() => setReplyParentId(commentId)}>
              <CommentIcon className={`w-5 text-gray-400`} /> 답글 달기
            </div>
          </div>
        </div>
        {replyParentId === commentId &&
          <CommentInput replyParentId={commentId} userName={userName} setReplyParentId={setReplyParentId}/>
        }
      </div>
    </div>
  );
};

export default ReplyItem;