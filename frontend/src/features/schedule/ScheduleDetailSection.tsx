import FallbackUI from "@/components/FallbackUI";
import MapContent from "@/features/map/MapContent";
import MapHeader from "@/features/schedule/MapHeader";
import type { ScheduleType } from "@/features/schedule/Schedule.types";
import { css } from "@emotion/react";
import { ErrorBoundary } from "react-error-boundary";

interface ScheduleDetailSectionProps {
  scheduleType: ScheduleType;
  data: {
    id: number;
    routeStartLocation: string;
    routeEndLocation: string;
  };
}
const ScheduleDetailSection = ({
  scheduleType,
  data,
}: ScheduleDetailSectionProps) => {
  return (
    <div css={ScheduleDetailSectionContainer}>
      <MapHeader scheduleType={scheduleType} data={data} />
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <FallbackUI error={error} handleRetry={resetErrorBoundary} />
        )}
      >
        <MapContent />
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
