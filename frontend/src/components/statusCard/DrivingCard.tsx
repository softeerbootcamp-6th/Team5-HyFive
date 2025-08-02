import { CarIcon, DotIcon, LocationIcon, PersonIcon } from "@/assets/icons";
import type { DrivingDataType } from "@/components/types/drivingType";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
const { color, typography } = theme;
const grayColor = color.GrayScale.gray4;
const blueColor = color.SemanticScale.blue[400];

export type DrivingType = "waiting" | "progress" | "end";
interface DrivingCardProps {
  drivingType: DrivingType;
  data: DrivingDataType;
}
const DrivingCard = ({ drivingType, data }: DrivingCardProps) => {
  return (
    <div css={DrivingCardContainer}>
      <div css={HeaderWrapper}>
        <div css={RouteWrapper}>
          <p css={RouteText}>경로 #{data.routeId}</p>
          <div css={UserWrapper(drivingType)}>
            <PersonIcon
              fill={drivingType === "progress" ? blueColor : grayColor}
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

export default DrivingCard;

const DrivingCardContainer = css`
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

const UserWrapper = (drivingType: DrivingType) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  padding: 4px 6px;
  border-radius: 10px;
  background-color: ${drivingType === "progress"
    ? color.SemanticScale.blue[50]
    : color.GrayScale.gray1};
  color: ${drivingType === "progress" ? blueColor : grayColor};
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
