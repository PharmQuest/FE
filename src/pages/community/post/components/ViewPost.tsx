import {
  BookmarkIcon,
  CommentIcon,
  KebabIcon,
  LeftArrowIcon,
  LikeIcon,
} from "@public/svgs";
import Tag from "../../components/Tag";
import SubjectTag from "../../components/SubjectTag";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import useUserCount from "@/hooks/community/useUserCount";
import { MouseEvent } from "react";
import PostMenu from "./PostMenu";
import Image from "next/image";
import { ClipLoader } from 'react-spinners';

interface ViewPostProps {
  category: string;
  title: string;
  isBestPost?: boolean;
  userName: string;
  createdAt: string;
  content: string;
  likeCount: number;
  commentCount: number;
  scrapeCount: number;
  isLiked: boolean;
  isScraped: boolean;
  isOwnPost: boolean;
  imageUrl: string;
  commentPage: number;
  isPending: boolean;
}

const ViewPost: React.FC<ViewPostProps> = ({
  isBestPost = false,
  category,
  title,
  userName,
  createdAt,
  content,
  likeCount,
  commentCount,
  scrapeCount,
  isLiked,
  isScraped,
  isOwnPost,
  imageUrl,
  commentPage,
  isPending,
}) => {
  const date = new Date(createdAt);
  const formattedDate = isNaN(date.getTime()) ? "not date" : format(date, "yyyy.MM.dd")
  const router = useRouter();

  const postId = Number(router.query.postId);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    isOn: isPostLike,
    onCount: postLikeCount,
    handleOn: handleLike
  } = useUserCount(
    `${process.env.NEXT_PUBLIC_DOMAIN}/community/posts/${postId}/likes`,
    ["post", postId, commentPage],
    isLiked,
    likeCount,
  );

  const {
    isOn: isPostScrap,
    onCount: postScrapCount,
    handleOn: handleScrap
  } = useUserCount(
    `${process.env.NEXT_PUBLIC_DOMAIN}/community/posts/${postId}/scraps`,
    ["post", postId, commentPage],
    isScraped,
    scrapeCount,
    true,
    `${process.env.NEXT_PUBLIC_DOMAIN}/community/posts/scraps?postIds=${postId}`,
  );

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

  }, []);

  return (
    <>
      <div className={`md:hidden bg-white flex sticky top-[60px] bg-0 text-m-headline1-b text-gray-600 items-center px-5 py-4 justify-between shadow-[0px_2px_5px_0px_rgba(0,0,0,0.05)] z-50`}>
        <div 
          className={`flex items-center gap-3`}
          onClick={() => router.back()}>
          <LeftArrowIcon className={`h-6`} />
          <p>게시글</p>
        </div>
        <div className={`md:hidden relative block cursor-pointer`}>
          <KebabIcon className={`h-6`} onClick={(e: MouseEvent) => { handleMenu(e) }} />
          <PostMenu postId={postId} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isOwnPost={isOwnPost} />
        </div>
      </div>
      {isPending ? (
        <div className={`lg:h-[calc(100vh-248px)] md:h-[calc(100vh-60px)] h-[calc(100vh-135px)] justify-center items-center flex`}>
          <ClipLoader 
            className={`w-5 h-5`}
            color="#333333"
            cssOverride={{}}
            loading
            size={35}
            speedMultiplier={0.7}
            />
        </div>
      ) : (
        <>
          <div
            className="
          lg:mt-11 md:mb-4 md:px-0 md:mx-0
          mx-5 mt-4 mb-4 pb-4 border-b border-solid border-gray-100">
            <div
              className="
            lg:flex-row lg:gap-3 
            flex flex-col justify-between pb-4 border-b border-solid border-gray-100 gap-2">
              <div className={`flex justify-between gap-3 grow`}>
                <div className="flex flex-row gap-3 items-center">
                  <SubjectTag
                    text={category}
                    variant="light-big"
                    className={`
                  lg:h-[33px]
                  md:h-[24px] md:text-subhead2-sb
                  w-fit px-2 h-[22px] text-m-subhead2-sb`} />
                  <div
                    className="
                lg:text-headline-b
                md:flex
                hidden text-m-headline2-b text-gray-500 gap-3 mt-[1.5px]">
                    <div
                      className={`
                  lg:max-w-[475px] 
                  max-w-[300px] break-words`}>
                      {title}
                    </div>
                    {isBestPost &&
                      <div className={`h-full`}>
                        <Tag variant="bestBig" className={`lg:mt-[3px] lg:text-subhead1-sb lg:h-6 text-subhead3-sb items-center`} />
                      </div>
                    }
                  </div>
                </div>

                <div
                  className="
              lg:gap-4 lg:text-body1-r lg:mt-[4.5px]
              flex flex-row text-m-caption1-r text-gray-300 gap-2 ">
                  <p>{userName}</p>
                  |
                  <p>{formattedDate}</p>
                  <div className={`lg:ml-1 md:block relative hidden cursor-pointer`}>
                    <KebabIcon
                      className={`
                  lg:h-[22px]
                  h-[18px]`}
                      onClick={(e: MouseEvent) => { handleMenu(e) }} />
                    <PostMenu postId={postId} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isOwnPost={isOwnPost} />
                  </div>
                </div>
              </div>

              <div
                className="
                md:hidden
                flex text-headline-b text-gray-500 gap-3 mt-[1.5px]">
                <div
                  className={`
                text-m-headline2-b max-w-full break-words`}>
                  {title}
                </div>
                {isBestPost &&
                  <div className={`h-full`}>
                    <Tag variant="best" />
                  </div>
                }
              </div>

            </div>

            <div
              className={`
            lg:gap-8 lg:mt-8 lg:mb-12
            flex flex-col  mt-4 mb-4 gap-4`}>
              <div className=" text-body1-r text-gray-500">{content}</div>
              {imageUrl &&
                <Image
                  src={imageUrl}
                  width={100}
                  height={100}
                  alt={"이미지"}
                  className={`w-full`}
                  priority />
              }
            </div>

            <div className="flex flex-row justify-end text-gray-400">
              <div className="lg:text-subhead1-sb flex flex-row items-center gap-0.5 text-m-subhead1-sb">
                <LikeIcon
                  fill={isPostLike ? "#FF8686" : "none"}
                  className={`w-6 cursor-pointer mr-[2px] ${isPostLike && `text-[#FF8686]`}`}
                  onClick={() => handleLike()}
                />
                {postLikeCount}
                <CommentIcon className="ml-3 w-6" />
                {commentCount}
                <BookmarkIcon
                  fill={isPostScrap ? "#FFD755" : "none"}
                  stroke={isPostScrap ? "#FFD755" : "#707070"}
                  className={`w-6 cursor-pointer ml-3`}
                  onClick={() => handleScrap()} />
                {postScrapCount}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ViewPost;
