import type { BookType } from "@/features/book/Book.types";
import type { ScheduleType } from "@/features/schedule/Schedule.types";

const MAPPING_TABLE: Record<BookType | ScheduleType, string> = {
  pending: "신규 예약",
  success: "예약 성공",
  fail: "예약 실패",
  waiting: "운행 대기",
  inProgress: "운행 중",
  completed: "운행 완료",
};

const TabMatcher = {
  matchInnerTypeToExternalType: (
    activeTab: BookType | ScheduleType,
  ): string => {
    return MAPPING_TABLE[activeTab];
  },
};

export default TabMatcher;
