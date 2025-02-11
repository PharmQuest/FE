import { format } from "date-fns";
import { useRouter } from "next/router";
import React from "react";

interface MyNotificationItemProps {
  postId: number;
  postTitle: string;
  commentWriter: string;
  commentContent: string;
  createdAt: string;
}

const MyNotificationItem: React.FC<MyNotificationItemProps> = ({
  postId,
  postTitle,
  commentWriter,
  commentContent,
  createdAt,
}) => {

  const router = useRouter();

  const date = new Date(createdAt);
  const formattedDate = isNaN(date.getTime()) ? "not date" : format(date, "yyyy.MM.dd")

  return (
    <div 
      className="py-3 pr-3 flex flex-row justify-between border-b border-solid border-gray-100 cursor-pointer"
      onClick={() => router.push(`/community/post/${postId}`)}>
      <div className="flex flex-row gap-2 items-start">
        <div className="flex flex-col gap-1">
          <p className="lg:text-body1-r text-body2-r text-gray-500">
            {commentWriter} : {commentContent}
          </p>
          <p className="lg:text-body1-r lg:mt-1 text-m-caption1-r text-gray-200">
            [{postTitle}]
          </p>
          <p className="lg:hidden mt-2 text-m-caption1-r text-gray-300">
            {formattedDate}
          </p>
        </div>
      </div>
      <div className="max-lg:hidden">
        <p className="text-body2-r text-gray-300 ml-4">{formattedDate}</p>
      </div>
    </div>
  );
};

export default MyNotificationItem;
