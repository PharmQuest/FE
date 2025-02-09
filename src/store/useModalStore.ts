import { create } from 'zustand';

type Store = {
  isNoticeModalOpen: boolean;
  setIsNoticeModalOpen: (value: boolean) => void;
  NoticeModalText: string;
  setNoticeModalText: (value: string) => void;

  isReportModalOpen: boolean;
  setIsReportModalOpen: (value: boolean) => void;
  
  isCommentReport: boolean;
  setIsCommentReport: (value: boolean) => void;
  commentId: number | null;
  setCommentId: (value: number) => void;
}

const useModalStore = create<Store>((set) => ({
  isNoticeModalOpen: false,
  setIsNoticeModalOpen: (value: boolean) => set({isNoticeModalOpen: value}),
  NoticeModalText: "",
  setNoticeModalText: (value: string) => set({NoticeModalText: value}),

  isReportModalOpen: false,
  setIsReportModalOpen: (value: boolean) => set({isReportModalOpen: value}),

  isCommentReport: false,
  setIsCommentReport: (value: boolean) => set({isCommentReport: value}),
  commentId: null,
  setCommentId: (value: number) => set({commentId: value})
}))

export default useModalStore;