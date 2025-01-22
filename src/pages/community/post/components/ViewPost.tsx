import {
  CommentIcon,
  ExternalIcon,
  LikeIcon,
  ReportIcon,
  ScrapIcon,
} from "@public/svgs";
import Tag from "../../components/Tag";
import SubjectTag from "../../components/SubjectTag";
import React from "react";
import { format } from "date-fns";

interface ViewPostProps {
  category: string;
  title: string;
  isBestPost?: boolean;
  user: string;
  createdAt: string;
  content: string;
  likeCount: number;
  comments: number;
  scrapeCount: number;
}

const ViewPost: React.FC<ViewPostProps> = ({
  isBestPost = false,
  category,
  title,
  user,
  createdAt,
  content,
  likeCount,
  comments,
  scrapeCount,
}) => {

  const date = new Date(createdAt);
    const formattedDate = isNaN(date.getTime()) ? "not date" : format(date, "yyyy.MM.dd")

  return (
    <div className="mt-11 mb-8">
      <div className="flex flex-row justify-between pb-4 border-b border-solid border-gray-100">
        <div className="flex flex-row gap-3">
          <SubjectTag text={category} variant="light-big" />
          <p className="text-headline-b text-gray-500">{title}</p>
          {isBestPost && <Tag variant="best" />}
        </div>

        <div className="flex flex-row gap-5 text-body1-r text-gray-300">
          <p>{user}</p> |<p>{formattedDate}</p>
        </div>
      </div>

      <div className="mt-8 mb-12 text-body1-r text-gray-500">{content}</div>

      <div className="flex flex-row justify-between text-gray-400">
        <div className="flex flex-row text-subhead1-sb items-center gap-0.5">
          <LikeIcon /> {likeCount}
          <CommentIcon className="ml-3" />
          {comments}
          <ScrapIcon className="ml-3" />
          {scrapeCount}
        </div>
        <div className="flex flex-row gap-1 text-subhead2-sb items-center">
          <ExternalIcon /> URL 복사
          <ReportIcon className="ml-4" /> 신고하기
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
