import { axiosInstance } from "@/apis/axios-instance";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";



const useUserCount = ( url: string, queryKey: [string, number | null, number?], isOnInitial: boolean, initialCount: number, isScrap?: boolean, deleteUrl?: string) => {
  const [isOn, setIsOn] = useState(isOnInitial);
  const [onCount, setOnCount] = useState(initialCount);

  const QueryClient = useQueryClient();
  const handleOn = async () => {
    try{
      if(!isOn){
        setOnCount(onCount + 1);
        setIsOn(!isOn)
        await axiosInstance.post(url);
        QueryClient.invalidateQueries({ queryKey: [queryKey] })
      } else {
        setOnCount(onCount - 1);
        setIsOn(!isOn)
        if (isScrap && deleteUrl){
          await axiosInstance.delete(deleteUrl)
        }
        else {
          await axiosInstance.delete(url);
        }
        
        QueryClient.invalidateQueries({ queryKey: [queryKey] })
      }
    } catch (e) {
      console.log(e)
    }
  }
  
  useEffect(() => {
    setIsOn(isOnInitial);
    setOnCount(initialCount);
  }, [isOnInitial, initialCount]);

  return { isOn, onCount, handleOn };
}

export default useUserCount;