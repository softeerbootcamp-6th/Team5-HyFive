import type { BookType } from "@/features/book/Book.types";

const MAPPING_TABLE = {
  pending: "신규 예약",
  success: "예약 성공",
  fail: "예약 실패",
};
const TabMatcher = {
  matchInnerTypeToExternalType: (activeTab: BookType): string => {
    return MAPPING_TABLE[activeTab];
  },
};

export default TabMatcher;
