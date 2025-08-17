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
  const { map } = useInitializeMap({
    mapRef,
    centerLat: getRouteMidPoint(markerPath).lat || markerPath[0].point.lat,
    centerLng: getRouteMidPoint(markerPath).lng || markerPath[0].point.lng,
  });
  const { highlightMarker, initMarker } = useVisualizeMarker({
    map,
    markerPath,
  });
  const { highlightRoute, resetRoute } = useVisualizeRoute({
    map,
    polylinePath,
  });
  const { setZoomLevel } = useZoomLevel({ map });

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
      <ZoomButton setZoomLevel={setZoomLevel} />
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
