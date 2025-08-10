import {
  generateCalendarMatrix,
  isCurrentMonth,
  isSelectedWeek,
  isToday,
  WEEKDAYS_KR,
  checkIfDayIsSelected,
} from "@/features/calender/Calender.util";

import {
  ContentContainer,
  DayLabelSection,
  DayLabel,
  DaySection,
  getDaySectionStyle,
  getWeekSectionStyle,
} from "@/features/calender/Calender.style";

interface CalenderContentProps {
  calendarDate: Date;
  highlightType: "day" | "week";
  selectedDate: Date | null;
  handleClickDate: (date: Date) => void;
}

const CalenderContent = ({
  calendarDate,
  selectedDate,
  handleClickDate,
  highlightType,
}: CalenderContentProps) => {
  const weeks = generateCalendarMatrix(calendarDate);
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
              const isInCurrentMonth = isCurrentMonth(day, calendarDate);
              const isCurrentDaySelected = checkIfDayIsSelected(
                day,
                selectedDate,
              );
              const isTodayDate = isToday(day);

              return (
                <div
                  css={[
                    DaySection,
                    getDaySectionStyle(
                      isInCurrentMonth,
                      isCurrentDaySelected,
                      isTodayDate,
                      highlightType,
                    ),
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

export default CalenderContent;
