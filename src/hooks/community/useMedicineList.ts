import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/apis/axios-instance";
import { MedicineCardProps } from "@/types/medicine";

interface UseMedicineListParams {
  category: string;
  page?: number;
  size?: number;
}

export const useMedicineList = ({
  category,
  page = 0,
  size = 10,
}: UseMedicineListParams) => {
  return useQuery({
    queryKey: ["medicines", category, page, size],
    queryFn: async () => {
      const response = await axiosInstance.get<MedicineCardProps[]>(
        "/medicine/lists",
        {
          params: {
            category,
            page,
            size,
          },
        }
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
