import {
  generateCalendarMatrix,
  isCurrentMonth,
  isSelectedDate,
  isSelectedWeek,
  isToday,
} from "@/features/calander/Calander.util";

import {
  ContentContainer,
  DayLabelSection,
  DayLabel,
  DaySection,
  getDaySectionStyle,
  getWeekSectionStyle,
} from "@/features/calander/Calander.style";
import type { HighlightType } from "@/features/calander/Calander";

interface CalanderContentProps {
  date: Date;
  selectedDate: Date | null; // TODO: reducer로 상태 변경하기
  handleClickDate: (date: Date) => void;
  highlightType: HighlightType;
}

const CalanderContent = ({
  date,
  selectedDate,
  handleClickDate,
  highlightType,
}: CalanderContentProps) => {
  const WEEKDAYS_KR = ["일", "월", "화", "수", "목", "금", "토"];
  const weeks = generateCalendarMatrix(date);
  return (
    <div css={ContentContainer}>
      <div css={DayLabelSection}>
        {WEEKDAYS_KR.map((day) => (
          <div css={DayLabel} key={day}>
            {day}
          </div>
        ))}
      </div>

      {weeks.map((week, i) => {
        const isHighlightedWeek =
          highlightType === "week" && isSelectedWeek(week, selectedDate);

        return (
          <div
            css={getWeekSectionStyle(isHighlightedWeek)}
            key={i}
            data-testid={`week-${i}`}
          >
            {week.map((day) => {
              const current = isCurrentMonth(day, date);
              const selected = selectedDate
                ? isSelectedDate(day, selectedDate)
                : false;
              const today = isToday(day);
              return (
                <div
                  css={[
                    DaySection,
                    getDaySectionStyle(current, selected, today, highlightType),
                  ]}
                  key={day.toISOString()}
                  data-testid={`day-${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`}
                  onClick={() => handleClickDate(day)}
                >
                  {day.getDate()}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CalanderContent;
