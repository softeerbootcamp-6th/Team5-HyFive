import type { BookType } from "@/features/book/Book.types";

const TabMatcher = {
  matchInnerTypeToExternalType: (activeTab: BookType): string => {
    if (activeTab === "pending") return "신규 예약";
    if (activeTab === "success") return "예약 성공";
    if (activeTab === "fail") return "예약 실패";
    return "";
  },
};

export default TabMatcher;
