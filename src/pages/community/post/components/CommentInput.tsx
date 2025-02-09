import React, { useState } from "react";
import TextButton from "../../components/TextButton";
import { axiosInstance } from "@/apis/axios-instance";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const CommentInput = ({
  replyParentId,
  userName,
  setReplyParentId,
}: {
  replyParentId?: number;
  userName?: string;
  setReplyParentId?: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const params = useParams() || {};
  const postId = params.postId || null;

  const queryClient = useQueryClient();

  const handleClick = async () => {
    try {
      await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/community/posts/${postId}/comments`,
        { content },
        {
          params: {
            parentsId: replyParentId,
          },
        }
      );
      setContent("");
      if(setReplyParentId){
        setReplyParentId(null)
      }
      queryClient.invalidateQueries({ queryKey: ["post", Number(postId)] });
    } catch (error) {
      console.log(error);
    }
  };

  const [content, setContent] = useState<string>("");

  return (
    <div className={`md:px-0 px-5`}>
      <form
        action={handleClick}
        className="flex flex-col gap-2 w-full pt-3 pb-3 pr-3 pl-4 rounded border border-solid border-gray-200 bg-white">
        <p
          className="
            lg:text-subhead1-sb
            text-m-subhead1-sb text-gray-600">닉네임닉네임</p>
        <div className={`flex gap-2`}>
          {userName && 
            <div className={`lg:text-subhead1-sb text-secondary-500 text-m-subhead1-sb`}>
              @{userName}
            </div>
          }
          <textarea
            placeholder={`${userName ? `` : `댓글을 남겨보세요.` }`}
            className="
            lg:text-body1-r
            w-full text-m-body2-r text-gray-600 placeholder-gray-300 focus:outline-none"
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
            text="등록"
            onClick={handleClick}
            color={content.length > 0 ? "green" : "gray"} />
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
