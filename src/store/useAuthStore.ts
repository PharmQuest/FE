import { create } from "zustand"
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  logOut: () => void;
  checkAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,

      logOut: () => {
        localStorage.removeItem("accessToken");
        set({ isLoggedIn: false });
      },

      checkAuth: () => {
        const accessToken = localStorage.getItem("accessToken");
        set({ isLoggedIn: !!accessToken });
      }
    }),
    {
      name: "autg-storage"
    }
  )
);

export default useAuthStore;