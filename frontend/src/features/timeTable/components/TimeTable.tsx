import { TableContainer, TableBody } from "../TimeTable.style";
import type {
  AvailableTimeSlotType,
  TimeTableProps,
} from "@/features/timeTable/TimeTable.type";

import { generateAvailableTimeSlots } from "@/mocks/timeBlockMocks";
import { useEffect, useState } from "react";
import {
  AvailableTimeSlots,
  TimeTableHeader,
  TimeLabels,
  TimeCells,
  AvailableTimeSlot,
} from "./index";
import { TIME_TABLE_CONFIG } from "@/features/timeTable/TimeTable.constants";
import { isAllSlotsInSelectedWeek } from "@/features/timeTable/utils/TimeTable.util";
import { useTimeTableDrag } from "@/features/timeTable/hooks/useTimeTableDrag";

const mockWeek: Date[] = Array.from({ length: 7 }, (_, i) => {
  return new Date(2025, 7, 10 + i);
});
const mockTimeSlot: AvailableTimeSlotType[] =
  generateAvailableTimeSlots(mockWeek);

const TimeTable = ({
  selectedCarId: _selectedCarId,
  selectedWeek,
  mode,
}: TimeTableProps) => {
  const [availableTimeSlots, setAvailableTimeSlots] =
    useState<AvailableTimeSlotType[]>(mockTimeSlot);

  const [previewSlot, setPreviewSlot] = useState<AvailableTimeSlotType | null>(
    null,
  );

  useEffect(() => {
    const TimeSlot = generateAvailableTimeSlots(selectedWeek);
    setAvailableTimeSlots(TimeSlot);
  }, [selectedWeek]);
  const canRenderSlots = isAllSlotsInSelectedWeek(
    availableTimeSlots,
    selectedWeek,
  );

  const { handleCellMouseDown, handleCellMouseEnter, deleteSlot } =
    useTimeTableDrag({
      mode,
      selectedWeek,
      availableTimeSlots,
      onSlotsUpdate: (slots) => setAvailableTimeSlots(slots),
      setPreviewSlot: setPreviewSlot,
    });

  const slotsDisabled = Boolean(previewSlot);

  return (
    <div css={TableContainer}>
      {/* 헤더 - 최상단 날짜 */}
      <TimeTableHeader selectedWeek={selectedWeek} />

      <div css={TableBody}>
        {/* 시간 레이블들 - 좌측 9:00 ~ 19:00 셀 */}
        <TimeLabels />

        {/* 시간 셀들 - 빈 7 * 11개의 셀 */}
        <TimeCells
          mode={mode}
          totalHours={TIME_TABLE_CONFIG.TOTAL_HOURS}
          selectedWeek={selectedWeek}
          handleCellMouseDown={
            mode === "edit" ? handleCellMouseDown : undefined
          }
          handleCellMouseEnter={
            mode === "edit" ? handleCellMouseEnter : undefined
          }
        />

        {/* 유휴시간 블록들 - TimeCell 위 블록*/}
        {canRenderSlots && (
          <AvailableTimeSlots
            availableTimeData={availableTimeSlots}
            selectedWeek={selectedWeek}
            mode={mode}
            onDelete={deleteSlot}
            disabled={slotsDisabled}
          />
        )}

        {previewSlot && (
          <AvailableTimeSlot
            key={`preview-${previewSlot.rentalDate}-${previewSlot.rentalStartTime}-${previewSlot.rentalEndTime}`}
            block={previewSlot}
            selectedWeek={selectedWeek}
            variant="preview"
            mode={mode}
            disabled
          />
        )}
      </div>
    </div>
  );
};

export default TimeTable;
