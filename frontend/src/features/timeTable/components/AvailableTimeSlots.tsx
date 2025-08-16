import AvailableTimeSlot from "@/features/timeTable/components/AvailableTimeSlot";
import type {
  AvailableTimeSlotType,
  TimeTableMode,
} from "@/features/timeTable/TimeTable.type";

interface AvailableTimeSlotsType {
  availableTimeData: AvailableTimeSlotType[];
  selectedWeek: Date[];
  mode: TimeTableMode;
  onDelete: (slot: AvailableTimeSlotType) => void;
  disabled: boolean;
}

const AvailableTimeSlots = ({
  availableTimeData,
  selectedWeek,
  mode,
  onDelete,
  disabled,
}: AvailableTimeSlotsType) => {
  return (
    <>
      {availableTimeData.map((slot) => (
        <AvailableTimeSlot
          key={`${slot.rentalDate}-${slot.rentalStartTime}-${slot.rentalEndTime}`}
          slot={slot}
          selectedWeek={selectedWeek}
          variant="default"
          mode={mode}
          onDelete={onDelete}
          disabled={disabled}
        />
      ))}
    </>
  );
};

export default AvailableTimeSlots;
