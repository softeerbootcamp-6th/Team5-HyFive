import type { ScheduleType } from "@/features/schedule/Schedule.types";
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
const { color, typography } = theme;
const grayColor = color.GrayScale.gray4;
const blueColor = color.SemanticScale.blue[400];

const ScheduleCardContainer = css`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  color: ${grayColor};
  font: ${typography.Body.b3_medi};

  &:hover {
    background-color: ${color.GrayScale.gray1};
  }
`;

const HeaderWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ContentWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RouteWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TimeWrapper = css`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: end;
`;

const UserWrapper = (drivingType: ScheduleType) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  padding: 4px 6px;
  border-radius: 10px;
  background-color: ${drivingType === "inProgress"
    ? color.SemanticScale.blue[50]
    : color.GrayScale.gray1};
  color: ${drivingType === "inProgress" ? blueColor : grayColor};
`;

const Content = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const RouteText = css`
  font: ${typography.Body.b2_medi};
`;

const TimeText = css`
  color: ${color.GrayScale.black};
  font: ${typography.Heading.h1_semi};
`;

const CardTypeText = css`
  padding: 4px 0;
`;

export {
  ScheduleCardContainer,
  HeaderWrapper,
  ContentWrapper,
  RouteWrapper,
  TimeWrapper,
  UserWrapper,
  Content,
  RouteText,
  TimeText,
  CardTypeText,
};
