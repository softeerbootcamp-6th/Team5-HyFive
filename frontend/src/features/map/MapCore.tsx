import { css } from "@emotion/react";
import { useRef, useState } from "react";
import { MidPointButton, ZoomButton } from "@/features/map/components";
import {
  useInitializeMap,
  useVisualizeMarker,
  useVisualizeRoute,
  useZoomLevel,
} from "@/features/map/hooks";
import getRouteMidPoint from "@/features/map/utils/getRouteMidPoint.util";
import type {
  HighlightType,
  MarkerPath,
  PolylinePath,
} from "@/features/map/Map.types";
import RoutePicker from "@/features/routePicker/RoutePicker";

interface MapCoreProps {
  markerPath: MarkerPath[];
  polylinePath: PolylinePath[];
  highlightPath: HighlightType[];
}
const MapCore = ({ markerPath, polylinePath, highlightPath }: MapCoreProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedPassenger, setSelectedPassenger] =
    useState<Partial<HighlightType> | null>(null);

  // 지도 초기 위치 계산
  const markerPathLatLng = markerPath.flatMap((path) => path.point);
  const defaultCenter = markerPathLatLng.length
    ? getRouteMidPoint(markerPathLatLng)
    : { lat: 37.674088, lng: 127.070157 };

  // Map 초기화
  const { map, handleInitMidPoint } = useInitializeMap({
    mapRef,
    centerLat: defaultCenter.lat,
    centerLng: defaultCenter.lng,
  });
  const { zoomLevel, handleZoomLevel } = useZoomLevel({ map });
  const { highlightMarker, initMarker } = useVisualizeMarker({
    map,
    markerPath: markerPath,
    onClickMarker: handleHighlight,
    onClickMap: handleReset,
  });
  const { highlightRoute, resetRoute } = useVisualizeRoute({
    map,
    polylinePath: polylinePath,
  });

  // 하이라이팅/초기화
  const passengers = highlightPath.map((item) => ({
    bookId: item.bookId,
    bookName: item.bookName,
    hospitalTime: item.hospitalTime,
  }));
  function handleHighlight(id: number) {
    const highlight = highlightPath.find((value) => value.bookId === id);
    if (!highlight) return;

    setSelectedPassenger({
      bookId: highlight.bookId,
      bookName: highlight.bookName,
      hospitalTime: highlight.hospitalTime,
    });

    const { segmentList } = highlight;
    const slicedPolylineList = polylinePath
      .filter((segment) => segmentList.includes(segment.segmentId))
      .flatMap((segment) => segment.pointList);

    highlightRoute(slicedPolylineList);
    highlightMarker({ data: highlight });
  }

  function handleReset() {
    setSelectedPassenger(null);
    resetRoute();
    initMarker();
  }

  return (
    <div css={MapContentContainer}>
      <div id="map" ref={mapRef} css={MapWrapper} />
      <MidPointButton onClick={handleInitMidPoint} />
      <ZoomButton zoomLevel={zoomLevel} handleZoomLevel={handleZoomLevel} />
      <RoutePicker
        passengers={passengers}
        selectedPassenger={selectedPassenger}
        handleHighlight={handleHighlight}
        handleReset={handleReset}
      />
    </div>
  );
};

export default MapCore;

const MapContentContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MapWrapper = css`
  width: 100%;
  height: 100%;
`;
