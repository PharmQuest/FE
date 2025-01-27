import { create } from 'zustand';

type Store = {
  isNoticeModalOpen: boolean;
  setIsNoticeModalOpen: (value: boolean) => void;
  modalText: string;
  setModalText: (value: string) => void;
}

const useStore = create<Store>((set) => ({
  isNoticeModalOpen: false,
  setIsNoticeModalOpen: (value: boolean) => set({isNoticeModalOpen: value}),
  modalText: "",
  setModalText: (value: string) => set({modalText: value})
}))

export default useStore;