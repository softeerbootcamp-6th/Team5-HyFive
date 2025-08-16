import {
  formatTimeToHHMM,
  formatTimeToNumber,
} from "@/features/calender/Calender.util";
import type { AvailableTimeSlotType } from "@/features/timeTable/TimeTable.type";

export const slotMerger = {
  /**
   * 새로운 슬롯과 겹치는 기존 슬롯들을 병합
   * @param newSlot 새로 생성된 슬롯
   * @param existingSlots 병합할 기존 슬롯들
   * @returns 병합된 슬롯
   */
  mergeSlots: (
    newSlot: AvailableTimeSlotType,
    existingSlots: AvailableTimeSlotType[],
  ): AvailableTimeSlotType => {
    const newStartHour = formatTimeToNumber(newSlot.rentalStartTime);
    const newEndHour = formatTimeToNumber(newSlot.rentalEndTime);

    let mergedStartHour = newStartHour;
    let mergedEndHour = newEndHour;

    // 겹치는 슬롯들의 시작과 끝 시간을 통합
    existingSlots.forEach((slot) => {
      const slotStartHour = formatTimeToNumber(slot.rentalStartTime);
      const slotEndHour = formatTimeToNumber(slot.rentalEndTime);

      mergedStartHour = Math.min(mergedStartHour, slotStartHour);
      mergedEndHour = Math.max(mergedEndHour, slotEndHour);
    });

    // 통합된 슬롯 생성
    return {
      rentalDate: newSlot.rentalDate,
      rentalStartTime: formatTimeToHHMM(mergedStartHour),
      rentalEndTime: formatTimeToHHMM(mergedEndHour),
    };
  },

  /**
   * 슬롯 배열을 병합하여 새로운 배열 생성
   * @param newSlot 추가할 새로운 슬롯
   * @param availableTimeSlots 기존 슬롯 배열
   * @param overlappingSlots 겹치는 슬롯들
   * @returns 병합된 새로운 슬롯 배열
   */
  createMergedSlotArray: (
    newSlot: AvailableTimeSlotType,
    availableTimeSlots: AvailableTimeSlotType[],
    overlappingSlots: AvailableTimeSlotType[],
  ): AvailableTimeSlotType[] => {
    if (overlappingSlots.length > 0) {
      const mergedSlot = slotMerger.mergeSlots(newSlot, overlappingSlots);
      const remainingSlots = availableTimeSlots.filter(
        (slot) => !overlappingSlots.includes(slot),
      );

      return [mergedSlot, ...remainingSlots];
    } else {
      // 겹치는 슬롯이 없으면 그냥 추가
      return [newSlot, ...availableTimeSlots];
    }
  },
};
