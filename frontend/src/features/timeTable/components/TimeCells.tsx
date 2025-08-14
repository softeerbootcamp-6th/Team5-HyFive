import TimeCell from "@/features/timeTable/components/TimeCell";
import type { TimeTableMode } from "@/features/timeTable/TimeTable.type";
import { memo, useMemo } from "react";

interface TimeCellsProps {
  totalHours: number;
  selectedWeek: Date[];
  mode: TimeTableMode;
  handleCellMouseDown: (dayIndex: number, hourIndex: number) => void;
  handleCellMouseEnter: (dayIndex: number, hourIndex: number) => void;
  isPreviewCell: (dayIndex: number, hourIndex: number) => boolean;
}

const TimeCells = ({
  totalHours,
  selectedWeek,
  mode,
  handleCellMouseDown,
  handleCellMouseEnter,
  isPreviewCell,
}: TimeCellsProps) => {
  // totalHours * selectedWeek.length 만큼의 셀을 생성합니다.
  // 11 * 7 = 77개의 셀이 생성되며, 각 셀은 고유한 key를 가집니다.
  const cells = useMemo(() => {
    const result: { key: string; hourIndex: number; dayIndex: number }[] = [];

    for (let hourIndex = 0; hourIndex < totalHours; hourIndex++) {
      for (let dayIndex = 0; dayIndex < selectedWeek.length; dayIndex++) {
        const date = selectedWeek[dayIndex];
        const key = `${date.toISOString()}-${hourIndex}`;
        result.push({ key, hourIndex, dayIndex });
      }
    }

    return result;
  }, [totalHours, selectedWeek]);

  return (
    <>
      {cells.map(({ key, hourIndex, dayIndex }) => (
        <TimeCell
          key={key}
          mode={mode}
          hourIndex={hourIndex}
          dayIndex={dayIndex}
          onMouseDown={() => handleCellMouseDown(dayIndex, hourIndex)}
          onMouseEnter={() => handleCellMouseEnter(dayIndex, hourIndex)}
          isPreviewCell={isPreviewCell(dayIndex, hourIndex)}
        />
      ))}
    </>
  );
};

export default memo(TimeCells);
