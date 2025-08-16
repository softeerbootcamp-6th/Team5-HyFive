import AvailableTimeSlot from "@/features/timeTable/components/AvailableTimeSlot";
import type { AvailableTimeSlotType } from "@/features/timeTable/TimeTable.type";

interface AvailableTimeSlotsType {
  availableTimeData: AvailableTimeSlotType[];
  selectedWeek: Date[];
}

const AvailableTimeSlots = ({
  availableTimeData,
  selectedWeek,
}: AvailableTimeSlotsType) => {
  return (
    <>
      {availableTimeData.map((block) => (
        <AvailableTimeSlot
          key={`${block.rentalDate}-${block.rentalStartTime}-${block.rentalEndTime}`}
          block={block}
          selectedWeek={selectedWeek}
          variant="default"
        />
      ))}
    </>
  );
};

export default AvailableTimeSlots;
