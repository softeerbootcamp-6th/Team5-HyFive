import MapHeader from "@/features/schedule/MapHeader";
import type { ScheduleType } from "@/features/schedule/Schedule.types";
import { css } from "@emotion/react";

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
    </div>
  );
};

export default MapSection;

const MapSectionContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
