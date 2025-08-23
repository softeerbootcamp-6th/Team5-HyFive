import { formatDateToYYMMDD } from "@/features/calender/Calender.util";
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

export const useGetTimeSlot = (selectedCarId: number, selectedWeek: Date[]) => {
  const firstDayString = formatDateToYYMMDD(selectedWeek[0]);
  const { data, isFetching, error } = useQuery<TimeSlotAPIResponse>({
    queryKey: ["timeSlot", selectedCarId, firstDayString],
    queryFn: () =>
      clientInstance.get(
        `/rental?car-id=${selectedCarId}&date=${firstDayString}`,
      ),
    enabled: selectedCarId > 0 && selectedWeek.length > 0,
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
