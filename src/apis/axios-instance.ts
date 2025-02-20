import useModalStore from "@/store/useModalStore";
import { clearTokens } from "@/utils/cookie";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const axiosPostInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const axiosRefreshInstance = axios.create();

const setAuthHeader = (config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
};

const setRefreshHeader = (config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = Cookies.get("refreshToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      const {triggerLoginRedirect} = useModalStore.getState();
      triggerLoginRedirect(true)
      return Promise.reject(new Error("No refresh token available"));
    }
  }
  return config;
};

axiosInstance.interceptors.request.use(setAuthHeader);
axiosPostInstance.interceptors.request.use(setAuthHeader);

axiosRefreshInstance.interceptors.request.use(setRefreshHeader);

const responseInterceptor = async (error: AxiosError) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

  const errorDetail = (error.response?.data as { detail?: string })?.detail;

  if ((errorDetail === "Required header 'Authorization' is not present." || error.response?.status === 500) && !originalRequest._retry) {
    originalRequest._retry = true;

    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      localStorage.removeItem("accessToken");
      Cookies.remove("accessToken")
      const {triggerLoginRedirect} = useModalStore.getState();
      triggerLoginRedirect(true)
      return Promise.reject(new Error("No refresh token, redirecting to login"));
    }

    try {
      const refreshResponse = await axiosRefreshInstance.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/reissue/access-token`
      );

      const newAccessToken = refreshResponse?.data?.result?.access_token;
      Cookies.set("accessToken", newAccessToken, { path: "/", secure: true });

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      console.error("리프레시 토큰 만료 또는 오류 발생", refreshError);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      clearTokens();
      const {triggerLoginRedirect} = useModalStore.getState();
      triggerLoginRedirect(true)
    }
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use((response: AxiosResponse) => response, responseInterceptor);
axiosPostInstance.interceptors.response.use((response: AxiosResponse) => response, responseInterceptor);
