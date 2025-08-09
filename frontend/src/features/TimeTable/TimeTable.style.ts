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

export const TableBody = css`
  flex: 1;
  overflow-y: auto;
`;

export const TimeRow = css`
  display: grid;
  grid-template-columns: 129px repeat(7, 1fr);
  border-bottom: 1px solid ${color.GrayScale.gray3};

  &:last-child {
    border-bottom: none;
  }
`;

export const TimeLabel = css`
  padding: 12px 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font: ${typography.Body.b4_regu};
  color: ${color.GrayScale.gray4};
  border-right: 1px solid ${color.GrayScale.gray3};
`;

export const TimeCell = css`
  min-height: 46px;
  border-right: 1px solid ${color.GrayScale.gray3};

  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: ${color.GrayScale.gray1};
  }
`;
