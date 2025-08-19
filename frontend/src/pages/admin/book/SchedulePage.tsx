import ScheduleDetailSection from "@/features/schedule/ScheduleDetailSection";
import ScheduleListSection from "@/features/schedule/ScheduleListSection";
import TabMatcher from "@/utils/TabMatcher";
import { css } from "@emotion/react";
import { useState } from "react";

const SchedulePage = () => {
  const TAB_LIST = ["운행 중", "운행 대기", "운행 완료"];
  const [activeTab, setActiveTab] = useState<string>(TAB_LIST[0]);
  const sampleData = {
    id: 8888,
    routeStartLocation: "출발로123",
    routeEndLocation: "도착로123",
  };
  const parsedActiveTab = TabMatcher.matchScheduleTypeKRToENG(activeTab);
  return (
    <div css={BookPageContainer}>
      <ScheduleListSection
        TAB_LIST={TAB_LIST}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        parsedActiveTab={parsedActiveTab}
      />
      <ScheduleDetailSection scheduleType={parsedActiveTab} data={sampleData} />
    </div>
  );
};

export default SchedulePage;

const BookPageContainer = css`
  display: flex;
  flex-direction: row;
  height: 100%;
`;
