import { clientInstance } from "@/utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

interface TimeSlotAPIResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    id: number;
    carId: number;
    rentalDate: string;
    rentalStartTime: string;
    rentalEndTime: string;
  }[];
}

export const useGetTimeSlot = (selectedCarId: number, weekKey: string) => {
  const { data, isFetching, error } = useQuery<TimeSlotAPIResponse>({
    queryKey: ["timeSlot", selectedCarId, weekKey],
    queryFn: () =>
      clientInstance.get(`/rental?car-id=${selectedCarId}&date=${weekKey}`),
    enabled: selectedCarId > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const timeSlotData = data?.data;

  return {
    timeSlotData,
    isFetching,
    error,
  };
};
