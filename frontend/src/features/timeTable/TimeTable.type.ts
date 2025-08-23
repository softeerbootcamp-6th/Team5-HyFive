export interface AvailableTimeSlotType {
  rentalDate: string;
  rentalStartTime: string;
  rentalEndTime: string;
}

export interface TimeTableConfig {
  startHour: number;
  endHour: number;
}

export interface CellPosition {
  dayIndex: number;
  hourIndex: number;
}

export interface TimeTableProps {
  selectedCarId: number;
  selectedWeek: Date[];
  mode: TimeTableMode;
  showActionButtons?: boolean;
  isEditableWeek?: boolean;
  isEditMode?: boolean;
  onEditModeChange?: (isEditMode: boolean) => void;
}

export type TimeTableMode = "view" | "edit";
