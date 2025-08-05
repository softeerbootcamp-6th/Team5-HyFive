import {
  ArrowRightIcon,
  CompletedIcon,
  InProgressIcon,
  WaitingIcon,
} from "@/assets/icons";
import PassengerDropDown from "@/features/schedule/PassengerDropDown";
import type { ScheduleType } from "@/features/schedule/Schedule.types";
import { theme } from "@/styles/themes.style";
import TabMatcher from "@/utils/TabMatcher";
import { css } from "@emotion/react";
const { color, typography } = theme;

interface MapHeaderProps {
  scheduleType: ScheduleType;
  data: {
    id: number;
    routeStartLocation: string;
    routeEndLocation: string;
  };
}
const MapHeader = ({ scheduleType, data }: MapHeaderProps) => {
  const ICON_MAPPER = {
    waiting: <WaitingIcon />,
    inProgress: <InProgressIcon />,
    completed: <CompletedIcon />,
  };
  return (
    <div css={MapHeaderContainer}>
      <p css={RouteIdText}>경로 #{data.id}</p>
      <div css={SectionWrapper}>
        <div css={LeftSectionWrapper}>
          <div>{ICON_MAPPER[scheduleType]}</div>
          <div>
            <p css={RouteStatusText}>
              {TabMatcher.matchInnerTypeToExternalType(scheduleType)}
            </p>
            <div css={RouteLocationWrapper}>
              <p>{data.routeStartLocation}</p>
              <ArrowRightIcon />
              <p>{data.routeEndLocation}</p>
            </div>
          </div>
        </div>
        <PassengerDropDown />
      </div>
    </div>
  );
};

export default MapHeader;

const MapHeaderContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 24px;
`;

const SectionWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const LeftSectionWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const RouteIdText = css`
  color: ${color.GrayScale.gray4};
  font: ${typography.Body.b2_medi};
`;

const RouteStatusText = css`
  color: ${color.GrayScale.black};
  font: ${typography.Body.b1_medi};
`;

const RouteLocationWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  color: ${color.GrayScale.gray5};
  font: ${typography.Body.b2_medi};
`;
