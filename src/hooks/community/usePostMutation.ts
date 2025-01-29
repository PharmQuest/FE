import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import axiosInstance from "@/apis/axios-instance";

const useCustomMutation = <TData>(
  url: string,
  body?: TData,
  type?: string,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      switch (type) {
        // 게시글 수정 시
        case "patch": {
          const response = await axiosInstance.patch(url, body);
          return response;
        }

        // 게시글 삭제 시
        case "delete": {
          const response = await axiosInstance.delete(url);
          return response;
        }

        // 게시글 작성 시
        default: {
          const response = await axiosInstance.post(url, body);
          return response;
        }
      }
    },
    onSuccess: () => {
      queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === "posts",
      });
      router.push("/community");
    },
  });

  return mutateAsync;
};

export default useCustomMutation;
