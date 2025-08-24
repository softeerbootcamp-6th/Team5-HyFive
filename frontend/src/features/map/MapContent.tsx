import { useGetNode } from "@/apis/ScheduleAPI";
import MapCore from "@/features/map/MapCore";
import { CustomError } from "@/utils/CustomError";

const MapContent = ({ id }: { id: number }) => {
  const { polyline, marker, highlight, isError } = useGetNode(id);

  const safeMarkerPath = marker ?? [];
  const safePolylinePath = polyline ?? [];
  const safeHighlightPath = highlight ?? [];

  if (isError)
    throw new CustomError({
      message: "지도 관련 데이터가 존재하지 않습니다",
    });

  return (
    <MapCore
      markerPath={safeMarkerPath}
      polylinePath={safePolylinePath}
      highlightPath={safeHighlightPath}
    />
  );
};

export default MapContent;
