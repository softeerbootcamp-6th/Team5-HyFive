import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import {
  formatTimeToNumber,
  getDayIndex,
} from "@/features/calender/Calender.util";
import type { AvailableTimeSlotType, TimeTableMode } from "./TimeTable.type";
import { TIME_TABLE_CONFIG } from "@/features/timeTable/TimeTable.constants";

const { color, typography, borderRadius } = theme;

export const TableContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${color.GrayScale.gray3};
  border-radius: ${borderRadius.Medium};
  overflow: hidden;
`;

export const TableHeader = css`
  display: grid;
  height: auto;
  grid-template-columns: 129px repeat(7, 1fr);
  background-color: ${color.GrayScale.gray1};
  border-bottom: 1px solid ${color.GrayScale.gray3};
`;

export const TimeAxisPlaceholder = css`
  height: 100%;
  border-right: 1px solid ${color.GrayScale.gray3};
`;

export const DayCell = css`
  padding: 16px 8px;
  text-align: center;
  border-right: 1px solid ${color.GrayScale.gray3};

  &:last-child {
    border-right: none;
  }
`;

export const DayLabel = css`
  font: ${typography.Body.b4_medi};
  color: ${color.GrayScale.gray4};
`;

export const DateLabel = css`
  font: ${typography.Body.b2_semi};
  color: ${color.GrayScale.gray5};
  margin-bottom: 4px;
`;

export const getDayLabelStyle = (isToday: boolean) => css`
  font: ${typography.Body.b4_medi};
  color: ${isToday ? color.Maincolor.primary : color.GrayScale.gray4};
`;

export const getDateLabelStyle = (isToday: boolean) => css`
  font: ${typography.Body.b2_semi};
  color: ${isToday ? color.Maincolor.primary : color.GrayScale.gray5};
  margin-bottom: 4px;
`;

// 바디
export const TableBody = css`
  flex: 1;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 129px repeat(7, 1fr);
  grid-template-rows: repeat(11, 1fr);
`;

export const TimeLabel = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font: ${typography.Body.b4_regu};
  color: ${color.GrayScale.gray4};
  border-right: 1px solid ${color.GrayScale.gray3};
  border-bottom: 1px solid ${color.GrayScale.gray3};
  background-color: ${color.GrayScale.gray1};

  &:last-of-type {
    border-bottom: none;
  }
`;

export const TimeCell = css`
  border-right: 1px solid ${color.GrayScale.gray3};
  border-bottom: 1px solid ${color.GrayScale.gray3};
`;

export const getTimeCellStyle = (
  mode: TimeTableMode,
  hourIndex: number,
  dayIndex: number,
) => {
  const isLastColumn = dayIndex === 6; // 토요일
  const isLastRow = hourIndex === 10; // 19시

  return css`
    ${TimeCell}
    ${mode === "edit" &&
    css`
      cursor: pointer;
      &:hover {
        background-color: ${color.GrayScale.gray2};
      }
    `}
    ${isLastColumn &&
    css`
      border-right: none;
    `}
    ${isLastRow &&
    css`
      border-bottom: none;
    `}
  `;
};

export const getTimeBlockGridStyle = (
  block: AvailableTimeSlotType,
  selectedWeek: Date[],
) => {
  const startHour = formatTimeToNumber(block.rentalStartTime);
  const endHour = formatTimeToNumber(block.rentalEndTime);
  const dayIndex = getDayIndex(block.rentalDate, selectedWeek);

  if (dayIndex === -1) return css``;

  return css`
    grid-column: ${dayIndex + 2}; /* +2는 시간축(1) + 0-based 인덱스 */
    grid-row: ${startHour - TIME_TABLE_CONFIG.START_HOUR + 1} /
      ${endHour - TIME_TABLE_CONFIG.START_HOUR + 1};
    z-index: 10;
  `;
};
