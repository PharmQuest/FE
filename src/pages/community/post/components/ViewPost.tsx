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

interface ViewPostProps {
  subject: string;
  title: string;
  isBest?: boolean;
  writer: string;
  date: string;
  content: string;
  likes: number;
  comments: number;
  scraps: number;
}

const ViewPost: React.FC<ViewPostProps> = ({
  isBest = false,
  subject,
  title,
  writer,
  date,
  content,
  likes,
  comments,
  scraps,
}) => {
  return (
    <div className="mt-11 mb-8">
      <div className="flex flex-row justify-between pb-4 border-b border-solid border-gray-100">
        <div className="flex flex-row gap-3">
          <SubjectTag text={subject} variant="light-big" />
          <p className="text-headline-b text-gray-500">{title}</p>
          {isBest && <Tag variant="best" />}
        </div>

        <div className="flex flex-row gap-5 text-body1-r text-gray-300">
          <p>{writer}</p> |<p>{date}</p>
        </div>
      </div>

      <div className="mt-8 mb-12 text-body1-r text-gray-500">{content}</div>

      <div className="flex flex-row justify-between text-gray-400">
        <div className="flex flex-row text-subhead1-sb items-center gap-[1px]">
          <LikeIcon /> {likes}
          <CommentIcon className="ml-3" />
          {comments}
          <ScrapIcon className="ml-3" />
          {scraps}
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
