export type BookType = "pending" | "success" | "fail";

export type BookStatus = "NEW" | "SUCCESS" | "FAIL";

export interface BookData {
  id: number;
  bookStatus: string;
  name: string;
  phone: string;
  isExistWalkingDevice: boolean;
  bookTime: string;
  bookDate: string;
  hospitalTime: string;
  hospitalDate: string;
  userStartLocation: string;
  userEndLocation: string;
  routeId: string;
  carNumber: string;
  routeStartTime: string;
  routeEndTime: string;
  routeStartLocation: string;
  routeEndLocation: string;
}

export interface BookAPIResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    items: BookAPIData[];
  };
}

export interface BookAPIData {
  id: number;
  bookName: string;
  bookTel: string;
  bookDate: string;
  bookTime: string;
  hospitalDate: string;
  hospitalTime: string;
  startAddr: string;
  endAddr: string;
  walker: boolean;
  bookStatus: BookStatus;
  path: {
    pathId: string;
    carNumber: string;
    startTime: string;
    endTime: string;
    startAddr: string;
    endAddr: string;
  } | null;
}
