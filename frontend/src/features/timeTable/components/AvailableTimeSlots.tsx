import AvailableTimeSlot from "@/features/timeTable/components/AvailableTimeSlot";
import type {
  AvailableTimeSlotType,
  TimeTableMode,
} from "@/features/timeTable/TimeTable.type";

interface AvailableTimeSlotsType {
  availableTimeData: AvailableTimeSlotType[];
  selectedWeek: Date[];
  mode: TimeTableMode;
  onDelete: (block: AvailableTimeSlotType) => void;
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
      {availableTimeData.map((block) => (
        <AvailableTimeSlot
          key={`${block.rentalDate}-${block.rentalStartTime}-${block.rentalEndTime}`}
          block={block}
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
