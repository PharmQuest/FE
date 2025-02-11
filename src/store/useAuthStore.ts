import { axiosInstance } from "@/apis/axios-instance";
import { clearTokens } from "@/utils/cookie";
import { create } from "zustand";
import Cookies from "js-cookie";

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
    clearTokens();
    set({ isLoggedIn: false, userId: null, userName: null, provider: null });
  },

  checkAuth: () => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
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
      set({ isLoggedIn: false, userId: null, userName: null, provider: null });
    }
  },
}));

export default useAuthStore;
