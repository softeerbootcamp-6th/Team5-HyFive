import EmptyUI from "@/components/EmptyUI";
import FallbackUI from "@/components/FallbackUI";
import LoadingSpinner from "@/components/LoadingSpinner";
import MapContent from "@/features/map/MapContent";
import MapHeader from "@/features/schedule/MapHeader";
import type {
  ScheduleData,
  ScheduleType,
} from "@/features/schedule/Schedule.types";
import { css } from "@emotion/react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface ScheduleDetailSectionProps {
  scheduleType: ScheduleType;
  selectedSchedule: Partial<ScheduleData> | null;
}
const ScheduleDetailSection = ({
  scheduleType,
  selectedSchedule,
}: ScheduleDetailSectionProps) => {
  if (!selectedSchedule || !selectedSchedule.routeId) {
    return <EmptyUI type="dynamic" message="지도에 나타낼 정보가 없습니다" />;
  }
  return (
    <div css={ScheduleDetailSectionContainer}>
      <MapHeader
        scheduleType={scheduleType}
        selectedSchedule={selectedSchedule}
      />
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <FallbackUI error={error} handleRetry={resetErrorBoundary} />
        )}
      >
        <Suspense
          fallback={
            <div css={LoadingSpinnerWrapper}>
              <LoadingSpinner />
            </div>
          }
        >
          <MapContent id={selectedSchedule.routeId} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ScheduleDetailSection;

const ScheduleDetailSectionContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const LoadingSpinnerWrapper = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
