import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { getDayIndex } from "@/features/calender/Calender.util";
import type { AvailableTimeSlotType } from "./TimeTable.type";

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

  &:hover {
    background-color: ${color.GrayScale.gray2};
  }
`;

export const getTimeCellStyle = (
  hourIndex: number,
  dayIndex: number,
  isPreviewCell: boolean,
) => {
  const isLastColumn = dayIndex === 6; // 토요일
  const isLastRow = hourIndex === 10; // 19시

  return css`
    ${TimeCell}
    ${isPreviewCell &&
    css`
      border-left: 4px solid ${color.Maincolor.primary};
      background-color: ${color.SemanticScale.orange[100]} !important;
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
  const startHour = parseInt(block.rentalStartTime.split(":")[0]);
  const endHour = parseInt(block.rentalEndTime.split(":")[0]);
  const dayIndex = getDayIndex(block.rentalDate, selectedWeek);

  if (dayIndex === -1) return css``;

  return css`
    grid-column: ${dayIndex + 2}; /* +2는 시간축(1) + 0-based 인덱스 */
    grid-row: ${startHour - 8} / ${endHour - 8}; /* 9시가 1행이므로 -8 */
    z-index: 10;
  `;
};
