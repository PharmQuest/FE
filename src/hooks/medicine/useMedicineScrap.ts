import { useEffect, useState } from "react";
import { axiosInstance } from "@/apis/axios-instance";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/router";
import useModalStore from "@/store/useModalStore";
import axios from "axios";

interface ScrapResponse {
  code: string;
  message: string;
  result: string;
  isSuccess: boolean;
}

export const useMedicineScrap = (
  medicineId: number,
  initialScrapStatus: boolean
) => {
  const [isScraped, setIsScraped] = useState(initialScrapStatus);
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const { setIsNoticeModalOpen, setNoticeModalText } = useModalStore();

  useEffect(() => {
    setIsScraped(initialScrapStatus);
  }, [initialScrapStatus]);

  const toggleScrap = async (event: React.MouseEvent) => {
    event.stopPropagation(); // 부모 컴포넌트 클릭 이벤트 방지

    if (!isLoggedIn) {
      setNoticeModalText("로그인이 필요한 서비스입니다.");
      setIsNoticeModalOpen(true);
      router.push("/login");
      return;
    }

    try {
      const endpoint = isScraped ? "remove" : "add";
      const method = isScraped ? "delete" : "post";

      const response = await axiosInstance.request<ScrapResponse>({
        method: method,
        url: `/medicine/scrap/${endpoint}`,
        params: {
          medicineId: medicineId,
        },
      });

      if (response.data.code === "AUTH4001") {
        setNoticeModalText("로그인이 필요한 서비스입니다.");
        setIsNoticeModalOpen(true);
        return;
      }

      if (response.data.isSuccess) {
        setIsScraped(!isScraped);
        setNoticeModalText(
          isScraped ? "스크랩이 해제되었습니다." : "스크랩이 완료되었습니다."
        );
        setIsNoticeModalOpen(true);
      } else {
        setNoticeModalText(response.data.message);
        setIsNoticeModalOpen(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setNoticeModalText("로그인이 필요한 서비스입니다.");
        setIsNoticeModalOpen(true);
        return;
      }
      console.error("스크랩 처리 중 오류 발생:", error);
      setNoticeModalText("스크랩 처리 중 오류가 발생했습니다.");
      setIsNoticeModalOpen(true);
    }
  };

  return {
    isScraped,
    toggleScrap,
  };
};
