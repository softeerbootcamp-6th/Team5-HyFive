import type { BookAPIItem } from "@/features/book/Book.types";
import type { BookDataType } from "@/types/bookType.types";

export const APIMatcher = {
  matchBookAPI: (apiItem: BookAPIItem): BookDataType => {
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
};
