import { css } from "@emotion/react";
import { useRef, useState } from "react";
import { CustomError } from "@/utils/CustomError";
import LoadingSpinner from "@/components/LoadingSpinner";

import { MidPointButton, ZoomButton } from "@/features/map/components";
import {
  useInitializeMap,
  useVisualizeMarker,
  useVisualizeRoute,
  useZoomLevel,
} from "@/features/map/hooks";
import getRouteMidPoint from "@/features/map/utils/getRouteMidPoint.util";
import type { HighlightType } from "@/features/map/Map.types";
import RoutePicker from "@/features/routePicker/RoutePicker";
import { useGetNode } from "@/apis/ScheduleAPI";

const MapContent = ({ id }: { id: number }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedPassenger, setSelectedPassenger] =
    useState<Partial<HighlightType> | null>(null);

  const {
    polyline: polylinePath,
    marker: markerPath,
    highlight: highlightPath,
    isError,
    error,
    isFetching,
  } = useGetNode(id);

  const safeMarkerPath = markerPath ?? [];
  const safePolylinePath = polylinePath ?? [];
  const safeHighlightPath = highlightPath ?? [];

  // 지도 초기 위치 계산
  const markerPathLatLng = safeMarkerPath.flatMap((path) => path.point);
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
    markerPath: safeMarkerPath,
    onClickMarker: handleHighlight,
    onClickMap: handleReset,
  });
  const { highlightRoute, resetRoute } = useVisualizeRoute({
    map,
    polylinePath: safePolylinePath,
  });

  // 하이라이팅/초기화
  const passengers = safeHighlightPath.map((item) => ({
    bookId: item.bookId,
    bookName: item.bookName,
    hospitalTime: item.hospitalTime,
  }));
  function handleHighlight(id: number) {
    const highlight = safeHighlightPath.find((value) => value.bookId === id);
    if (!highlight) return;

    setSelectedPassenger({
      bookId: highlight.bookId,
      bookName: highlight.bookName,
      hospitalTime: highlight.hospitalTime,
    });

    const { segmentList } = highlight;
    const slicedPolylineList = safePolylinePath
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

  if (isError)
    throw new CustomError({
      message: error?.message || "지도 관련 데이터가 없습니다",
    });

  return (
    <div css={MapContentContainer}>
      {isFetching && (
        <div css={LoadingSpinnerWrapper}>
          <LoadingSpinner />
        </div>
      )}

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

export default MapContent;

const MapContentContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const LoadingSpinnerWrapper = css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.6);
  z-index: 10;
`;

const MapWrapper = css`
  width: 100%;
  height: 100%;
`;
