import { format } from "date-fns";

/**
 * 주어진 날짜를 "yyyy년 M월" 형식으로 반환한다. 예) 2025년 8월
 * @param {Date} date - 포맷할 대상 날짜 객체
 * @return {string} 포맷된 날짜 문자열
 *
 * @author 유재민
 */
export const getYearMonth = (date: Date): string => {
  return format(date, "yyyy년 M월");
};
