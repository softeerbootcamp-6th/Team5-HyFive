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
        <div css={TimeAxisPlaceholder} /> {/* 좌측 최상단 빈칸 */}
        {selectedWeek.map((date) => (
          <div key={date.toISOString()} css={DayCell}>
            <div css={DateLabel}>{format(date, "d")}</div>
            <div css={DayLabel}>{format(date, "E", { locale: ko })}요일</div>
          </div>
        ))}
      </div>

      <div css={TableBody}>
        {Array.from({ length: TOTAL_HOURS }).map((_, hourIndex) => {
          const hour = START_HOUR + hourIndex;
          return [
            // 시간 레이블
            <div key={`time-label-${hour}`} css={TimeLabel}>
              {hour}:00
            </div>,
            // 해당 시간의 7개 요일 셀들
            ...selectedWeek.map((date, _dayIndex) => (
              <div key={`${date.toISOString()}-${hourIndex}`} css={TimeCell} />
            )),
          ];
        })}
      </div>
    </div>
  );
};

export default TimeTable;
