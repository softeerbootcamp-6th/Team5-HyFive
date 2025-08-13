import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";

/**
 * 주어진 날짜가 오늘인지 확인합니다.
 * @param date 확인할 날짜
 * @returns 오늘이면 true, 아니면 false
 */
export const isCurrentDay = (date: Date): boolean => {
  const today = new Date();
  return isSameDay(date, today);
};

/**
 * 날짜를 일(day) 형식으로 포맷합니다.
 * @param date 포맷팅할 날짜
 * @returns 일 문자열 (ex: "1", "2", ..., "31")
 */
export const formatDateNumber = (date: Date): string => {
  return format(date, "d");
};

/**
 * 날짜를 요일 형식으로 포맷합니다.
 * @param date 포맷팅할 날짜
 * @returns 요일 문자열 (ex: "월요일", "화요일", ..., "일요일")
 */
export const formatDayOfWeek = (date: Date): string => {
  return `${format(date, "E", { locale: ko })}요일`;
};

/**
 * 시간을 "HH:mm" 형식으로 포맷합니다.
 * @param time 시간 (0-23)
 * @returns 시간 문자열 (ex: "0:00", "1:00", ..., "23:00")
 */
export const formatHourWithColons = (hour: number): string => {
  return `${hour}:00`;
};
