import { useGetNode } from "@/apis/ScheduleAPI";
import MapCore from "@/features/map/MapCore";

const MapContent = ({ id }: { id: number }) => {
  const { polyline, marker, highlight } = useGetNode(id);

  // 데이터 없는 경우 대비
  const safeMarkerPath = marker ?? [];
  const safePolylinePath = polyline ?? [];
  const safeHighlightPath = highlight ?? [];

  return (
    <MapCore
      markerPath={safeMarkerPath}
      polylinePath={safePolylinePath}
      highlightPath={safeHighlightPath}
    />
  );
};

export default MapContent;
