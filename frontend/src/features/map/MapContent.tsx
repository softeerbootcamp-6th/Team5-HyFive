import CenterButton from "@/features/map/CenterButton";
import getRouteMidPoint from "@/features/map/getRouteMidPoint.util";
import useInitializeMap from "@/features/map/useInitializeMap";
import useVisualizeMarker from "@/features/map/useVisualizeMarker";
import useVisualizeRoute from "@/features/map/useVisualizeRoute";
import useZoomLevel from "@/features/map/useZoomLevel";
import ZoomButton from "@/features/map/ZoomButton";
import RoutePicker from "@/features/routePicker/RoutePicker";
import { highlightPath, markerPath, polylinePath } from "@/mocks/pathMocks";
import { css } from "@emotion/react";
import { useRef } from "react";

const MapContent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerPathLatLng = markerPath.flatMap((path) => path.point);

  // map 초기화
  const { map, handleInitMidPoint } = useInitializeMap({
    mapRef,
    centerLat:
      getRouteMidPoint(markerPathLatLng).lat || markerPath[0].point.lat,
    centerLng:
      getRouteMidPoint(markerPathLatLng).lng || markerPath[0].point.lng,
  });
  const { zoomLevel, handleZoomLevel } = useZoomLevel({ map });

  // marker, polyline 시각화
  const { highlightMarker, initMarker } = useVisualizeMarker({
    map,
    markerPath,
  });
  const { highlightRoute, resetRoute } = useVisualizeRoute({
    map,
    polylinePath,
  });

  // 개별 탑승자 경로 하이라이팅
  const handleHighlight = (id: number) => {
    const highlight = highlightPath.find((value) => value.bookId === id);
    if (!highlight) return;

    const { start, end, segmentList } = highlight;
    const slicedPolylineList = polylinePath
      .filter((segment) => segmentList.includes(segment.segmentId))
      .flatMap((segment) => segment.pointList);

    highlightRoute(slicedPolylineList);
    highlightMarker({ start, end });
  };
  const handleReset = () => {
    resetRoute();
    initMarker();
  };

  return (
    <div css={MapContentContainer}>
      <div id="map" ref={mapRef} css={MapWrapper} />
      <CenterButton handleInitMidPoint={handleInitMidPoint} />
      <ZoomButton zoomLevel={zoomLevel} handleZoomLevel={handleZoomLevel} />
      <RoutePicker
        handleHighlight={handleHighlight}
        handleReset={handleReset}
      />
    </div>
  );
};

export default MapContent;

const MapContentContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MapWrapper = css`
  width: 100%;
  height: 100%;
`;
