import MapSection from "@/features/schedule/MapSection";
import type { ScheduleType } from "@/features/schedule/Schedule.types";
import ScheduleListSection from "@/features/schedule/ScheduleListSection";
import { css } from "@emotion/react";
import { useState } from "react";

const SchedulePage = () => {
  const TAB_LIST: ScheduleType[] = ["inProgress", "waiting", "completed"];
  const [activeTab, setActiveTab] = useState<ScheduleType>(TAB_LIST[0]);
  const sampleData = {
    id: 8888,
    routeStartLocation: "출발로123",
    routeEndLocation: "도착로123",
  };
  return (
    <div css={BookPageContainer}>
      <ScheduleListSection
        TAB_LIST={TAB_LIST}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <MapSection scheduleType={activeTab} data={sampleData} />
    </div>
  );
};

export default SchedulePage;

const BookPageContainer = css`
  display: flex;
  flex-direction: row;
  height: 100%;
`;
