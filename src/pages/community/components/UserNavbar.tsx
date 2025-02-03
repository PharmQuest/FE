import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { AccountCircleIcon, BookmarkIcon, CommentIcon, NoticeIcon, PostIcon } from "@public/svgs";
import useAuthStore from "@/store/useAuthStore";

const UserNavbar = () => {
  const router = useRouter();

  const { isLoggedIn, logOut, checkAuth } = useAuthStore();

  const handleLogout = () => {
    logOut();
    console.log("로그아웃");
  };

  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <div
      className={`
        lg:flex flex-col grow
        hidden w-[170px] rounded-lg border-solid border-[1px] border-gray-200 flex-shrink-0
        ${isLoggedIn ? `h-[375px]` : `h-[117px]`}`}>
      {isLoggedIn ? (
        <>
          <div className="p-4 pt-[13px]">
            <div className={`flex gap-1`}>
              <p className="text-headline-b text-gray-600">maengso</p>
              <p className={`text-body1-r content-center`}>님</p>
            </div>
            <p className="text-caption1-r text-gray-300">naver 로그인</p>
            <div className=" flex flex-col gap-2.5">
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

          <div className={`flex flex-col grow`}>
            <div
              className="grow flex flex-row w-full px-4 py-2 gap-2 text-subhead2-sb text-gray-400 border-solid border-t-[1px] cursor-pointer items-center"
              onClick={() => router.push("/mypage")}>
              <AccountCircleIcon className={`text-gray-400 w-[18px]`} />
              마이페이지
            </div>

            <div
              className="grow flex flex-row w-full px-4 py-2 gap-2 text-subhead2-sb text-gray-400 border-solid border-t-[1px] cursor-pointer items-center"
              onClick={() => router.push("/community/activities?tab=posts")}>
              <PostIcon className={`text-gray-400 w-[18px]`} />
              작성한 게시글
            </div>

            <div
              className="grow flex flex-row w-full px-4 py-2 gap-2 text-subhead2-sb text-gray-400 border-solid border-t-[1px] cursor-pointer items-center"
              onClick={() => router.push("/community/activities?tab=comments")}>
              <CommentIcon className={`text-gray-400 w-[18px]`} />
              작성한 댓글
            </div>

            <div
              className="grow flex flex-row w-full px-4 py-2 gap-2 text-subhead2-sb text-gray-400 border-solid border-t-[1px] cursor-pointer items-center"
              onClick={() => router.push("/community/activities?tab=scraps")}>
              <BookmarkIcon stroke="#707070" className={`text-gray-400 w-[18px]`} />
              게시글 스크랩
            </div>

            <div
              className="grow flex flex-row w-full px-4 py-2 gap-2 text-subhead2-sb text-gray-400 border-solid border-t-[1px] cursor-pointer items-center"
              onClick={() => router.push("/community/activities?tab=notifications")}>
              <NoticeIcon className={`text-gray-400 w-[18px]`} />
              알림
            </div>
          </div>
        </>
      ) : (
        <div className={`flex flex-col justify-between gap-2 pt-4 pb-[14px] px-4 text-subhead2-sb`}>
          <div className={`text-gray-600 text-center w-[130px]`}>
            어디약을 더 편리하게 이용하세요
          </div>
          <button 
            className={`w-full py-2 text-white bg-point rounded`}
            onClick={() => router.push('/login')}>
            로그인
          </button>
        </div>
      )}


    </div>
  );
};

export default UserNavbar;
