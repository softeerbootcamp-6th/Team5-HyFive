import type { BookStatus, BookType } from "@/features/book/Book.types";
import type { ScheduleType } from "@/features/schedule/Schedule.types";

const BOOK_MAPPING_TABLE: Record<string, BookType> = {
  "신규 예약": "pending",
  "예약 성공": "success",
  "예약 실패": "fail",
};

const BOOK_API_MAPPING_TABLE: Record<string, BookStatus> = {
  pending: "NEW",
  success: "SUCCESS",
  fail: "FAIL",
};

const SCHEDULE_MAPPING_TABLE: Record<string, ScheduleType> = {
  "운행 대기": "waiting",
  "운행 중": "inProgress",
  "운행 완료": "completed",
};

const TabMatcher = {
  matchBookTypeKRToENG: (activeTab: string): BookType => {
    return BOOK_MAPPING_TABLE[activeTab];
  },
  matchScheduleTypeKRToENG: (activeTab: string): ScheduleType => {
    return SCHEDULE_MAPPING_TABLE[activeTab];
  },
  matchScheduleTypeENGToKR: (activeTab: ScheduleType): string => {
    const scheduleType = Object.keys(SCHEDULE_MAPPING_TABLE).find(
      (key) => SCHEDULE_MAPPING_TABLE[key] === activeTab,
    );
    if (scheduleType) return scheduleType;
    return "운행 대기";
  },
  matchBookTypeClientToServer: (activeTab: string) => {
    return BOOK_API_MAPPING_TABLE[activeTab];
  },
  matchBookTypeServerToClient: (activeTab: string) => {
    const bookType = Object.keys(BOOK_API_MAPPING_TABLE).find(
      (key) => BOOK_API_MAPPING_TABLE[key] === activeTab,
    );
    if (bookType) return bookType;
    return "pending";
  },
};

export default TabMatcher;
