const BASE_URL = "http://ec2-54-180-74-54.ap-northeast-2.compute.amazonaws.com:8080";

export const login = async (provider: "kakao" | "naver" | "google") => {
  try {
    // OAuth 인증 페이지로 이동
    window.location.href = `${BASE_URL}/oauth2/authorization/${provider}`;
  } catch (error) {
    console.error("로그인 요청 실패:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");

  document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
