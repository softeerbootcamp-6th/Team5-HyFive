import {
  formatTimeToNumber,
  getDayIndex,
} from "@/features/calender/Calender.util";
import { TIME_TABLE_CONFIG } from "@/features/timeTable/TimeTable.constants";
import type { AvailableTimeSlotType } from "@/features/timeTable/TimeTable.type";

export const slotValidator = {
  /**
   * 지정된 위치에 슬롯이 존재하는지 확인
   * @param dayIndex 요일 인덱스 (0-6)
   * @param hourIndex 시간 인덱스
   * @param availableTimeSlots 기존 슬롯 배열
   * @param selectedWeek 선택된 주
   * @returns 해당 위치에 슬롯이 있으면 true
   */
  isSlotAtPosition: (
    dayIndex: number,
    hourIndex: number,
    availableTimeSlots: AvailableTimeSlotType[],
    selectedWeek: Date[],
  ): boolean => {
    return availableTimeSlots.some((slot) => {
      const slotDayIndex = getDayIndex(slot.rentalDate, selectedWeek);
      const startHour = formatTimeToNumber(slot.rentalStartTime);
      const endHour = formatTimeToNumber(slot.rentalEndTime);

      const isInHourRange =
        hourIndex >= startHour - TIME_TABLE_CONFIG.START_HOUR &&
        hourIndex < endHour - TIME_TABLE_CONFIG.START_HOUR;

      return slotDayIndex === dayIndex && isInHourRange;
    });
  },

  /**
   * 겹치거나 인접한 슬롯들을 찾기
   * @param newSlot 새로 생성된 슬롯
   * @param existingSlots 기존 슬롯 배열
   * @param selectedWeek 선택된 주
   * @returns 겹치거나 인접한 슬롯들의 배열
   */
  findOverlappingSlots: (
    newSlot: AvailableTimeSlotType,
    existingSlots: AvailableTimeSlotType[],
    selectedWeek: Date[],
  ): AvailableTimeSlotType[] => {
    const { rentalDate, rentalStartTime, rentalEndTime } = newSlot;

    const newDayIndex = getDayIndex(rentalDate, selectedWeek);
    const newStartHour = formatTimeToNumber(rentalStartTime);
    const newEndHour = formatTimeToNumber(rentalEndTime);

    const existingSlotsAtSameDay = existingSlots.filter((slot) => {
      const dayIndex = getDayIndex(slot.rentalDate, selectedWeek);
      return dayIndex === newDayIndex;
    });

    // 겹치거나 인접한 슬롯들 찾기
    return existingSlotsAtSameDay.filter((slot) => {
      const oldStartHour = formatTimeToNumber(slot.rentalStartTime);
      const oldEndHour = formatTimeToNumber(slot.rentalEndTime);

      // 1. 겹치는 경우: 시간 범위가 겹침
      const isOverlapping = !(
        newEndHour <= oldStartHour || oldEndHour <= newStartHour
      );

      // 2. 인접한 경우: 새로운 슬롯이 기존 슬롯 바로 위에 있거나 바로 아래에 있음
      const isAdjacentAbove = newEndHour === oldStartHour;
      const isAdjacentBelow = oldEndHour === newStartHour;

      return isOverlapping || isAdjacentAbove || isAdjacentBelow;
    });
  },

  /**
   * 슬롯이 유효한지 검증
   * @param slot 검증할 슬롯
   * @returns 유효하면 true
   */
  isValidSlot: (slot: AvailableTimeSlotType): boolean => {
    const startHour = formatTimeToNumber(slot.rentalStartTime);
    const endHour = formatTimeToNumber(slot.rentalEndTime);

    // 시작 시간이 끝 시간보다 작아야 함
    if (startHour >= endHour) return false;

    // 시간 범위가 허용된 범위 내에 있어야 함
    if (
      startHour < TIME_TABLE_CONFIG.START_HOUR ||
      endHour > TIME_TABLE_CONFIG.END_HOUR
    ) {
      return false;
    }

    return true;
  },
};
