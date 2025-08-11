import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  TableContainer,
  TableHeader,
  TimeAxisPlaceholder,
  DayCell,
  DayLabel,
  DateLabel,
  TableBody,
  TimeLabel,
  getTimeCellStyle,
} from "./TimeTable.style";
import { generateAvailableTimeSlots } from "@/mocks/timeBlockMocks";
import AvailableTimeSlot from "@/features/availableTimeSlot/AvailableTimeSlot";

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
  const mockAvailableTimes = generateAvailableTimeSlots(selectedWeek);

  return (
    <div css={TableContainer}>
      <div css={TableHeader}>
        <div css={TimeAxisPlaceholder} /> {/* 좌측 최상단 빈칸 */}
        {selectedWeek.map((date) => (
          <div key={date.toISOString()} css={DayCell}>
            <div css={DateLabel}>{format(date, "d")}</div>
            <div css={DayLabel}>{format(date, "E", { locale: ko })}요일</div>
          </div>
        ))}
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
            <div
              key={`${date.toISOString()}-${hourIndex}`}
              css={getTimeCellStyle(hourIndex, dayIndex)}
              style={{
                gridColumn: dayIndex + 2,
                gridRow: hourIndex + 1,
              }}
            />
          )),
        )}

        {/* 유휴시간 블록들 */}
        {mockAvailableTimes.map((block) => (
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
