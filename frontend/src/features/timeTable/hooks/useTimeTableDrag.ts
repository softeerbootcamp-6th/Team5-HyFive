import type {
  AvailableTimeSlotType,
  TimeTableMode,
} from "@/features/timeTable/TimeTable.type";
import { dragHandlers } from "@/features/timeTable/services/dragHandlers";
import { useTimeTableDragState } from "./useTimeTableDragState";
import { useTimeTableSlots } from "./useTimeTableSlots";
import { useDocumentEventListener } from "./useDocumentEventListener";

interface useTimeTableDragProps {
  mode: TimeTableMode;
  selectedWeek: Date[];
  availableTimeSlots: AvailableTimeSlotType[];
  onSlotsUpdate?: (slots: AvailableTimeSlotType[]) => void;
  setPreviewSlot: (slot: AvailableTimeSlotType | null) => void;
}

/**
 * 타임테이블 드래그 앤 드롭 기능을 관리하는 메인 훅
 * 드래그 상태 관리, 슬롯 생성/병합/삭제, 이벤트 처리를 담당
 */
export const useTimeTableDrag = ({
  mode,
  selectedWeek,
  availableTimeSlots,
  onSlotsUpdate,
  setPreviewSlot,
}: useTimeTableDragProps) => {
  // 드래그 상태 관리
  const { dragState, setDragState } = useTimeTableDragState();

  // 슬롯 관련 로직
  const { finalizeDrag, deleteSlot } = useTimeTableSlots({
    mode,
    selectedWeek,
    availableTimeSlots,
    onSlotsUpdate,
    setPreviewSlot,
    dragState,
    setDragState,
  });

  // 문서 레벨 이벤트 리스너
  useDocumentEventListener({ finalizeDrag });

  // 셀 위에 마우스가 클릭되었을 때
  const handleCellMouseDown = (dayIndex: number, hourIndex: number) => {
    dragHandlers.handleCellMouseDown(
      dayIndex,
      hourIndex,
      mode,
      dragState,
      availableTimeSlots,
      selectedWeek,
      setDragState,
      setPreviewSlot,
    );
  };

  // 드래그 중인 상태로 셀 위에 마우스가 들어왔을 때
  const handleCellMouseEnter = (dayIndex: number, hourIndex: number) => {
    dragHandlers.handleCellMouseEnter(
      dayIndex,
      hourIndex,
      mode,
      dragState,
      selectedWeek,
      setDragState,
      setPreviewSlot,
    );
  };

  return {
    // 상태
    dragState,

    // 핸들러
    handleCellMouseDown,
    handleCellMouseEnter,
    deleteSlot,
  };
};
