import { getTimeCellStyle } from "@/features/timeTable/TimeTable.style";
import type { TimeTableMode } from "@/features/timeTable/TimeTable.type";

interface TimeCellProps {
  hourIndex: number;
  dayIndex: number;
  mode: TimeTableMode;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
}

const TimeCell = ({
  mode,
  hourIndex,
  dayIndex,
  onMouseDown,
  onMouseEnter,
}: TimeCellProps) => {
  return (
    <div
      css={getTimeCellStyle(mode, hourIndex, dayIndex)}
      style={{
        gridColumn: dayIndex + 1 + 1, // grid 인덱스 보정 + 시간 축 컬럼
        gridRow: hourIndex + 1, // grid 인덱스 보정
      }}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    />
  );
};

export default TimeCell;
