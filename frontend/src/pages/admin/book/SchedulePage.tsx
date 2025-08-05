import type { ScheduleType } from "@/features/schedule/Schedule.types";
import ScheduleListSection from "@/features/schedule/ScheduleListSection";
import { css } from "@emotion/react";
import { useState } from "react";

const SchedulePage = () => {
  const TAB_LIST: ScheduleType[] = ["inProgress", "waiting", "completed"];
  const [activeTab, setActiveTab] = useState<ScheduleType>(TAB_LIST[0]);
  return (
    <div css={BookPageContainer}>
      <ScheduleListSection
        TAB_LIST={TAB_LIST}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default SchedulePage;

const BookPageContainer = css`
  display: flex;
  flex-direction: row;
`;
