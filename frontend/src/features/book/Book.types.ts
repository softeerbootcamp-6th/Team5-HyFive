export type BookType = "pending" | "success" | "fail";

export type BookStatus = "NEW" | "SUCCESS" | "FAIL";

export interface BookAPIResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    items: BookAPIItem[];
  };
}

export interface BookAPIItem {
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
}
