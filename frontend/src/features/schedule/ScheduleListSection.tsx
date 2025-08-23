import { useGetEntireSchedule } from "@/apis/ScheduleAPI";
import FallbackUI from "@/components/FallbackUI";
import RefetchButton from "@/components/RefetchButton";
import Tabs from "@/components/Tabs";
import type {
  ScheduleData,
  ScheduleType,
} from "@/features/schedule/Schedule.types";
import ScheduleDataFetcher from "@/features/schedule/ScheduleDataFetcher";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
import type { Dispatch, SetStateAction } from "react";
import { ErrorBoundary } from "react-error-boundary";
const { color, typography } = theme;

interface ScheduleListSectionProps {
  TAB_LIST: string[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  parsedActiveTab: ScheduleType;
  selectedSchedule: Partial<ScheduleData | null>;
  setSelectedSchedule: Dispatch<SetStateAction<Partial<ScheduleData | null>>>;
}
const ScheduleListSection = ({
  TAB_LIST,
  activeTab,
  setActiveTab,
  parsedActiveTab,
  selectedSchedule,
  setSelectedSchedule,
}: ScheduleListSectionProps) => {
  const LOCATION_SECTION = "운정 1구역";
  const { refetch } = useGetEntireSchedule(activeTab);
  return (
    <div css={ScheduleListSectionContainer}>
      <div css={HeaderContainer}>
        <p css={LocationSectionText}>{LOCATION_SECTION}</p>
        <RefetchButton handleClick={refetch} />
      </div>
      <Tabs
        type="bar_true"
        group={TAB_LIST}
        selected={activeTab}
        setSelected={setActiveTab}
      />
      <div css={ContentContainer}>
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <FallbackUI
              error={error}
              handleRetry={() => {
                resetErrorBoundary();
                void refetch();
              }}
            />
          )}
        >
          <ScheduleDataFetcher
            activeTab={activeTab}
            parsedActiveTab={parsedActiveTab}
            selectedSchedule={selectedSchedule}
            setSelectedSchedule={setSelectedSchedule}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ScheduleListSection;

const ScheduleListSectionContainer = css`
  min-width: 485px;
  max-width: 485px;
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

const LocationSectionText = css`
  color: ${color.GrayScale.black};
  font: ${typography.Label.l1_semi};
`;
