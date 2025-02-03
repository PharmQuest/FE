import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { axiosPostInstance } from "@/apis/axios-instance";

const useCustomMutation = <TData>(
  url: string,
  type?: string,
  postId?: number | null,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: async (body?: TData) => {
      switch (type) {
        // 게시글 수정 시
        case "patch": {
          const response = await axiosPostInstance.patch(url, body);
          return response;
        }

        // 게시글 삭제 시
        case "delete": {
          const response = await axiosPostInstance.delete(url);
          return response;
        }

        // 게시글 작성 시
        default: {
          const response = await axiosPostInstance.post(url, body);
          return response;
        }
      }
    },
    onSuccess: () => {
      queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === "posts",
      });
      queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] === "post" && query.queryKey[1] === postId,
      });
      router.push("/community");
    },
  });

  return mutateAsync;
};

export default useCustomMutation;
