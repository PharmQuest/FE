import Portal from "@/components/common/Portal";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import useStore from "@/store/useStore";

const NoticeModal = () => {

  const { 
    isNoticeModalOpen, 
    setIsNoticeModalOpen,
    modalText,
  } = useStore((state) => state);

  useEffect(() => {
    if (isNoticeModalOpen) {
      const timer = setTimeout(() => {
        setIsNoticeModalOpen(false); // 3초 후 모달 닫기
      }, 3000);

      return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 클리어
    }
  }); // isOpen이 변경될 때마다 효과 실행

  return (
    <Portal>
      <AnimatePresence>
        {isNoticeModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsNoticeModalOpen(false)}
          >
            <div className="px-4 py-2 bg-gray-400 text-white rounded">
              {modalText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default NoticeModal;
