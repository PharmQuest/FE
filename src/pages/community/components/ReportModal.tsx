import Portal from "@/components/common/Portal";
import { AnimatePresence, motion } from "framer-motion";
import useStore from "@/store/useStore";
import { useEffect, useRef, useState } from "react";
import { CheckCircleIcon, CircleIcon, XIcon } from "@public/svgs";

const ReportModal = () => {

  const reportReasons = [
    { key: 1, text: "스팸홍보/도배" },
    { key: 2, text: "음란물" },
    { key: 3, text: "불법정보 포함" },
    { key: 4, text: "욕설/비하/혐오/차별적 표현" },
    { key: 5, text: "유출/사칭/사기" },
    { key: 6, text: "불법촬영물 유통" },
    { key: 7, text: "상업적 광고 및 판매" },
  ]

  const {
    setIsNoticeModalOpen,
    setNoticeModalText,
    isReportModalOpen,
    setIsReportModalOpen,
  } = useStore((state) => state);

  const [reportKey, setReportKey] = useState<number | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleReportReason = (key: number) => {
    setReportKey(key)
  }

  const handleReport = () => {
    setIsReportModalOpen(false)
    setReportKey(null)
    setIsNoticeModalOpen(true)
    setNoticeModalText("신고가 정상적으로 접수되었습니다.")
  }

  const handleXbutton = () => {
    setIsReportModalOpen(false);
    setReportKey(null);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000004D]"
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
                  <XIcon onClick={handleXbutton}/>
                </div>
                <div
                  className={`flex flex-col`}>
                  {reportReasons?.map((item, index) => (
                    <div 
                      key={index} 
                      className={`flex px-2 py-4 gap-3 border-b border-solid border-gray-100 items-center ${reportKey === item.key && `text-subhead1-sb text-primary-500`}`}
                      onClick={() => handleReportReason(item.key)}>
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
