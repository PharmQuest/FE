import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

const useCustomMutation = <TData>(
  url: string, 
  data: TData, 
  redirectUrl: string ="/community",
) => {

  const router = useRouter()

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        url,
        data,
      );
      return response;
    },
    onSuccess: () => {
      router.push(redirectUrl);
    },
  });

  return mutateAsync;
};

export default useCustomMutation;