import { clientInstance } from "@/utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

interface CenterInfoAPIResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    centerId: number;
    centerName: string;
    centerTel: string;
    centerAddr: string;
    carCount: number;
    payAmount: number;
  };
}

const CENTER_ID = 1; // MVP 단계에선 고정

export const useGetCenterInfo = (centerId: number = CENTER_ID) => {
  const { data, isFetching, error } = useQuery<CenterInfoAPIResponse>({
    queryKey: ["centerInfo", centerId],
    queryFn: () => clientInstance.get(`/center/${centerId}`),
    enabled: !!centerId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    placeholderData: (prev) => prev,
  });

  const centerInfoData = data?.data;
  return { centerInfoData, isFetching, error };
};
