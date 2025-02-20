import Cookies from "js-cookie";

// 액세스 토큰 저장
export const setAccessToken = (token: string) => {
  Cookies.set("accessToken", token, { path: "/", secure: true });
  localStorage.setItem("accessToken", token);
};

// 리프레시 토큰 저장
export const setRefreshToken = (token: string) => {
  Cookies.set("refreshToken", token, { path: "/", secure: true });
  localStorage.setItem("refreshToken", token);
};

// 쿠키에서 액세스 토큰 가져오기
export const getAccessToken = (): string | undefined => {
  return Cookies.get("accessToken");
};

// 쿠키에서 리프레시 토큰 가져오기
export const getRefreshToken = (): string | undefined => {
  return Cookies.get("refreshToken");
};

// 모든 쿠키 삭제
export const clearTokens = () => {
  Cookies.remove("accessToken", { path: "/" });
  Cookies.remove("refreshToken", { path: "/" });
};
