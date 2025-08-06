import type { BookType } from "@/features/book/Book.types";
import type { ScheduleType } from "@/features/schedule/Schedule.types";

const BOOK_MAPPING_TABLE: Record<string, BookType> = {
  "신규 예약": "pending",
  "예약 성공": "success",
  "예약 실패": "fail",
};

const SCHEDULE_MAPPING_TABLE: Record<string, ScheduleType> = {
  "운행 대기": "waiting",
  "운행 중": "inProgress",
  "운행 완료": "completed",
};

const TabMatcher = {
  matchBookTypKRToENG: (activeTab: string): BookType => {
    return BOOK_MAPPING_TABLE[activeTab];
  },
  matchSheduleTypKRToENG: (activeTab: string): ScheduleType => {
    return SCHEDULE_MAPPING_TABLE[activeTab];
  },
};

export default TabMatcher;
