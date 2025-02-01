import React from "react";
import { useRouter } from "next/router";
import { AccountCircleIcon, BookmarkIcon, CommentIcon, NoticeIcon, PostIcon } from "@public/svgs";

const UserNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    console.log("로그아웃");
  };

  return (
    <div
      className="
        lg:block
        hidden w-[170px] rounded-lg border-solid border-[1px] border-gray-200 flex-shrink-0">
      <div className="p-4 pt-[13px]">
        <div className={`flex gap-1`}>
          <p className="text-headline-b text-gray-600">maengso</p>
          <p className={`text-body1-r content-center`}>님</p>
        </div>
        <p className="text-caption1-r text-gray-300">naver 로그인</p>
        <div className=" flex flex-col gap-4">
          <button
            className="w-full h-[37px] py-2 text-center text-subhead2-sb bg-primary-500 text-white rounded-[4px] mt-4"
            onClick={() => router.push("/community/create")}
          >
            게시글 작성
          </button>
          <button
            className="w-full h-[37px] py-2 text-center text-subhead2-sb text-gray-400 rounded-[4px] border-solid border-[1px] border-gray-200"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      </div>

      <div
        className="flex flex-row w-full px-4 py-2 gap-2 text-subhead2-sb text-gray-400 border-solid border-t-[1px] cursor-pointer items-center"
        onClick={() => router.push("/mypage")}>
        <AccountCircleIcon className={`text-gray-400 w-[18px]`}/>
        마이페이지
      </div>

      <div
        className="flex flex-row w-full px-4 py-2 gap-2 text-subhead2-sb text-gray-400 border-solid border-t-[1px] cursor-pointer items-center"
        onClick={() => router.push("/community/activities?tab=posts")}>
        <PostIcon className={`text-gray-400 w-[18px]`}/>
        작성한 게시글
      </div>

      <div
        className="flex flex-row w-full px-4 py-2 gap-2 text-subhead2-sb text-gray-400 border-solid border-t-[1px] cursor-pointer items-center"
        onClick={() => router.push("/community/activities?tab=comments")}>
        <CommentIcon className={`text-gray-400 w-[18px]`}/>
        작성한 댓글
      </div>

      <div
        className="flex flex-row w-full px-4 py-2 gap-2 text-subhead2-sb text-gray-400 border-solid border-t-[1px] cursor-pointer items-center"
        onClick={() => router.push("/community/activities?tab=scraps")}>
        <BookmarkIcon stroke="#707070" className={`text-gray-400 w-[18px]`}/>
        게시글 스크랩
      </div>

      <div
        className="flex flex-row w-full px-4 py-2 gap-2 text-subhead2-sb text-gray-400 border-solid border-t-[1px] cursor-pointer items-center"
        onClick={() => router.push("/community/activities?tab=notifications")}>
        <NoticeIcon className={`text-gray-400 w-[18px]`}/>
        알림
      </div>

    </div>
  );
};

export default UserNavbar;
