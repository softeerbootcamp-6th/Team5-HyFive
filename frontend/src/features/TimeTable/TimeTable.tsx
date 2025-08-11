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
import type { AvailableTimeSlotType } from "@/features/TimeTable/TimeTable.type";
import AvailableTimeSlot from "@/features/availableTimeSlot/AvailableTimeSlot";
import TimeCell from "@/features/TimeTable/TimeCell";
import { generateAvailableTimeSlots } from "@/mocks/timeBlockMocks";

interface TimeTableProps {
  selectedCarId: number;
  selectedWeek: Date[];
}

const START_HOUR = 9; // 9시부터
const TOTAL_HOURS = 11; // 19시까지 총 11칸

const TimeTable = ({
  selectedCarId: _selectedCarId,
  selectedWeek,
}: TimeTableProps) => {
  const availableTimeSlots: AvailableTimeSlotType[] =
    generateAvailableTimeSlots(selectedWeek);

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
              date={date}
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
      </div>
    </div>
  );
};

export default TimeTable;
