import { getTimeCellStyle } from "@/features/timeTable/TimeTable.style";

interface TimeCellProps {
  hourIndex: number;
  dayIndex: number;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
  isPreviewCell: boolean;
}

const TimeCell = ({
  hourIndex,
  dayIndex,
  onMouseDown,
  onMouseEnter,
  isPreviewCell,
}: TimeCellProps) => {
  return (
    <div
      css={getTimeCellStyle(hourIndex, dayIndex, isPreviewCell)}
      style={{
        gridColumn: dayIndex + 2,
        gridRow: hourIndex + 1,
      }}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    />
  );
};

export default TimeCell;
