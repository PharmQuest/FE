import usePostMutation from "@/hooks/community/usePostMutation";
import useModalStore from "@/store/useModalStore";
import { useRouter } from "next/router";
import { MouseEvent } from "react";

interface PostMenuProp {
  postId: number;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOwnPost: boolean;
}

const PostMenu: React.FC<PostMenuProp> = ({ postId, isMenuOpen, setIsMenuOpen, isOwnPost }) => {

  const router = useRouter();

  const mutate = usePostMutation(
    `${process.env.NEXT_PUBLIC_DOMAIN}/community/posts?postIds=${postId}`,
    "delete",
  )

  const {
    setNoticeModalText,
    setIsNoticeModalOpen,
    setIsReportModalOpen,
    setIsCommentReport,
  } = useModalStore();

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setNoticeModalText("URL이 복사되었습니다. 원하는 곳에 붙여 넣으세요.")
    setIsNoticeModalOpen(true);
  }

  const handleModify = () => {
    router.push(`/community/modify/${postId}`)
  }

  const handleDelete = async () => {
    try {
      await mutate({});
      setNoticeModalText("게시글을 삭제하였습니다.");
      setIsNoticeModalOpen(true);
      router.push("/community");
    } catch (error) {
      console.log(error);
      setNoticeModalText("게시글 삭제에 실패했습니다.")
    }
  }

  const handleReport = (e: MouseEvent) => {
    e.stopPropagation();
    setIsCommentReport(false);
    setIsReportModalOpen(true);
    setIsMenuOpen(false);
  }

  return (
    isMenuOpen && (
      isOwnPost ? (
        <div className={`absolute right-0 top-[30px] w-[100px] px-2 shadow-custom-light bg-white text-gray-600 text-subhead1-sb rounded`}>
          <div
            className={`px-1 py-3 border-b border-solid border-gray-100`}
            onClick={() => copyLink()}>URL 복사
          </div>
          <div
            className={`px-1 py-3 border-b border-solid border-gray-100`}
            onClick={() => handleModify()}>수정하기
          </div>
          <div
            className={`px-1 py-3`}
            onClick={() => handleDelete()}>삭제하기
          </div>
        </div>
      ) : (
        <div className={`absolute right-0 top-[30px] w-[96px] px-2 shadow-custom-light bg-white text-gray-600 text-subhead1-sb rounded`}>
          <div
            className={`px-1 py-3 border-b border-solid border-gray-100`}
            onClick={() => copyLink()}>URL 복사</div>
          <div
            className={`px-1 py-3`}
            onClick={(e) => handleReport(e)}>신고하기</div>
        </div>
      )
    )
  )
}

export default PostMenu;