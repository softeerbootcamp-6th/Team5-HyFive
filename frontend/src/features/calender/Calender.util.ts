import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  format,
  startOfDay,
  isBefore,
  isAfter,
} from "date-fns";

export const WEEKDAYS_KR = ["일", "월", "화", "수", "목", "금", "토"] as const;

/**
 * 주어진 날짜를 "yyyy년 M월" 형식으로 반환합니다.
 * @param {Date} date - 포맷할 대상 날짜 객체
 * @return {string} 포맷된 날짜 문자열
 *
 */
export const getYearMonth = (date: Date): string => {
  return format(date, "yyyy년 M월");
};

/**
 * 주어진 날짜를 "yyyy-MM-dd" 형식의 문자열로 변환합니다.
 * @param {Date} date - 포맷할 날짜 객체
 * @returns {string} "yyyy-MM-dd" 형식의 날짜 문자열
 */
export const formatDateToYYMMDD = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

/**
 * 주어진 시각을 "HH:mm" 형식의 문자열로 변환합니다.
 * @param {number} hour - 포맷팅 할 시각(9 ~ 23)
 * @param {number} minute - 포맷팅 할 분(0 ~ 59) (없으면 00으로 적용)
 * @returns {string} - "HH:mm" 형식의 시간 문자열
 */
export const formatTimeToHHMM = (hour: number, minute: number = 0): string => {
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  return format(date, "HH:mm");
};

/**
 * HH:mm 형식의 시간을 숫자로 변환합니다.
 * @param {string} time - "HH:mm" 형식의 시간 문자열
 * @returns {number} - 시간 숫자 (0 ~ 23)
 */
export const formatTimeToNumber = (time: string): number => {
  return parseInt(time.split(":")[0], 10);
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
 */
export const isToday = (target: Date): boolean => {
  return isSameDay(target, new Date());
};

/**
 * 같은 월인지 확인합니다.
 * @param target 비교할 날짜
 * @param base 기준 날짜
 * @returns 같은 월이면 true
 */
export const isCurrentMonth = (target: Date, base: Date) => {
  return isSameMonth(target, base);
};

/**
 * 선택된 날짜인지 확인합니다.
 * @param target 비교할 날짜
 * @param selected 선택된 날짜
 * @returns 같으면 true
 */
export const isSelectedDate = (target: Date, selected: Date) => {
  return isSameDay(target, selected);
};

/** 현재 선택된 날짜가 week 배열에 포함되어있는지 확인합니다.
 * @param week - 날짜 배열 (주 단위)
 * @param selectedDate - 선택된 날짜
 * @returns 선택된 날짜가 주 배열에 포함되어있으면 true, 아니면 false
 *
 */
export const isSelectedWeek = (
  week: Date[],
  selectedDate: Date | null,
): boolean => {
  if (!selectedDate) return false;
  return week.some((day) => isSelectedDate(day, selectedDate));
};

/**
 * 주어진 날짜가 포함된 주의 일요일부터 토요일까지 7일 배열을 반환합니다.
 * @param date - 기준이 되는 날짜
 * @returns 일요일부터 토요일까지의 날짜 배열 (7개)
 */
export const getWeekRange = (date: Date): Date[] => {
  const startOfCurrentWeek = startOfWeek(date, { weekStartsOn: 0 });
  return Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));
};

/**
 * 특정 날짜가 선택된 날짜인지 확인합니다.
 * @param day - 확인할 날짜
 * @param selectedDate - 선택된 날짜 (null 가능)
 * @returns 해당 날짜가 선택된 날짜이면 true, 아니면 false
 */
export const checkIsDaySelected = (
  day: Date,
  selectedDate: Date | null,
): boolean => {
  return Boolean(selectedDate && isSelectedDate(day, selectedDate));
};

/**
 * 날짜를 문자열로 받아 선택된 주 배열에서 몇 번째 인덱스에 위치하는지 반환합니다.
 * @param dateString - 비교할 날짜 문자열 (예: "2025-08-01")
 * @param selectedWeek - 선택된 주 배열
 * @returns - 날짜 문자열이 포함된 주의 인덱스
 */
export const getDayIndex = (
  dateString: string,
  selectedWeek: Date[],
): number => {
  return selectedWeek.findIndex(
    (date) => formatDateToYYMMDD(date) === dateString,
  );
};

/**
 * 주어진 dayIndex에 해당하는 날짜를 "yyyy-MM-dd" 형식으로 반환합니다.
 * @param dayIndex - 날짜 인덱스
 * @param selectedWeek - 선택된 주 배열
 * @returns - 해당 날짜
 */
export const getDateFromDayIndex = (
  dayIndex: number,
  selectedWeek: Date[],
): string => {
  if (dayIndex < 0 || dayIndex >= selectedWeek.length) {
    throw new Error("Invalid day index");
  }

  return formatDateToYYMMDD(selectedWeek[dayIndex]);
};

/**
 * 문자열 형식의 날짜가 오늘보다 이전인지 확인합니다.
 * @param dateString - "yyyy-MM-dd" 형식의 날짜 문자열
 * @returns 이전 날짜이면 true, 아니면 false
 */
export const isBeforeToday = (dateString: string): boolean => {
  const targetDate = new Date(dateString);
  const today = startOfDay(new Date());
  return isBefore(targetDate, today);
};

/**
 * 현재 선택된 주가 2주 이후인지 확인합니다. (기획을 위함)
 * @param week 날짜 배열 (주 단위)
 * @returns 현재 선택된 주가 2주 이후이면 true, 아니면 false
 */
export const isFutureWeek = (week: Date[]): boolean => {
  const endOfThisWeek = endOfWeek(new Date(), { weekStartsOn: 0 });

  // 다음 주 마지막 날 (이번 주 마지막 날에서 +7일 후)
  const endOfNextWeek = addDays(endOfThisWeek, 7);

  return week.some((date) => isAfter(startOfDay(date), endOfNextWeek));
};
