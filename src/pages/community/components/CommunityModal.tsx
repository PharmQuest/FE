import { AccountCircleIcon, BookmarkIcon, CommentIcon, CreatePostIcon, NoticeIcon, PostIcon } from "@public/svgs";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

const CommunityModal = ({isMobileModalOpen, setIsMobileModalOpen} : {isMobileModalOpen:boolean, setIsMobileModalOpen:Dispatch<SetStateAction<boolean>>}) => {

  const router = useRouter();

  return (

    <div
      className={`fixed top-0 w-screen h-screen bg-[#0000004D] backdrop-blur-[10px] transition-all duration-300 ease-out z-[1000] ${isMobileModalOpen ? `opacity-100` : `opacity-0 pointer-events-none`}`}
      onClick={() => setIsMobileModalOpen(false)}>
      <div className={`fixed bottom-[92px] right-5 text-white text-m-display1-b flex flex-col gap-6`}>
        <div
          className={`flex justify-end gap-3 items-center`}
          onClick={() => router.push('/community/activities?tab=notifications')}>
          알림
          <NoticeIcon className={`w-6`} />
        </div>
        <div
          className={`flex justify-end gap-3 items-center`}
          onClick={() => router.push('/community/activities?tab=scraps')}>
          게시글 스크랩
          <BookmarkIcon stroke={"white"} className={`w-6`} />
        </div>
        <div
          className={`flex justify-end gap-3 items-center`}
          onClick={() => router.push('/community/activities?tab=comments')}>
          작성한 댓글
          <CommentIcon className={`w-6`} />
        </div>
        <div
          className={`flex justify-end gap-3 items-center`}
          onClick={() => router.push('/community/activities?tab=posts')}>
          작성한 게시글
          <PostIcon className={`w-6`} />
        </div>
        <div
          className={`flex justify-end gap-3 items-center`}
          onClick={() => router.push('/mypage')}>
          마이페이지
          <AccountCircleIcon className={`w-6`} />
        </div>
        <div
          className={`flex justify-end gap-3 items-center`}
          onClick={() => router.push('/community/create')}>
          게시글 작성
          <CreatePostIcon className={`w-6`} />
        </div>
      </div>
    </div>
  )
}

export default CommunityModal;