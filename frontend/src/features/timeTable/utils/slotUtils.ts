import type { AvailableTimeSlotType } from "@/features/timeTable/TimeTable.type";

/**
 * 슬롯 관련 유틸리티 함수들
 */
export const slotUtils = {
  /**
   * 두 개의 시간 슬롯이 동일한지 확인합니다.
   * @param a 첫 번째 시간 슬롯
   * @param b 두 번째 시간 슬롯
   * @returns 동일하면 true, 아니면 false
   */
  isSameSlot: (a: AvailableTimeSlotType, b: AvailableTimeSlotType): boolean => {
    return (
      a.rentalDate === b.rentalDate &&
      a.rentalStartTime === b.rentalStartTime &&
      a.rentalEndTime === b.rentalEndTime
    );
  },

  /**
   * 슬롯 배열에서 특정 슬롯을 찾아 제거합니다.
   * @param slots 슬롯 배열
   * @param targetSlot 제거할 대상 슬롯
   * @returns 대상 슬롯이 제거된 새로운 배열
   */
  removeSlot: (
    slots: AvailableTimeSlotType[],
    targetSlot: AvailableTimeSlotType,
  ): AvailableTimeSlotType[] => {
    return slots.filter((slot) => !slotUtils.isSameSlot(slot, targetSlot));
  },

  /**
   * 슬롯 배열에 새로운 슬롯을 추가합니다.
   * @param slots 기존 슬롯 배열
   * @param newSlot 추가할 새로운 슬롯
   * @returns 새로운 슬롯이 추가된 배열
   */
  addSlot: (
    slots: AvailableTimeSlotType[],
    newSlot: AvailableTimeSlotType,
  ): AvailableTimeSlotType[] => {
    return [newSlot, ...slots];
  },
};
