import { axiosInstance } from "@/apis/axios-instance";
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  userId: number | null;
  userName: string | null;
  provider: string | null;
  logOut: () => void;
  checkAuth: () => void;
  setUser: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: true,
  userId: null,
  userName: null,
  provider: null,

  logOut: () => {
    localStorage.removeItem("accessToken");
    set({ isLoggedIn: false });
  },

  checkAuth: () => {
    const accessToken = localStorage.getItem("accessToken");
    set({ isLoggedIn: !!accessToken });
  },

  setUser: async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/member/detail`
      );

      const userData = response?.data?.result;
      set({
        userId: userData.userId,
        userName: userData.userName,
        provider: userData.provider,
      });
    } catch (e) {
      console.log(e);
      set({ isLoggedIn: false, userId: null, userName: null });
    }
  },
}));

export default useAuthStore;
