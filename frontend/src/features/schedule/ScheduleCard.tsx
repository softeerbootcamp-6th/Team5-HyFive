import { CarIcon, DotIcon, LocationIcon, PersonIcon } from "@/assets/icons";
import type { DrivingDataType } from "@/types/drivingType";
import type { ScheduleType } from "@/features/schedule/Schedule.types";
import {
  Content,
  ContentWrapper,
  HeaderWrapper,
  RouteText,
  RouteWrapper,
  ScheduleCardContainer,
  UserWrapper,
} from "@/features/schedule/ScheduleCard.style";
import {
  CardTypeText,
  TimeText,
  TimeWrapper,
} from "@/features/book/BookCard.style";
import { theme } from "@/styles/themes.style";
const { color } = theme;
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
