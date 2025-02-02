import React, { Dispatch, SetStateAction, useState } from "react";
import CommentItem from "./CommentItem";
import PageNavigator from "../../components/PageNavigator";

interface Reply {
  commentId: number;
  content: string;
  userId: number;
  userName: string;
  createdAt: string;
  parentId: number;
  parentName: string;
  replies: Reply[];
}

interface Comment {
  commentId: number;
  content: string;
  userId: number;
  userName: string;
  createdAt: string;
  parentId: number | null;
  parentName: string | null;
  replies: Reply[];
}

interface CommentListProps {
  postUserId: number;
  comments: Comment[];
  totalPage: number;
  isFirst: boolean;
  isLast: boolean;
  commentPage: number;
  setCommentPage: Dispatch<SetStateAction<number>>;
}

const CommentList: React.FC<CommentListProps> = ({
  postUserId,
  comments,
  totalPage,
  isFirst,
  isLast,
  commentPage,
  setCommentPage,
}) => {

  const [replyParentId, setReplyParentId] = useState<number | null>(null);

  return (
    comments?.length > 0 &&
    <div className={`md:p-0 p-5`}>
      <div className="md:p-5 py-3 flex flex-col bg-gray-50 gap-5">
        {comments?.map((comment) => (
          <CommentItem
            key={comment.commentId}
            postUserId={postUserId}
            commentId={comment.commentId}
            content={comment.content}
            userId={comment.userId}
            userName={comment.userName}
            createdAt={comment.createdAt}
            replies={comment.replies}
            replyParentId={replyParentId}
            setReplyParentId={setReplyParentId} />
        ))}

        <PageNavigator page={commentPage} setPage={setCommentPage} totalPage={totalPage} isFirst={isFirst} isLast={isLast} />
      </div>
    </div>
  );
};

export default CommentList;
