import type { ScheduleData } from "@/features/schedule/Schedule.types";
import ScheduleDetailSection from "@/features/schedule/ScheduleDetailSection";
import ScheduleListSection from "@/features/schedule/ScheduleListSection";
import TabMatcher from "@/utils/TabMatcher";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

const SchedulePage = () => {
  const TAB_LIST = ["운행 중", "운행 대기", "운행 완료"];

  // 상태값 관리
  const [activeTab, setActiveTab] = useState<string>(TAB_LIST[0]);
  const parsedActiveTab = TabMatcher.matchScheduleTypeKRToENG(activeTab);
  const [selectedSchedule, setSelectedSchedule] =
    useState<Partial<ScheduleData> | null>(null);

  // 탭 변경시 선택된 운행 정보 초기화
  useEffect(() => {
    setSelectedSchedule(null);
  }, [activeTab]);

  return (
    <div css={BookPageContainer}>
      <ScheduleListSection
        TAB_LIST={TAB_LIST}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        parsedActiveTab={parsedActiveTab}
        selectedSchedule={selectedSchedule}
        setSelectedSchedule={setSelectedSchedule}
      />
      {selectedSchedule && (
        <ScheduleDetailSection
          scheduleType={parsedActiveTab}
          selectedSchedule={selectedSchedule}
        />
      )}
    </div>
  );
};

export default SchedulePage;

const BookPageContainer = css`
  display: flex;
  flex-direction: row;
  height: 100%;
`;
