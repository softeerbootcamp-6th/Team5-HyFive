import RefetchButton from "@/components/RefetchButton";
import Tabs from "@/components/Tabs";
import type { ScheduleType } from "@/features/schedule/Schedule.types";
import ScheduleCard from "@/features/schedule/ScheduleCard";
import { drivingDataList } from "@/mocks/drivingMocks";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
import type { Dispatch, SetStateAction } from "react";
const { color, typography } = theme;

interface ScheduleListSectionProps {
  TAB_LIST: ScheduleType[];
  activeTab: ScheduleType;
  setActiveTab: Dispatch<SetStateAction<ScheduleType>>;
}
const ScheduleListSection = ({
  TAB_LIST,
  activeTab,
  setActiveTab,
}: ScheduleListSectionProps) => {
  const LOCATION_SECTION = "운정 1구역";
  return (
    <div css={ScheduleListSectionContainer}>
      <div css={HeaderContainer}>
        <p css={LocationSectionText}>{LOCATION_SECTION}</p>
        <RefetchButton handleClick={() => {}} />
      </div>
      <Tabs
        type="bar_true"
        group={TAB_LIST}
        selected={activeTab}
        setSelected={setActiveTab}
      />
      <div css={ContentContainer}>
        {drivingDataList.map((scheduleData, idx) => (
          <div key={scheduleData.routeId}>
            <ScheduleCard drivingType={activeTab} data={scheduleData} />
            {idx !== drivingDataList.length - 1 && <div css={LineWrapper} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleListSection;

const ScheduleListSectionContainer = css`
  width: 485px;
  height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  border-right: 1px solid ${color.GrayScale.gray3};
`;

const HeaderContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 0;
  flex-shrink: 0;
`;

const ContentContainer = css`
  flex: 1;
  overflow-y: scroll;
`;

const LineWrapper = css`
  width: 405px;
  border-bottom: 1px solid ${color.GrayScale.gray3};
  margin: 20px auto;
`;

const LocationSectionText = css`
  color: ${color.GrayScale.black};
  font: ${typography.Label.l1_semi};
`;
