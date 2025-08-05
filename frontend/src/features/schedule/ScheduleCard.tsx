import { CarIcon, DotIcon, LocationIcon, PersonIcon } from "@/assets/icons";
import type { DrivingDataType } from "@/types/drivingType";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
import type { ScheduleType } from "@/features/schedule/Schedule.types";
const { color, typography } = theme;
const grayColor = color.GrayScale.gray4;
const blueColor = color.SemanticScale.blue[400];

interface DrivingCardProps {
  drivingType: ScheduleType;
  data: DrivingDataType;
}
const ScheduleCard = ({ drivingType, data }: DrivingCardProps) => {
  return (
    <div css={ScheduleCardContainer}>
      <div css={HeaderWrapper}>
        <div css={RouteWrapper}>
          <p css={RouteText}>경로 #{data.routeId}</p>
          <div css={UserWrapper(drivingType)}>
            <PersonIcon
              fill={drivingType === "inProgress" ? blueColor : grayColor}
            />
            <p>{data.totalUserCount}</p>
          </div>
        </div>
        <div css={TimeWrapper}>
          <p css={TimeText}>{data.routeStartTime}</p>
          <p css={TimeText}>~</p>
          <p css={TimeText}>{data.routeEndTime}</p>
          <p css={CardTypeText}>운행</p>
        </div>
      </div>
      <div css={ContentWrapper}>
        <div css={Content}>
          <LocationIcon fill={grayColor} />
          <p>현재 위치: {data.routeStartLocation}</p>
        </div>
        <div css={Content}>
          <CarIcon fill={grayColor} />
          <p>{data.centerName}</p>
          <DotIcon />
          <p>{data.carNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;

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
