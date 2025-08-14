import { TIME_TABLE_CONFIG } from "@/features/timeTable/TimeTable.constants";
import type {
  AvailableTimeSlotType,
  TimeTableMode,
} from "@/features/timeTable/TimeTable.type";
import { formatHourWithColons } from "@/features/timeTable/TimeTable.util";
import { format } from "date-fns";
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
}

export const useTimeTableDrag = ({
  mode,
  selectedWeek,
  availableTimeSlots,
  onSlotsUpdate,
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
  };

  const handleCellMouseEnter = (dayIndex: number, hourIndex: number) => {
    if (mode !== "edit") return;

    if (!dragState.isDragging) return;

    // 가로 드래그 무시
    if (dragState.startPosition?.dayIndex !== dayIndex) return;

    // 윗쪽 드래그 무시
    if (dragState.startPosition?.hourIndex > hourIndex) return;

    // TODO: 이미 데이터 있을 때 처리

    setDragState((prev) => ({
      ...prev,
      currentPosition: { dayIndex, hourIndex },
    }));
  };

  const finalizeDrag = useCallback(() => {
    const state = dragState;
    if (!canFinalizeDrag(state)) {
      resetDrag(setDragState);
      return;
    }

    const newSlot = createSlotFromDrag(
      dragState.startPosition!,
      dragState.currentPosition!,
      selectedWeek,
    );
    const newSlotData = [newSlot, ...availableTimeSlots];
    onSlotsUpdate?.(newSlotData);

    resetDrag(setDragState);
  }, [dragState, onSlotsUpdate, selectedWeek, availableTimeSlots]);

  useEffect(() => {
    const onMouseUp = () => finalizeDrag();

    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [finalizeDrag]);

  const isPreviewCell = useCallback(
    (dayIndex: number, hourIndex: number) => {
      if (mode !== "edit") return false;
      const { isDragging, startPosition, currentPosition } = dragState;

      if (!isDragging || !startPosition || !currentPosition) {
        return false;
      }

      return (
        dayIndex === startPosition.dayIndex &&
        hourIndex >= startPosition.hourIndex &&
        hourIndex <= currentPosition.hourIndex
      );
    },
    [dragState, mode],
  );

  return {
    // 상태
    dragState,

    // 핸들러
    handleCellMouseDown,
    handleCellMouseEnter,

    // 유틸리티
    isPreviewCell,
  };
};

const isSlotAtPosition = (
  slot: AvailableTimeSlotType,
  dayIndex: number,
  hourIndex: number,
  selectedWeek: Date[],
): boolean => {
  // slot의 날짜 인덱스 찾기
  const slotDayIndex = selectedWeek.findIndex(
    (date) => format(date, "yyyy-MM-dd") === slot.rentalDate,
  );

  const startHour = parseInt(slot.rentalStartTime.split(":")[0], 10);
  const endHour = parseInt(slot.rentalEndTime.split(":")[0], 10);

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
  const slotDay = selectedWeek[startPosition.dayIndex];
  const startHour = startPosition.hourIndex + TIME_TABLE_CONFIG.START_HOUR;
  const endHour = currentPosition.hourIndex + TIME_TABLE_CONFIG.START_HOUR + 1; // 완료시간은 표 기준 +1시간이어야 하기 때문
  const rentalDate = format(slotDay, "yyyy-MM-dd");

  return {
    rentalDate,
    rentalStartTime: formatHourWithColons(startHour),
    rentalEndTime: formatHourWithColons(endHour),
  };
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
