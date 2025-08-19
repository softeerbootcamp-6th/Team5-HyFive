import type { BookType } from "@/features/book/Book.types";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
const { color, typography } = theme;

const COLOR_MAP = {
  pending: {
    bgColor: color.SemanticScale.orange[50],
    fontColor: color.Maincolor.primary,
  },
  success: {
    bgColor: color.SemanticScale.blue[50],
    fontColor: color.Semantic.success,
  },
  fail: {
    bgColor: color.SemanticScale.red[50],
    fontColor: color.Semantic.error,
  },
};

const BookCardContainer = (isActive: boolean) => css`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;

  &:hover {
    background-color: ${color.GrayScale.gray1};
  }

  ${isActive &&
  css`
    background-color: ${color.GrayScale.gray1};
  `}
`;

const TimeWrapper = css`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding-bottom: 16px;
  align-items: end;
`;

const DateWrapper = (cardType: BookType) => css`
  width: fit-content;
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 4px;
  margin-bottom: 6px;
  border-radius: 10px;
  text-align: center;
  font: ${typography.Body.b2_medi};
  background-color: ${COLOR_MAP[cardType].bgColor};
  color: ${COLOR_MAP[cardType].fontColor};
`;

const LocationWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font: ${typography.Body.b2_medi};
`;

const UserWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const TimeText = css`
  font: ${typography.Heading.h1_semi};
  gap: 8px;
`;

const CardTypeText = css`
  color: ${color.GrayScale.gray4};
  font: ${typography.Body.b3_medi};
  padding: 4px 0;
`;

const GrayText = css`
  color: ${color.GrayScale.gray4};
  font: ${typography.Body.b3_medi};
`;

export {
  BookCardContainer,
  TimeWrapper,
  DateWrapper,
  LocationWrapper,
  UserWrapper,
  TimeText,
  CardTypeText,
  GrayText,
};
