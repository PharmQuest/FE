import {
  CommentIcon,
  KebabIcon,
  LikeIcon,
  ScrapIcon,
} from "@public/svgs";
import Tag from "../../components/Tag";
import SubjectTag from "../../components/SubjectTag";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import useStore from "@/store/useStore";

interface ViewPostProps {
  category: string;
  title: string;
  isBestPost?: boolean;
  userName: string;
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
  userName,
  createdAt,
  content,
  likeCount,
  comments,
  scrapeCount,
}) => {
  const date = new Date(createdAt);
  const formattedDate = isNaN(date.getTime()) ? "not date" : format(date, "yyyy.MM.dd")

  const [isLike, setIsLike] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const {
    setIsNoticeModalOpen,
    setModalText, 
  } = useStore((state) => state);

  const handleMenu = (e: MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLike = () => {
    setIsLike(!isLike);
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setModalText("URL이 복사되었습니다. 원하는 곳에 붙여 넣으세요.")
    setIsNoticeModalOpen(true);
  }

  useEffect(() => {
    const handleClickOutside = () => {
      setIsMenuOpen(false);
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    }

  }, []);

  return (
    <div className="mt-11 mb-8">
      <div className="flex flex-row justify-between pb-4 border-b border-solid border-gray-100">
        <div className="flex flex-row gap-3">
          <SubjectTag text={category} variant="light-big" />
          <p className="text-headline-b text-gray-500">{title}</p>
          {isBestPost && <Tag variant="best" />}
        </div>

        <div className="relative flex flex-row gap-5 text-body1-r text-gray-300">
          <p>{userName}</p>
          |
          <p>{formattedDate}</p>
          <KebabIcon onClick={(e: MouseEvent) => {handleMenu(e)}} />
          {isMenuOpen &&
            <div className={`absolute right-0 top-[30px] w-[96px] px-2 shadow-custom-light bg-white text-gray-600 text-subhead1-sb`}>
              <div 
                className={`px-1 py-3 border-b border-solid border-gray-100`}
                onClick={() => copyLink()}>URL 복사</div>
              <div className={`px-1 py-3`}>신고하기</div>
            </div>
          }
        </div>
      </div>

      <div className="mt-8 mb-12 text-body1-r text-gray-500">{content}</div>

      <div className="flex flex-row justify-end text-gray-400">
        <div className="flex flex-row text-subhead1-sb items-center gap-0.5">
          <LikeIcon
            fill={isLike ? "#FF8686" : "none"}
            className={`cursor-pointer mr-[2px] ${isLike && `text-[#FF8686]`}`}
            onClick={() => handleLike()} />
          {likeCount}
          <CommentIcon className="ml-3" />
          {comments}
          <ScrapIcon className="ml-3" />
          {scrapeCount}
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
