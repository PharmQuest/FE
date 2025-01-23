import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import axiosPOSTInstance from "../apis/axios-instance"

const useCustomMutation = <TData>(
  url: string, 
  body: TData, 
  redirectUrl: string ="/community",
) => {

  const router = useRouter()

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const response = await axiosPOSTInstance.post(
        url,
        body,
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