/* eslint-disable */

import { format } from "date-fns";
import React from "react";

interface MyCommentItemProps {
  postId: number;
  commentId: number;
  content: string;
  title: string;
  createdAt: string;
}

const MyCommentItem: React.FC<MyCommentItemProps> = ({
  postId,
  commentId,
  title,
  content,
  createdAt,
}) => {

  const date = new Date(createdAt);
  const formattedDate = isNaN(date.getTime()) ? "not date" : format(date, "yyyy.MM.dd")

  return (
    <div className="lg:py-3 py-4 pr-3 flex flex-row justify-between">
      <div className="flex flex-row gap-2 items-start">
        <div className="flex flex-col gap-1">
          <p className="lg:text-body1-r text-body2-r text-gray-500 line-clamp-2">
            {content}
          </p>
          <p className="lg:text-body1-r lg:mt-1 text-m-caption1-r text-gray-200">
            [{title}]
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

export default MyCommentItem;
