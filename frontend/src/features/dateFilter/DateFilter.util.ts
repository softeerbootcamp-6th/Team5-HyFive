import { format, subDays } from "date-fns";
import type { DateFilterValue } from "./DateFilter.constants";

/**
 * 필터 타입에 따른 날짜를 반환합니다.
 * @param filter "TODAY" | "YESTERDAY" | "WEEK" | "MONTH"
 * @param now 기준 날짜(오늘)
 * @returns
 */
export const getFilterDate = (
  filter: DateFilterValue,
  now: Date = new Date(),
): Date => {
  switch (filter) {
    case "TODAY":
      return now;
    case "YESTERDAY":
      return subDays(now, 1);
    case "WEEK":
      return now;
    case "MONTH":
      return now;
    default:
      return now;
  }
};

/**
 * 필터에 따른 날짜를 포맷하여 반환합니다.
 * @param filter "TODAY" | "YESTERDAY" | "WEEK" | "MONTH"
 * @param refDate 기준 날짜
 * @returns 포맷된 날짜 문자열(MONTH일 때는 월만)
 */
export const formatDateForDisplay = (
  filter: DateFilterValue,
  refDate: Date,
): string => {
  switch (filter) {
    case "MONTH":
      return format(refDate, "yyyy.MM");
    // TODAY, YESTERDAY, WEEK 모두 날짜를 "yyyy.MM.dd"로
    default:
      return format(refDate, "yyyy.MM.dd");
  }
};
