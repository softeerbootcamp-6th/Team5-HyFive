import EmptyUI from "@/components/EmptyUI";
import FallbackUI from "@/components/FallbackUI";
import LoadingSpinner from "@/components/LoadingSpinner";
import MapContent from "@/features/map/MapContent";
import MapHeader from "@/features/map/MapHeader";
import type {
  ScheduleData,
  ScheduleType,
} from "@/features/schedule/Schedule.types";
import { css } from "@emotion/react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
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
  const activeId = selectedSchedule?.routeId;
  if (!selectedSchedule || !activeId) {
    return <EmptyUI type="dynamic" message="지도에 나타낼 정보가 없습니다" />;
  }

  return (
    <div css={ScheduleDetailSectionContainer}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={FallbackUI}>
            <Suspense
              fallback={
                <div css={LoadingSpinnerWrapper}>
                  <LoadingSpinner />
                </div>
              }
            >
              <MapHeader
                scheduleType={scheduleType}
                selectedSchedule={selectedSchedule}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={FallbackUI}>
            <Suspense
              fallback={
                <div css={LoadingSpinnerWrapper}>
                  <LoadingSpinner />
                </div>
              }
            >
              <MapContent id={activeId} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
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
