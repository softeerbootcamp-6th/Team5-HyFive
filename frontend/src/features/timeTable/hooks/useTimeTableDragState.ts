import { useState } from "react";

interface DragState {
  isDragging: boolean;
  startPosition: { dayIndex: number; hourIndex: number } | null;
  currentPosition: { dayIndex: number; hourIndex: number } | null;
}

export const useTimeTableDragState = () => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startPosition: null,
    currentPosition: null,
  });

  return {
    dragState,
    setDragState,
  };
};
