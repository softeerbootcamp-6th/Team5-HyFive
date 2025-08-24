import type { BookAPIData, BookData } from "@/features/book/Book.types";
import type {
  PassengerAPIData,
  ScheduleAPIData,
} from "@/features/schedule/Schedule.types";

export const APIMatcher = {
  matchBookAPI: (apiItem: BookAPIData): BookData => {
    return {
      id: apiItem.id,
      bookStatus: apiItem.bookStatus,
      name: apiItem.bookName,
      phone: apiItem.bookTel,
      isExistWalkingDevice: apiItem.walker,
      bookTime: apiItem.bookTime,
      bookDate: apiItem.bookDate,
      userStartLocation: apiItem.startAddr,
      userEndLocation: apiItem.endAddr,
      hospitalTime: apiItem.hospitalTime,

      // 아직 API에서 안 오는 값들은 일단 빈값 처리
      routeId: "",
      carNumber: "",
      routeStartTime: "",
      routeEndTime: "",
      routeStartLocation: "",
      routeEndLocation: "",
    };
  },
  matchScheduleAPI: (apiItem: ScheduleAPIData) => {
    return {
      routeId: apiItem.pathId,
      totalUserCount: apiItem.userCount,
      routeStartTime: apiItem.startTime,
      routeEndTime: apiItem.endTime,
      routeStartLocation: apiItem.startAddr,
      routeEndLocation: apiItem.endAddr,
      centerName: apiItem.centerName,
      carNumber: apiItem.carNumber,
    };
  },
  matchPassengerAPI: (apiItem: PassengerAPIData) => {
    return {
      name: apiItem.name,
      phone: apiItem.phoneNumber,
      isExistWalkingDevice: apiItem.walker,
      boardingTime: apiItem.onTime,
      getOffTime: apiItem.offTime,
    };
  },
};
