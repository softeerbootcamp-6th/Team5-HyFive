import type { BookAPIData, BookData } from "@/features/book/Book.types";
import type {
  PassengerAPIData,
  ScheduleAPIData,
} from "@/features/schedule/Schedule.types";

export const APIMatcher = {
  matchBookAPI: (apiItem: BookAPIData): BookData => {
    return {
      //예약자
      id: apiItem.id,
      bookStatus: apiItem.bookStatus,
      name: apiItem.bookName,
      phone: apiItem.bookTel,
      isExistWalkingDevice: apiItem.walker,
      //예약
      bookTime: apiItem.bookTime,
      bookDate: apiItem.bookDate,
      userStartLocation: apiItem.startAddr,
      userEndLocation: apiItem.endAddr,
      hospitalTime: apiItem.hospitalTime,
      // 경로
      routeId: apiItem.path?.pathId ?? "",
      carNumber: apiItem.path?.carNumber ?? "",
      routeStartTime: apiItem.path?.startTime ?? "",
      routeEndTime: apiItem.path?.endTime ?? "",
      routeStartLocation: apiItem.path?.startAddr ?? "",
      routeEndLocation: apiItem.path?.endAddr ?? "",
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
