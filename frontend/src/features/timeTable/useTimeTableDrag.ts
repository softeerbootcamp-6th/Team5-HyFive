import {
  formatTimeToHHMM,
  formatTimeToNumber,
  getDayIndex,
} from "@/features/calender/Calender.util";
import { changeSlotFormatForDomain } from "@/features/timeTable/GridConverter";
import { TIME_TABLE_CONFIG } from "@/features/timeTable/TimeTable.constants";
import type {
  AvailableTimeSlotType,
  TimeTableMode,
} from "@/features/timeTable/TimeTable.type";
import { useState, useEffect, useCallback } from "react";

interface DragState {
  isDragging: boolean;
  startPosition: { dayIndex: number; hourIndex: number } | null;
  currentPosition: { dayIndex: number; hourIndex: number } | null;
}

interface useTimeTableDragProps {
  mode: TimeTableMode;
  selectedWeek: Date[];
  availableTimeSlots: AvailableTimeSlotType[];
  onSlotsUpdate?: (slots: AvailableTimeSlotType[]) => void;
  setPreviewSlot: (slot: AvailableTimeSlotType | null) => void;
}

export const useTimeTableDrag = ({
  mode,
  selectedWeek,
  availableTimeSlots,
  onSlotsUpdate,
  setPreviewSlot,
}: useTimeTableDragProps) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startPosition: null,
    currentPosition: null,
  });

  const handleCellMouseDown = (dayIndex: number, hourIndex: number) => {
    if (mode !== "edit") return;
    if (dragState.isDragging) return;

    // 해당 위치에 이미 슬롯이 있는지 확인
    const isSlotExists = availableTimeSlots.some((slot) =>
      isSlotAtPosition(slot, dayIndex, hourIndex, selectedWeek),
    );

    if (isSlotExists) {
      // TODO: 이미 슬롯이 있는 경우, 기존 시간을 수정하게끔 구현
      // 임시로 슬롯이 있는 경우는 드래그를 시작하지 않음

      return;
    }

    setDragState({
      isDragging: true,
      startPosition: { dayIndex, hourIndex },
      currentPosition: { dayIndex, hourIndex },
    });

    const previewSlot = changeSlotFormatForDomain(
      dayIndex,
      hourIndex,
      hourIndex,
      selectedWeek,
    );
    setPreviewSlot(previewSlot);
  };

  const handleCellMouseEnter = (dayIndex: number, hourIndex: number) => {
    if (mode !== "edit") return;
    if (!dragState.isDragging) return;
    if (dragState.startPosition?.dayIndex !== dayIndex) return; // 가로 드래그 무시
    if (dragState.startPosition?.hourIndex > hourIndex) return; // 윗쪽 드래그 무시

    const startHourIndex = dragState.startPosition!.hourIndex;
    const endHourIndex = hourIndex;

    const previewSlot = changeSlotFormatForDomain(
      dayIndex,
      startHourIndex,
      endHourIndex,
      selectedWeek,
    );
    setPreviewSlot(previewSlot);

    setDragState((prev) => ({
      ...prev,
      currentPosition: { dayIndex, hourIndex },
    }));
  };

  const finalizeDrag = useCallback(() => {
    if (canFinalizeDrag(dragState)) {
      const newSlot = createSlotFromDrag(
        dragState.startPosition!,
        dragState.currentPosition!,
        selectedWeek,
      );

      const overlappingSlots = findOverlappingSlots(
        newSlot,
        availableTimeSlots,
        selectedWeek,
      );

      if (overlappingSlots.length > 0) {
        const mergedSlot = mergeSlots(newSlot, overlappingSlots);
        const remainingSlots = availableTimeSlots.filter(
          (slot) => !overlappingSlots.includes(slot),
        );

        const newSlotData = [mergedSlot, ...remainingSlots];
        onSlotsUpdate?.(newSlotData);
      } else {
        // 겹치는 슬롯이 없으면 그냥 추가
        const newSlotData = [newSlot, ...availableTimeSlots];
        onSlotsUpdate?.(newSlotData);
      }
      setPreviewSlot(null);
      resetDrag(setDragState);
    }
  }, [
    dragState,
    onSlotsUpdate,
    selectedWeek,
    availableTimeSlots,
    setPreviewSlot,
  ]);

  useEffect(() => {
    const onMouseUp = () => finalizeDrag();

    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [finalizeDrag]);

  return {
    // 상태
    dragState,

    // 핸들러
    handleCellMouseDown,
    handleCellMouseEnter,
  };
};

const findOverlappingSlots = (
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
};

const isSlotAtPosition = (
  slot: AvailableTimeSlotType,
  dayIndex: number,
  hourIndex: number,
  selectedWeek: Date[],
): boolean => {
  const slotDayIndex = getDayIndex(slot.rentalDate, selectedWeek);
  const startHour = formatTimeToNumber(slot.rentalStartTime);
  const endHour = formatTimeToNumber(slot.rentalEndTime);

  const isInHourRange =
    hourIndex >= startHour - TIME_TABLE_CONFIG.START_HOUR &&
    hourIndex < endHour - TIME_TABLE_CONFIG.START_HOUR;

  return slotDayIndex === dayIndex && isInHourRange;
};

const createSlotFromDrag = (
  startPosition: { dayIndex: number; hourIndex: number },
  currentPosition: { dayIndex: number; hourIndex: number },
  selectedWeek: Date[],
): AvailableTimeSlotType => {
  const dayIndex = startPosition.dayIndex;
  const startHour = startPosition.hourIndex;
  const endHour = currentPosition.hourIndex;

  return changeSlotFormatForDomain(dayIndex, startHour, endHour, selectedWeek);
};

const canFinalizeDrag = (state: DragState): boolean => {
  const { isDragging, startPosition, currentPosition } = state;
  if (!isDragging || !startPosition || !currentPosition) return false;

  const isSameDay = startPosition.dayIndex === currentPosition.dayIndex;
  const isDownward = startPosition.hourIndex < currentPosition.hourIndex;
  const hasMinLength = currentPosition.hourIndex - startPosition.hourIndex >= 1;

  return isSameDay && isDownward && hasMinLength;
};

const resetDrag = (
  setDragState: React.Dispatch<React.SetStateAction<DragState>>,
) => {
  setDragState({
    isDragging: false,
    startPosition: null,
    currentPosition: null,
  });
};

const mergeSlots = (
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
};
