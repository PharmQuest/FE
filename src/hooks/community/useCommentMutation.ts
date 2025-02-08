import { axiosInstance } from "@/apis/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCommentMutation = (
  postId: number | null,
) => {

  const queryClient = useQueryClient();
  
  const { mutateAsync } = useMutation({
    mutationFn: async ({url, type, body} : {url: string; type: "post" | "patch" | "delete"; body?: {content: string}}) => {

      switch (type) {
        case "post": {
          const response = await axiosInstance.post(url, body);
          return response;
        }

        case "patch": {
          const response = await axiosInstance.patch(url, body);
          return response;
        }

        case "delete":{
          const response = await axiosInstance.delete(url);
          return response;
        }

        default:
          break;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", Number(postId)] });
    }
  })
  
  return mutateAsync;
}

export default useCommentMutation;