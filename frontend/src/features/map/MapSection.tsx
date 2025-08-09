import FallbackUI from "@/components/FallbackUI";
import MapContent from "@/features/map/MapContent";
import MapHeader from "@/features/map/MapHeader";
import type { ScheduleType } from "@/features/schedule/Schedule.types";
import { css } from "@emotion/react";
import { ErrorBoundary } from "react-error-boundary";

interface MapSectionProps {
  scheduleType: ScheduleType;
  data: {
    id: number;
    routeStartLocation: string;
    routeEndLocation: string;
  };
}
const MapSection = ({ scheduleType, data }: MapSectionProps) => {
  return (
    <div css={MapSectionContainer}>
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

export default MapSection;

const MapSectionContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
