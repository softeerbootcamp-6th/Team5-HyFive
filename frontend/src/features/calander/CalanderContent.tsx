import {
  generateCalendarMatrix,
  isCurrentMonth,
  isSelectedDate,
  isToday,
} from "@/features/calander/Calander.util";
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

const { color, typography, borderRadius } = theme;

interface CalanderContentProps {
  date: Date;
  onClickDate: (date: Date) => void;
}

const CalanderContent = ({ date, onClickDate }: CalanderContentProps) => {
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
      <div css={WeekContainer}></div>
      {weeks.map((week, i) => (
        <div css={WeekSection} key={i}>
          {week.map((day) => {
            const current = isCurrentMonth(day, date);
            const selected = isSelectedDate(day, date);
            const today = isToday(day);
            return (
              <div
                css={[DaySection, getDaySectionStyle(current, selected, today)]}
                key={day.toISOString()}
              >
                {day.getDate()}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CalanderContent;

const getDaySectionStyle = (
  isCurrentMonth: boolean,
  isSelected: boolean,
  isToday: boolean,
) => {
  if (isSelected) {
    return css`
      background-color: ${color.GrayScale.black};
      color: ${color.GrayScale.white};
      border-radius: ${borderRadius.Medium};
    `;
  }
  if (isToday) {
    return css`
      color: ${color.Maincolor.primary};
      font-weight: 600;
    `;
  }

  if (!isCurrentMonth) {
    return css`
      color: ${color.GrayScale.gray3};
    `;
  }

  return css``;
};

const ContentContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 44px;
`;

const DayLabelSection = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DayLabel = css`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 30px;
  font: ${typography.Label.l5_semi};
  color: ${color.GrayScale.gray3};
`;

const WeekContainer = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const WeekSection = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DaySection = css`
  display: flex;
  width: 32px;
  height: 30px;
  padding: 2px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font: ${typography.Label.l3_semi};
  color: ${color.GrayScale.gray5};
`;
