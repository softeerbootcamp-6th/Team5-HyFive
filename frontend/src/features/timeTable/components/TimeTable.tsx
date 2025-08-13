import { TableContainer, TableBody } from "../TimeTable.style";
import type {
  AvailableTimeSlotType,
  TimeTableProps,
} from "@/features/timeTable/TimeTable.type";

import { generateAvailableTimeSlots } from "@/mocks/timeBlockMocks";
import { useTimeTableDrag } from "@/features/timeTable/useTimeTableDrag";
import { useState } from "react";
import {
  AvailableTimeSlots,
  TimeTableHeader,
  TimeLabels,
  TimeCells,
} from "./index";
import { TIME_TABLE_CONFIG } from "@/features/timeTable/TimeTable.constants";

const mockWeek: Date[] = Array.from({ length: 7 }, (_, i) => {
  return new Date(2025, 7, 10 + i);
});
const mockTimeSlot: AvailableTimeSlotType[] =
  generateAvailableTimeSlots(mockWeek);
const TimeTable = ({
  selectedCarId: _selectedCarId,
  selectedWeek,
}: TimeTableProps) => {
  const [availableTimeSlots, setAvailableTimeSlots] =
    useState<AvailableTimeSlotType[]>(mockTimeSlot);

  const { handleCellMouseDown, handleCellMouseEnter, isPreviewCell } =
    useTimeTableDrag({
      selectedWeek,
      availableTimeSlots,
      onSlotsUpdate: (slots) => setAvailableTimeSlots(slots),
    });

  return (
    <div css={TableContainer}>
      {/* 헤더 - 최상단 날짜 */}
      <TimeTableHeader selectedWeek={selectedWeek} />

      <div css={TableBody}>
        {/* 시간 레이블들 - 좌측 9:00 ~ 19:00 셀 */}
        <TimeLabels />

        {/* 시간 셀들 - 빈 7 * 11개의 셀 */}
        <TimeCells
          totalHours={TIME_TABLE_CONFIG.TOTAL_HOURS}
          selectedWeek={selectedWeek}
          handleCellMouseDown={handleCellMouseDown}
          handleCellMouseEnter={handleCellMouseEnter}
          isPreviewCell={isPreviewCell}
        />

        {/* 유휴시간 블록들 - TimeCell 위 블록*/}
        <AvailableTimeSlots
          availableTimeData={availableTimeSlots}
          selectedWeek={selectedWeek}
        />
      </div>
    </div>
  );
};

export default TimeTable;
