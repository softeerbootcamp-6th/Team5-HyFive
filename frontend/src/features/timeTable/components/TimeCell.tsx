import { getTimeCellStyle } from "@/features/timeTable/TimeTable.style";
import type { TimeTableMode } from "@/features/timeTable/TimeTable.type";

interface TimeCellProps {
  hourIndex: number;
  dayIndex: number;
  mode: TimeTableMode;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
  isPreviewCell?: boolean;
}

const TimeCell = ({
  mode,
  hourIndex,
  dayIndex,
  onMouseDown,
  onMouseEnter,
  isPreviewCell = false,
}: TimeCellProps) => {
  return (
    <div
      css={getTimeCellStyle(mode, hourIndex, dayIndex, isPreviewCell)}
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
