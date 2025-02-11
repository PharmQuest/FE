import React, { useState } from "react";
import TextButton from "../../components/TextButton";
import { useParams } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import useCommentMutation from "@/hooks/community/useCommentMutation";

const CommentInput = ({
  replyParentId,
  parentUserName,
  setReplyParentId,
  initialContent="",
  commentId,
  isModify=false,
  setEditCommentId,
}: {
  replyParentId?: number;
  parentUserName?: string;
  setReplyParentId?: React.Dispatch<React.SetStateAction<number | null>>;
  initialContent?: string;
  commentId?: number;
  isModify?: boolean;
  setEditCommentId?: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const params = useParams() || {};
  const postId = Number(params.postId) || null;

  const { userName } = useAuthStore();


  const mutate = useCommentMutation(postId);

  const handleSubmit = async () => {
    try{
      await mutate({
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/community/posts/${postId}/comments${replyParentId ? `?parentsId=${replyParentId}` : ``}`,
        type: "post",
        body: {content}, 
      });

      setContent("");
      if(setReplyParentId){
        setReplyParentId(null)
      }

    } catch (e){
      console.log(e)
    }
  };

  const handleModify = async () => {
    try{
      await mutate({
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/community/comments/${commentId}/update`,
        type: "patch",
        body: {content},
      });
      
      if(setEditCommentId)
        setEditCommentId(null);
      setContent("");
      if(setReplyParentId){
        setReplyParentId(null)
      }

    } catch (error) {
      console.log(error);
    }
  }

  const [content, setContent] = useState<string>(initialContent);

  return (
    <div className={`md:px-0 px-5`}>
      <form
        action={handleSubmit}
        className="flex flex-col gap-2 w-full pt-3 pb-3 pr-3 pl-4 rounded border border-solid border-gray-200 bg-white">
          
        <p
          className="
            lg:text-subhead1-sb
            text-m-subhead1-sb text-gray-600">{userName}</p>
        <div className={`flex gap-2`}>
          {parentUserName && 
            <div className={`lg:text-subhead1-sb text-secondary-500 text-m-subhead1-sb`}>
              @{parentUserName}
            </div>
          }
          <textarea
            placeholder={`${parentUserName ? `` : `댓글을 남겨보세요.` }`}
            className="
            lg:text-body1-r
            w-full text-m-body2-r text-gray-600 placeholder-gray-300 focus:outline-none resize-none"
            value={content}
            maxLength={600}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3 justify-end">
          <span
            className="
              lg:text-body1-r
              self-center text-m-body2-r text-gray-300">{content.length}/600</span>
          <TextButton
            text={isModify ? "수정" : "등록"}
            onClick={isModify ? handleModify : handleSubmit}
            color={content.length > 0 ? "green" : "gray"} />
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
