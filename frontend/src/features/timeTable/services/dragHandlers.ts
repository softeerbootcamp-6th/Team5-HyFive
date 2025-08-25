import { changeSlotFormatForServer } from "@/features/timeTable/GridConverter";
import type {
  AvailableTimeSlotType,
  TimeTableMode,
} from "@/features/timeTable/TimeTable.type";
import { slotValidator } from "./slotValidator";

interface DragState {
  isDragging: boolean;
  startPosition: { dayIndex: number; hourIndex: number } | null;
  currentPosition: { dayIndex: number; hourIndex: number } | null;
}

export const dragHandlers = {
  /**
   * 셀에서 마우스 다운 이벤트 처리
   * 편집 모드에서만 드래그를 시작하고, 기존 슬롯이 없는 위치에서만 시작 가능
   */
  handleCellMouseDown: (
    dayIndex: number,
    hourIndex: number,
    mode: TimeTableMode,
    dragState: DragState,
    availableTimeSlots: AvailableTimeSlotType[],
    selectedWeek: Date[],
    setDragState: React.Dispatch<React.SetStateAction<DragState>>,
    setPreviewSlot: (slot: AvailableTimeSlotType | null) => void,
  ) => {
    if (mode !== "edit") return;
    if (dragState.isDragging) return;

    // 해당 위치에 이미 슬롯이 있는지 확인
    const isSlotExists = slotValidator.isSlotAtPosition(
      dayIndex,
      hourIndex,
      availableTimeSlots,
      selectedWeek,
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

    const previewSlot = changeSlotFormatForServer(
      dayIndex,
      hourIndex,
      hourIndex,
      selectedWeek,
    );
    setPreviewSlot(previewSlot);
  },

  /**
   * 셀에서 마우스 엔터 이벤트 처리
   * 편집 모드에서 드래그 중일 때 미리보기 슬롯 업데이트
   */
  handleCellMouseEnter: (
    dayIndex: number,
    hourIndex: number,
    mode: TimeTableMode,
    dragState: DragState,
    selectedWeek: Date[],
    setDragState: React.Dispatch<React.SetStateAction<DragState>>,
    setPreviewSlot: (slot: AvailableTimeSlotType | null) => void,
  ) => {
    if (mode !== "edit") return;
    if (!dragState.isDragging) return;
    if (dragState.startPosition?.dayIndex !== dayIndex) return; // 가로 드래그 무시

    const startHourIndex = dragState.startPosition!.hourIndex;
    const endHourIndex = hourIndex;

    const minHour = Math.min(startHourIndex, endHourIndex);
    const maxHour = Math.max(startHourIndex, endHourIndex);

    const previewSlot = changeSlotFormatForServer(
      dayIndex,
      minHour,
      maxHour,
      selectedWeek,
    );
    setPreviewSlot(previewSlot);

    setDragState((prev) => ({
      ...prev,
      currentPosition: { dayIndex, hourIndex },
    }));
  },

  /**
   * 드래그 상태 초기화
   */
  resetDrag: (
    setDragState: React.Dispatch<React.SetStateAction<DragState>>,
  ) => {
    setDragState({
      isDragging: false,
      startPosition: null,
      currentPosition: null,
    });
  },

  /**
   * 드래그 완료 가능 여부 확인
   * 같은 날, 아래쪽 방향, 최소 길이 조건 확인
   */
  canFinalizeDrag: (state: DragState): boolean => {
    const { isDragging, startPosition, currentPosition } = state;
    if (!isDragging || !startPosition || !currentPosition) return false;

    const isSameDay = startPosition.dayIndex === currentPosition.dayIndex;
    const hasMinLength =
      Math.abs(currentPosition.hourIndex - startPosition.hourIndex) >= 1;

    return isSameDay && hasMinLength;
  },

  /**
   * 드래그 상태로부터 새로운 슬롯 생성
   */
  createSlotFromDrag: (
    startPosition: { dayIndex: number; hourIndex: number },
    currentPosition: { dayIndex: number; hourIndex: number },
    selectedWeek: Date[],
  ): AvailableTimeSlotType => {
    const dayIndex = startPosition.dayIndex;
    const startHour = startPosition.hourIndex;
    const endHour = currentPosition.hourIndex;

    const minHour = Math.min(startHour, endHour);
    const maxHour = Math.max(startHour, endHour);

    return changeSlotFormatForServer(dayIndex, minHour, maxHour, selectedWeek);
  },
};
