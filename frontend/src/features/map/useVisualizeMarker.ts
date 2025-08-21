import {
  MarkerDefaultIcon,
  MarkerEndIcon,
  MarkerEnterIcon,
  MarkerOutIcon,
  MarkerStartIcon,
} from "@/assets/icons";
import getRouteMidPoint from "@/features/map/getRouteMidPoint.util";
import createInfoWindowHTML from "@/features/map/InfoWindow";
import type {
  HighlightType,
  LatLng,
  MarkerPath,
} from "@/features/map/Map.types";
import { useCallback, useEffect, useMemo, useRef } from "react";

interface UseVisualizeMarkerProps {
  map: MapInstance | null;
  markerPath: MarkerPath[];
  onClickMarker: (id: number) => void;
  onClickMap: () => void;
}
type MarkerType = "start" | "end" | "middle" | "enter" | "out";

const useVisualizeMarker = ({
  map,
  markerPath,
  onClickMarker,
  onClickMap,
}: UseVisualizeMarkerProps) => {
  const kakaoMaps = window.kakao?.maps;
  const markersRef = useRef<MarkerInstance[]>([]);
  const currentOverlayRef = useRef<CustomOverlayInstance | null>(null);

  const imageSrc = useMemo(
    () => ({
      start: MarkerStartIcon,
      middle: MarkerDefaultIcon,
      end: MarkerEndIcon,
      enter: MarkerEnterIcon,
      out: MarkerOutIcon,
    }),
    [],
  );

  const getMarkerType = (
    index: number,
    length: number,
  ): Partial<MarkerType> => {
    if (index === 0) return "start";
    if (index === length - 1) return "end";
    return "middle";
  };

  const renderMarker = useCallback(
    ({
      markerType,
      point,
      bookId,
      mode = "default",
    }: {
      markerType: MarkerType;
      point: LatLng;
      bookId: number;
      mode?: "default" | "highlight";
    }) => {
      const markerImage = new kakaoMaps.MarkerImage(
        imageSrc[markerType],
        new kakaoMaps.Size(32, 32),
      );
      const marker = new kakaoMaps.Marker({
        map,
        position: new kakaoMaps.LatLng(point.lat, point.lng),
        title: "User Marker",
        image: markerImage,
      });
      if (mode === "default") {
        kakaoMaps.event.addListener(marker, "click", function () {
          onClickMarker(bookId);
        });
      }
      return marker;
    },
    [kakaoMaps, map, imageSrc],
  );

  const renderInfoWindow = ({ data }: { data: HighlightType }) => {
    const midPoint = getRouteMidPoint([
      { lat: data.startLoc.lat, lng: data.startLoc.lng },
      { lat: data.endLoc.lat, lng: data.endLoc.lng },
    ]) as LatLng;

    const customOverlay = new kakaoMaps.CustomOverlay({
      position: new kakaoMaps.LatLng(midPoint.lat, midPoint.lng),
      content: createInfoWindowHTML({
        name: data.bookName,
        status: "PASSENGER",
        time: { startTime: data.startTime, endTime: data.endTime },
      }),
    });
    currentOverlayRef.current?.setMap(null);
    currentOverlayRef.current = customOverlay;
    currentOverlayRef.current.setMap(map);
  };

  const removeMarker = () => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  };

  const initMarker = useCallback(() => {
    removeMarker();

    markersRef.current = markerPath.map((partMarkerPath, i) => {
      const markerType = getMarkerType(i, markerPath.length);
      const marker = renderMarker({
        markerType,
        point: partMarkerPath.point,
        bookId: partMarkerPath.bookId,
      });
      return marker;
    });
  }, [markerPath, renderMarker]);

  useEffect(() => {
    if (!kakaoMaps || !map) return;
    initMarker();

    // map click: custom overlay 삭제
    const handleMapClick = () => {
      currentOverlayRef.current?.setMap(null);
      onClickMap();
    };
    kakaoMaps.event.addListener(map, "click", handleMapClick);

    return () => {
      kakaoMaps.event.removeListener(map, "click", handleMapClick);
    };
  }, [map, kakaoMaps, initMarker]);

  const highlightMarker = ({
    start,
    end,
    data,
  }: {
    data: HighlightType;
    start: LatLng;
    end: LatLng;
  }) => {
    removeMarker();
    //TODO: bookId 연동 필요
    const startMarker = renderMarker({
      markerType: "enter",
      point: start,
      bookId: 1,
      mode: "highlight",
    });
    const endMarker = renderMarker({
      markerType: "out",
      point: end,
      bookId: 1,
      mode: "highlight",
    });
    renderInfoWindow({ data });
    markersRef.current.push(startMarker);
    markersRef.current.push(endMarker);
  };

  return {
    initMarker,
    highlightMarker,
  };
};

export default useVisualizeMarker;
