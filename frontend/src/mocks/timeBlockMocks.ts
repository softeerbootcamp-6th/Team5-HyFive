import { format } from "date-fns";

export interface AvailableTimeSlot {
  rentalDate: string;
  rentalStartTime: string;
  rentalEndTime: string;
}

// selectedWeek 기반 간단한 mock 데이터 생성
export const generateAvailableTimeSlots = (
  selectedWeek: Date[],
): AvailableTimeSlot[] => {
  return [
    {
      rentalDate: format(selectedWeek[1], "yyyy-MM-dd"), // 월요일
      rentalStartTime: "10:00",
      rentalEndTime: "15:00",
    },
    {
      rentalDate: format(selectedWeek[2], "yyyy-MM-dd"), // 화요일
      rentalStartTime: "14:00",
      rentalEndTime: "19:00",
    },

    {
      rentalDate: format(selectedWeek[3], "yyyy-MM-dd"), // 수요일
      rentalStartTime: "11:00",
      rentalEndTime: "18:00",
    },
    {
      rentalDate: format(selectedWeek[4], "yyyy-MM-dd"), // 목요일
      rentalStartTime: "09:00",
      rentalEndTime: "13:00",
    },
    {
      rentalDate: format(selectedWeek[4], "yyyy-MM-dd"), // 목요일
      rentalStartTime: "16:00",
      rentalEndTime: "19:00",
    },
    {
      rentalDate: format(selectedWeek[5], "yyyy-MM-dd"), // 금요일
      rentalStartTime: "15:00",
      rentalEndTime: "18:00",
    },
  ];
};
