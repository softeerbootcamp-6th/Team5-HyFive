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
  mode: "view" | "edit";
}
