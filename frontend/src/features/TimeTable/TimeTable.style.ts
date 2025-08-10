import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

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

// 바디
export const TableBody = css`
  flex: 1;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 129px repeat(7, 1fr);
  grid-template-rows: repeat(11, 46px);
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
    background-color: ${color.GrayScale.gray1};
  }

  /* 각 행의 마지막 셀 (일요일) */
  &:nth-of-type(8n) {
    border-right: none;
  }

  /* 마지막 행의 셀 (19시 행) */
  &:nth-last-of-type(-n + 8) {
    border-bottom: none;
  }
`;
