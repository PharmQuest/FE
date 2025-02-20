import { create } from 'zustand';

type Store = {
  isNoticeModalOpen: boolean;
  setIsNoticeModalOpen: (value: boolean) => void;
  noticeModalText: string;
  setNoticeModalText: (value: string) => void;

  isLoginRedirect: boolean;
  triggerLoginRedirect: (boolean) => void;

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
  noticeModalText: "",
  setNoticeModalText: (value: string) => set({noticeModalText: value}),

  isLoginRedirect: false,
  triggerLoginRedirect: (value: boolean) => set({isLoginRedirect: value}),

  isReportModalOpen: false,
  setIsReportModalOpen: (value: boolean) => set({isReportModalOpen: value}),

  isCommentReport: false,
  setIsCommentReport: (value: boolean) => set({isCommentReport: value}),
  commentId: null,
  setCommentId: (value: number) => set({commentId: value})
}))

export default useModalStore;