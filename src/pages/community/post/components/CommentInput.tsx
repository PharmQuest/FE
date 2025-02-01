import React, { useState } from "react";
import TextButton from "../../components/TextButton";
import axiosInstance from "@/apis/axios-instance";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const CommentInput = ({
  replyParentId,
  userName,
}: {
  replyParentId?: number;
  userName?: string;
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
      queryClient.invalidateQueries({ queryKey: ["post", Number(postId)] });
    } catch (error) {
      console.log(error);
    }
  };

  const [content, setContent] = useState<string>(
    userName ? `@${userName} ` : ""
  );

  return (
    <form
      action={handleClick}
      className="flex flex-col gap-2 w-full pt-2 pb-3 pr-3 pl-4 rounded border border-solid border-gray-200 bg-white"
    >
      <p className="text-subhead1-sb text-gray-600">닉네임닉네임</p>
      <input
        placeholder="댓글을 남겨보세요."
        className="text-body1-r text-gray-600 placeholder-gray-300 focus:outline-none"
        value={content}
        maxLength={600}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex flex-row gap-3 justify-end">
        <span className="text-body1-r text-gray-300">{content.length}/600</span>
        <TextButton
          text="등록"
          onClick={handleClick}
          color={content.length > 0 ? "green" : "gray"}
        />
      </div>
    </form>
  );
};

export default CommentInput;
