import {
  formatDateToYYMMDD,
  formatTimeToHHMM,
  formatTimeToNumber,
  getDayIndex,
} from "@/features/calender/Calender.util";
import { TIME_TABLE_CONFIG } from "@/features/timeTable/TimeTable.constants";
import type { AvailableTimeSlotType } from "@/features/timeTable/TimeTable.type";

export interface GridSlotFormat {
  dayIndex: number;
  startHourIndex: number;
  endHourIndex: number;
}

/**
 * 백엔드에서 받은 유휴시간 데이터를 그리드에 맞는 형식으로 변환합니다.
 * @param block 유휴시간 데이터
 * @param selectedWeek 현재 선택된 주
 * @returns - grid에서 해당 날짜 / 시간에 맞는 형식으로 변환된 데이터
 */
export const changeSlotFormatForGrid = (
  block: AvailableTimeSlotType,
  selectedWeek: Date[],
): GridSlotFormat => {
  const { rentalDate, rentalStartTime, rentalEndTime } = block;

  const dayIndex = getDayIndex(rentalDate, selectedWeek);

  const startHour = formatTimeToNumber(rentalStartTime);
  const endHour = formatTimeToNumber(rentalEndTime);

  const startHourIndex = startHour - TIME_TABLE_CONFIG.START_HOUR;
  const endHourIndex = endHour - TIME_TABLE_CONFIG.START_HOUR;

  if (dayIndex === -1) {
    throw new Error("Invalid rental date");
  }

  return { dayIndex, startHourIndex, endHourIndex };
};

/**
 * drag 상태의 데이터를 유휴시간 데이터 형식으로 변환합니다.
 * @param dayIndex 드래그 시작 위치의 날짜 인덱스
 * @param startPosition 드래그 시작 위치
 * @param currentPosition 드래그 현재 위치
 * @param selectedWeek 현재 선택된 주
 */
export const changeSlotFormatForDomain = (
  dayIndex: number,
  startPosition: number,
  currentPosition: number,
  selectedWeek: Date[],
): AvailableTimeSlotType => {
  const slotDay = selectedWeek[dayIndex];
  const slotStartHour = startPosition + TIME_TABLE_CONFIG.START_HOUR;
  const slotEndHour = currentPosition + TIME_TABLE_CONFIG.START_HOUR + 1;

  const rentalDate = formatDateToYYMMDD(slotDay);
  const rentalStartTime = formatTimeToHHMM(slotStartHour);
  const rentalEndTime = formatTimeToHHMM(slotEndHour);

  return { rentalDate, rentalStartTime, rentalEndTime };
};

/**
 * 배열 데이터를 한 번에 포맷팅 하기 위한 wrapper 함수입니다.
 * @param blocks 유휴시간 데이터 배열
 * @param selectedWeek 선택된 주
 * @returns 그리드 형식으로 변환된 유휴시간 데이터 배열
 */
export const changeSlotFormatForGridList = (
  blocks: AvailableTimeSlotType[],
  selectedWeek: Date[],
): GridSlotFormat[] => {
  return blocks.map((block) => changeSlotFormatForGrid(block, selectedWeek));
};
