import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/apis/axios-instance";
import { MedicineCardProps } from "@/types/medicine";

interface MedicineResponse {
  code: string;
  message: string;
  result: {
    amountCount: number;
    amountPage: number;
    currentCount: number;
    currentPage: number;
    medicines: MedicineCardProps[];
  };
  isSuccess: boolean;
}

interface UseMedicineListParams {
  category: string;
  page?: number;
  size?: number;
}

export const useMedicineList = ({
  category,
  page = 1,
  size = 10,
}: UseMedicineListParams) => {
  return useQuery({
    queryKey: ["medicines", category, page, size],
    queryFn: async () => {
      const response = await axiosInstance.get<MedicineResponse>(
        "/medicine/lists",
        {
          params: {
            category,
            page,
            size,
          },
        }
      );
      return {
        medicines: response.data.result.medicines,
        pagination: {
          totalPages: response.data.result.amountPage,
          currentPage: response.data.result.currentPage,
          isFirst: response.data.result.currentPage === 1,
          isLast:
            response.data.result.currentPage ===
            response.data.result.amountPage,
        },
      };
    },
  });
};
