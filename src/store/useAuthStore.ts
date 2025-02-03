import { create } from "zustand"

interface AuthState {
  isLoggedIn: boolean;
  logOut: () => void;
}

const useAuthStore = create<AuthState>((set) => {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  return {
    isLoggedIn: !!accessToken,
    logOut: () => {
      localStorage.removeItem("accessToken");
      set({isLoggedIn: false});
    },
  };
});

export default useAuthStore;