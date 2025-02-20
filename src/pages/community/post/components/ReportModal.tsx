import Portal from "@/components/common/Portal";
import { AnimatePresence, motion } from "framer-motion";
import useModalStore from "@/store/useModalStore";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { CheckCircleIcon, CircleIcon, XIcon } from "@public/svgs";
import { axiosInstance } from "@/apis/axios-instance";
import { useRouter } from "next/router";

const ReportModal = () => {

  const reportTypes = [
    { key: 1, type: "SPAM", text: "스팸홍보/도배" },
    { key: 2, type: "OBSCENE_CONTENT", text: "음란물" },
    { key: 3, type: "ILLEGAL_INFO", text: "불법정보 포함" },
    { key: 4, type: "HATE_SPEECH", text: "욕설/비하/혐오/차별적 표현" },
    { key: 5, type: "FRAUD", text: "유출/사칭/사기" },
    { key: 6, type: "ILLEGAL_RECORDINGS", text: "불법촬영물 유통" },
    { key: 7, type: "ADS", text: "상업적 광고 및 판매" },
  ]

  const {
    setIsNoticeModalOpen,
    setNoticeModalText,
    isReportModalOpen,
    setIsReportModalOpen,
    isCommentReport,
    commentId,
  } = useModalStore((state) => state);

  const [reportKey, setReportKey] = useState<number | null>(null);
  const [reportType, setReportType] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const postId = Number(router.query.postId);

  const handleReportType = (e: MouseEvent, key: number, type: string) => {
    e.stopPropagation();
    setReportKey(key)
    setReportType(type)
  }

  const handleReport = async () => {
    if (isCommentReport) {
      try {
        await axiosInstance.post(`${process.env.NEXT_PUBLIC_DOMAIN}/community/comments/${commentId}/reports?type=${reportType}`)
        setIsReportModalOpen(false)
        setReportKey(null)
        setNoticeModalText("신고가 정상적으로 접수되었습니다.")
        setIsNoticeModalOpen(true)
      }
      catch (error) {
        console.log(error)
        setNoticeModalText("신고 접수에 실패했습니다.")
        setIsNoticeModalOpen(true)
      }
    }
    else {
      try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_DOMAIN}/community/posts/${postId}/reports?type=${reportType}`)
        console.log(response)
        setIsReportModalOpen(false)
        setReportKey(null)
        setNoticeModalText("신고가 정상적으로 접수되었습니다.")
        setIsNoticeModalOpen(true)
        router.push("/community");
      } catch (error) {
        console.log(error)
        setNoticeModalText("신고 접수에 실패했습니다.")
        setIsNoticeModalOpen(true)
      }
    }
  }

  const handleXbutton = () => {
    setIsReportModalOpen(false);
    setReportKey(null);
  }

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsReportModalOpen(false);
        setReportKey(null);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    }

  }, []);

  return (
    <Portal>
      <AnimatePresence>
        {isReportModalOpen && (
          <motion.div
            className="fixed inset-0 z-[900] flex items-center justify-center bg-[#0000004D]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <div
              ref={modalRef}
              className={`w-[400px] flex flex-col rounded bg-white text-gray-600 p-6 gap-8`}>
              <div className={`flex flex-col gap-2`}>
                <div className={`flex items-center justify-between`}>
                  <p className={`text-headline-b`}>
                    신고 사유 선택
                  </p>
                  <XIcon className={`p-0.5 mr-1 w-5 cursor-pointer`} onClick={handleXbutton} />
                </div>
                <div
                  className={`flex flex-col`}>
                  {reportTypes?.map((item, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer flex px-2 py-4 gap-3 border-b border-solid border-gray-100 items-center ${reportKey === item.key && `text-subhead1-sb text-primary-500`}`}
                      onClick={(e) => handleReportType(e, item.key, item.type)}>
                      {reportKey === item.key ? <CheckCircleIcon /> : <CircleIcon />}
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
              <button
                className={`w-full py-3 text-subhead1-sb rounded bg-primary-300 text-white
                          disabled:bg-gray-100 disabled:text-gray-500`}
                disabled={!reportKey}
                onClick={handleReport}>
                신고하기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default ReportModal;
