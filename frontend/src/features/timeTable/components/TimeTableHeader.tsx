import {
  formatDateNumber,
  formatDayOfWeek,
  isCurrentDay,
} from "@/features/timeTable/utils/TimeTable.util";
import {
  TableHeader,
  TimeAxisPlaceholder,
  DayCell,
  getDateLabelStyle,
  getDayLabelStyle,
} from "../TimeTable.style";

interface TimeTableHeaderProps {
  selectedWeek: Date[];
}

const TimeTableHeader = ({ selectedWeek }: TimeTableHeaderProps) => {
  return (
    <div css={TableHeader}>
      <div css={TimeAxisPlaceholder} />
      {selectedWeek.map((date) => (
        <div key={date.toISOString()} css={DayCell}>
          <div css={getDateLabelStyle(isCurrentDay(date))}>
            {formatDateNumber(date)}
          </div>
          <div css={getDayLabelStyle(isCurrentDay(date))}>
            {formatDayOfWeek(date)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeTableHeader;
