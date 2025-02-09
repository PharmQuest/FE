import { useState, useEffect } from "react";
import { axiosInstance } from "@/apis/axios-instance";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/router";
import useModalStore from "@/store/useModalStore";

interface ScrapResponse {
  code: string;
  message: string;
  result: {
    if_scrap: boolean;
  };
  isSuccess: boolean;
}

export const usePharmacyScrap = (placeId: string) => {
  const [isScraped, setIsScraped] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const { setIsNoticeModalOpen, setNoticeModalText } = useModalStore();

  useEffect(() => {
    const checkScrapStatus = async () => {
      if (!isLoggedIn || !placeId) return;

      try {
        const response = await axiosInstance.get<ScrapResponse>(
          `/pharmacy/${placeId}/scrap`
        );
        setIsScraped(response.data.result.if_scrap);
      } catch (error) {
        console.error("Error checking scrap status:", error);
      }
    };

    checkScrapStatus();
  }, [placeId, isLoggedIn]);

  const toggleScrap = async () => {
    if (!isLoggedIn) {
      setNoticeModalText("로그인이 필요한 서비스입니다.");
      setIsNoticeModalOpen(true);
      router.push("/login");
      return;
    }

    if (!placeId) return;

    try {
      await axiosInstance.patch(`/pharmacy/${placeId}`);
      setIsScraped(!isScraped);
    } catch (error) {
      console.error("Error toggling scrap:", error);
      setNoticeModalText("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsNoticeModalOpen(true);
    }
  };

  return {
    isScraped,
    toggleScrap,
  };
};
