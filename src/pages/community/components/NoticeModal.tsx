import Portal from "@/components/common/Portal";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  text: string;
};

const NoticeModal = ({ isOpen, setIsOpen, text }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false); // 3초 후 모달 닫기
      }, 3000);

      return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 클리어
    }
  }, [isOpen]); // isOpen이 변경될 때마다 효과 실행

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          >
            <div className="px-4 py-2 bg-gray-400 text-white rounded">
              {text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default NoticeModal;
