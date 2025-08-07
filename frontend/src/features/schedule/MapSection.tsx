import MapContent from "@/features/schedule/MapContent";
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
      <MapContent />
    </div>
  );
};

export default MapSection;

const MapSectionContainer = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 40px 60px 42px;
  width: 100%;
  height: 100%;
`;
