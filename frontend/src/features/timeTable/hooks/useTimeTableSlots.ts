import type {
  AvailableTimeSlotType,
  TimeTableMode,
} from "@/features/timeTable/TimeTable.type";
import { dragHandlers } from "@/features/timeTable/services/dragHandlers";
import { slotValidator } from "@/features/timeTable/services/slotValidator";
import { slotMerger } from "@/features/timeTable/services/slotMerger";
import { useCallback } from "react";

interface DragState {
  isDragging: boolean;
  startPosition: { dayIndex: number; hourIndex: number } | null;
  currentPosition: { dayIndex: number; hourIndex: number } | null;
}

interface useTimeTableSlotsProps {
  mode: TimeTableMode;
  selectedWeek: Date[];
  availableTimeSlots: AvailableTimeSlotType[];
  onSlotsUpdate?: (slots: AvailableTimeSlotType[]) => void;
  setPreviewSlot: (slot: AvailableTimeSlotType | null) => void;
  dragState: DragState;
  setDragState: React.Dispatch<React.SetStateAction<DragState>>;
}

export const useTimeTableSlots = ({
  mode,
  selectedWeek,
  availableTimeSlots,
  onSlotsUpdate,
  setPreviewSlot,
  dragState,
  setDragState,
}: useTimeTableSlotsProps) => {
  /**
   * 드래그를 완료하고 새로운 슬롯을 생성/병합
   */
  const finalizeDrag = useCallback(() => {
    if (
      !dragState.isDragging ||
      !dragState.startPosition ||
      !dragState.currentPosition
    ) {
      return;
    }

    if (dragHandlers.canFinalizeDrag(dragState)) {
      const newSlot = dragHandlers.createSlotFromDrag(
        dragState.startPosition,
        dragState.currentPosition,
        selectedWeek,
      );

      const overlappingSlots = slotValidator.findOverlappingSlots(
        newSlot,
        availableTimeSlots,
        selectedWeek,
      );

      const newSlotData = slotMerger.createMergedSlotArray(
        newSlot,
        availableTimeSlots,
        overlappingSlots,
      );

      onSlotsUpdate?.(newSlotData);
      setPreviewSlot(null);
      dragHandlers.resetDrag(setDragState);
    }
  }, [
    dragState,
    onSlotsUpdate,
    selectedWeek,
    availableTimeSlots,
    setPreviewSlot,
    setDragState,
  ]);

  /**
   * 지정된 슬롯을 삭제
   */
  const deleteSlot = useCallback(
    (targetSlot: AvailableTimeSlotType) => {
      if (mode !== "edit") return;

      const updatedSlots = availableTimeSlots.filter(
        (slot) =>
          !(
            slot.rentalDate === targetSlot.rentalDate &&
            slot.rentalStartTime === targetSlot.rentalStartTime &&
            slot.rentalEndTime === targetSlot.rentalEndTime
          ),
      );

      onSlotsUpdate?.(updatedSlots);
    },
    [mode, availableTimeSlots, onSlotsUpdate],
  );

  return {
    finalizeDrag,
    deleteSlot,
  };
};
