import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  format,
} from "date-fns";

/**
 * 주어진 날짜를 "yyyy년 M월" 형식으로 반환합니다.
 * @param {Date} date - 포맷할 대상 날짜 객체
 * @return {string} 포맷된 날짜 문자열
 *
 * @author 유재민
 */
export const getYearMonth = (date: Date): string => {
  return format(date, "yyyy년 M월");
};

/**
 * 기준 날짜가 속한 월의 전체 달력 데이터를 주 단위(7일) 배열로 반환합니다.
 *
 * 예를 들어 2025년 8월이라면,
 * 7월 말 ~ 9월 초까지 포함한 총 6주치 날짜 배열을 생성합니다.
 *
 * @param {Date} baseDate - 기준이 되는 날짜 (예: 현재 선택된 날짜)
 * @return {Date[][]} 주 단위(7일)로 나눈 날짜 배열
 *
 * @author 유재민
 */
export const generateCalendarMatrix = (baseDate: Date): Date[][] => {
  // baseDate의 시작 날짜가 포함된 주의 일요일을 시작 날짜로 초기화
  const startDate = startOfWeek(startOfMonth(baseDate), { weekStartsOn: 0 });
  const endDate = endOfWeek(endOfMonth(baseDate), { weekStartsOn: 0 });

  const matrix: Date[][] = [];
  let current = startDate;
  let week: Date[] = [];

  // 시작 날짜부터 주 단위 배열을 생성
  while (current <= endDate) {
    week.push(current);
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
    current = addDays(current, 1);
  }

  return matrix;
};

/**
 * 오늘인지 확인합니다.
 * @param target 비교할 날짜
 * @returns 오늘이면 true
 * @author 유재민
 */
export const isToday = (target: Date): boolean => {
  return isSameDay(target, new Date());
};

/**
 * 같은 월인지 확인합니다.
 * @param target 비교할 날짜
 * @param base 기준 날짜
 * @returns 같은 월이면 true
 * @author 유재민
 */
export const isCurrentMonth = (target: Date, base: Date) => {
  return isSameMonth(target, base);
};

/**
 * 선택된 날짜인지 확인합니다.
 * @param target 비교할 날짜
 * @param selected 선택된 날짜
 * @returns 같으면 true
 * @author 유재민
 */
export const isSelectedDate = (target: Date, selected: Date) => {
  return isSameDay(target, selected);
};
