import { useGetNode } from "@/apis/ScheduleAPI";
import LoadingSpinner from "@/components/LoadingSpinner";
import MapCore from "@/features/map/MapCore";
import { Suspense } from "react";

const MapContent = ({ id }: { id: number }) => {
  const { polyline, marker, highlight } = useGetNode(id);

  const safeMarkerPath = marker ?? [];
  const safePolylinePath = polyline ?? [];
  const safeHighlightPath = highlight ?? [];

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MapCore
        markerPath={safeMarkerPath}
        polylinePath={safePolylinePath}
        highlightPath={safeHighlightPath}
      />
    </Suspense>
  );
};

export default MapContent;
