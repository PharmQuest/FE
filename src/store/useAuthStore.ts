import { axiosInstance } from "@/apis/axios-instance";
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean | null;
  userId: number | null;
  userName: string | null;
  provider: string | null;
  logOut: () => void;
  checkAuth: () => void;
  setUser: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: null,
  userId: null,
  userName: null,
  provider: null,

  logOut: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ isLoggedIn: false });
  },

  checkAuth: () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    set({ isLoggedIn: !!accessToken || !!refreshToken });
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
