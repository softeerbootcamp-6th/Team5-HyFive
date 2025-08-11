import type { AvailableTimeSlot as AvailableTimeSlotType } from "../TimeTable/TimeTable.type";
import { getTimeBlockGridStyle } from "../TimeTable/TimeTable.style";

interface AvailableTimeSlotProps {
  block: AvailableTimeSlotType;
  selectedWeek: Date[];
}

const AvailableTimeSlot = ({ block, selectedWeek }: AvailableTimeSlotProps) => {
  return (
    <div css={getTimeBlockGridStyle(block, selectedWeek)}>
      <header>유휴 시간</header>
      <time dateTime={`${block.rentalStartTime}/${block.rentalEndTime}`}>
        {block.rentalStartTime} ~ {block.rentalEndTime}
      </time>
    </div>
  );
};

export default AvailableTimeSlot;
