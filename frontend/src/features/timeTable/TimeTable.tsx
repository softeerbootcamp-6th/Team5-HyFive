import { format, isToday } from "date-fns";
import { ko } from "date-fns/locale";
import {
  TableContainer,
  TableHeader,
  TimeAxisPlaceholder,
  DayCell,
  getDayLabelStyle,
  getDateLabelStyle,
  TableBody,
  TimeLabel,
} from "./TimeTable.style";
import type { AvailableTimeSlotType } from "@/features/timeTable/TimeTable.type";
import AvailableTimeSlot from "@/features/availableTimeSlot/AvailableTimeSlot";
import TimeCell from "@/features/timeTable/TimeCell";
// import PreviewTimeSlot from "@/features/timeTable/PreviewTimeSlot";
import { generateAvailableTimeSlots } from "@/mocks/timeBlockMocks";
import { useTimeTableDrag } from "@/features/timeTable/useTimeTableDrag";
import { useState } from "react";

interface TimeTableProps {
  selectedCarId: number;
  selectedWeek: Date[];
}

const START_HOUR = 9; // 9시부터
const TOTAL_HOURS = 11; // 19시까지 총 11칸
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
      <div css={TableHeader}>
        <div css={TimeAxisPlaceholder} /> {/* 좌측 최상단 빈칸 */}
        {selectedWeek.map((date) => {
          const todayCheck = isToday(date); // 오늘인지 확인

          return (
            <div key={date.toISOString()} css={DayCell}>
              <div css={getDateLabelStyle(todayCheck)}>{format(date, "d")}</div>
              <div css={getDayLabelStyle(todayCheck)}>
                {format(date, "E", { locale: ko })}요일
              </div>
            </div>
          );
        })}
      </div>

      <div css={TableBody}>
        {/* 시간 레이블들 */}
        {Array.from({ length: TOTAL_HOURS }).map((_, hourIndex) => {
          const hour = START_HOUR + hourIndex;
          return (
            <div
              data-testid="time-label"
              data-testid-hour={`time-label-${hour}`}
              key={`time-label-${hour}`}
              css={TimeLabel}
              style={{ gridColumn: 1, gridRow: hourIndex + 1 }}
            >
              {hour}:00
            </div>
          );
        })}

        {/* 시간 셀들 */}
        {Array.from({ length: TOTAL_HOURS }).map((_, hourIndex) =>
          selectedWeek.map((date, dayIndex) => (
            <TimeCell
              key={`${date.toISOString()}-${hourIndex}`}
              hourIndex={hourIndex}
              dayIndex={dayIndex}
              onMouseDown={() => handleCellMouseDown(dayIndex, hourIndex)}
              onMouseEnter={() => handleCellMouseEnter(dayIndex, hourIndex)}
              isPreviewCell={isPreviewCell(dayIndex, hourIndex)}
            />
          )),
        )}

        {/* 유휴시간 블록들 */}
        {availableTimeSlots.map((block) => (
          <AvailableTimeSlot
            key={`${block.rentalDate}-${block.rentalStartTime}-${block.rentalEndTime}`}
            block={block}
            selectedWeek={selectedWeek}
          />
        ))}

        {/* 드래그 미리보기 */}
        {/* {dragState.isDragging &&
          dragState.startPosition &&
          dragState.currentPosition && (
            <PreviewTimeSlot
              startPosition={dragState.startPosition}
              endPosition={dragState.currentPosition}
              selectedWeek={selectedWeek}
            />
          )} */}
      </div>
    </div>
  );
};

export default TimeTable;
