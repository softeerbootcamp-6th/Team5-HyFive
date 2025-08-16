import { TIME_TABLE_CONFIG } from "@/features/timeTable/TimeTable.constants";
import { TimeLabel } from "@/features/timeTable/TimeTable.style";
import { formatHourWithColons } from "@/features/timeTable/utils/TimeTable.util";
import { memo } from "react";

interface TimeLabelsProps {
  startHour?: number;
  totalHours?: number;
}

const TimeLabels = ({
  startHour = TIME_TABLE_CONFIG.START_HOUR,
  totalHours = TIME_TABLE_CONFIG.TOTAL_HOURS,
}: TimeLabelsProps) => {
  const hours = Array.from({ length: totalHours }, (_, i) => startHour + i);

  return (
    <>
      {hours.map((hour, hourIndex) => (
        <div
          key={hour}
          data-testid={`time-label`}
          css={TimeLabel}
          style={{ gridColumn: 1, gridRow: hourIndex + 1 }}
        >
          {formatHourWithColons(hour)}
        </div>
      ))}
    </>
  );
};

export default memo(TimeLabels);
