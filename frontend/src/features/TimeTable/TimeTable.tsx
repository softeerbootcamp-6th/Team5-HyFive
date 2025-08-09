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
  TimeRow,
  TimeLabel,
  TimeCell,
} from "./TimeTable.style";

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
  return (
    <div css={TableContainer}>
      <div css={TableHeader}>
        <div css={TimeAxisPlaceholder} /> {/* 시간 축 자리를 위한 빈칸 */}
        {selectedWeek.map((date) => (
          <div key={date.toISOString()} css={DayCell}>
            <div css={DateLabel}>{format(date, "d")}</div>
            <div css={DayLabel}>{format(date, "E", { locale: ko })}요일</div>
          </div>
        ))}
      </div>

      <div css={TableBody}>
        {Array.from({ length: TOTAL_HOURS }).map((_, i) => {
          const hour = START_HOUR + i;
          return (
            <div key={`time-${hour}`} css={TimeRow}>
              {/* 시간 축 */}
              <div css={TimeLabel}>{hour}:00</div>
              {/* 요일별 셀 */}
              {selectedWeek.map((date) => (
                <div key={`${date.toISOString()}-${hour}`} css={TimeCell} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeTable;
