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
        setIsNoticeModalOpen(false); // 1.5초 후 모달 닫기
      }, 1500);

      return () => clearTimeout(timer);
    }
  });

  return (
    <Portal>
      <AnimatePresence>
        {isNoticeModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
