import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

const { color, typography, borderRadius } = theme;

// Calender.tsx
const CalenderContainer = css`
  display: flex;
  width: 446px;
  padding: 60px 36px;
  flex-direction: column;
  align-items: center;
  gap: 52px;
  flex-shrink: 0;
  border-radius: ${borderRadius.Large};
  border: 1px solid ${color.GrayScale.gray3};
`;

// CalenderHeader.tsx
const HeaderContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = css`
  font: ${typography.Body.b2_semi};
  color: ${color.GrayScale.black};
`;

const StyledButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .chevron-icon {
    stroke: ${color.GrayScale.gray3};
    transition: stroke 0.2s ease;
  }

  &:hover .chevron-icon {
    stroke: ${color.GrayScale.gray5};
  }
`;

// CalenderContent.tsx
const ContentContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const DayLabelSection = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
`;

const DayLabel = css`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 20px;
  font: ${typography.Label.l5_semi};
  color: ${color.GrayScale.gray3};
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
  cursor: pointer;
  &:hover {
    background-color: ${color.GrayScale.gray3};
    border-radius: ${borderRadius.Medium};
    color: ${color.GrayScale.black};
  }
`;

const getWeekSectionStyle = (highlighted: boolean) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${highlighted &&
  css`
    background-color: ${color.GrayScale.gray2};
    border-radius: ${borderRadius.Medium};
  `}
`;

const getDaySectionStyle = (
  isCurrentMonth: boolean,
  isSelected: boolean,
  isToday: boolean,
  highlightType: "day" | "week",
) => {
  if (isSelected && highlightType === "day") {
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

export {
  CalenderContainer,
  HeaderContainer,
  HeaderTitle,
  StyledButton,
  ContentContainer,
  DayLabelSection,
  DayLabel,
  DaySection,
  getDaySectionStyle,
  getWeekSectionStyle,
};
