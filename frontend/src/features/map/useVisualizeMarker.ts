import {
  MarkerDefaultIcon,
  MarkerEndIcon,
  MarkerEnterIcon,
  MarkerOutIcon,
  MarkerStartIcon,
} from "@/assets/icons";
import createInfoWindowHTML from "@/features/map/InfoWindow";
import type { LatLng, MarkerPath } from "@/features/map/Map.types";
import { useCallback, useEffect, useMemo, useRef } from "react";

interface UseVisualizeMarkerProps {
  map: MapInstance | null;
  markerPath: MarkerPath[];
}
type MarkerType = "start" | "end" | "middle" | "enter" | "out";

const useVisualizeMarker = ({ map, markerPath }: UseVisualizeMarkerProps) => {
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
    ({ markerType, point }: { markerType: MarkerType; point: LatLng }) => {
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

      // marker click: custom overlay 등장
      const customOverlay = new kakaoMaps.CustomOverlay({
        position: new kakaoMaps.LatLng(point.lat, point.lng),
        content: createInfoWindowHTML({
          name: "김민정",
          status: "탑승",
          time: { startTime: "12:00", endTime: "13:00" },
        }),
      });
      kakaoMaps.event.addListener(marker, "click", function () {
        currentOverlayRef.current?.setMap(null);
        customOverlay.setMap(map);
        currentOverlayRef.current = customOverlay;
      });
      return marker;
    },
    [kakaoMaps, map, imageSrc],
  );

  const removeMarker = () => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  };

  const initMarker = useCallback(() => {
    removeMarker();

    markersRef.current = markerPath.map((partMarkerPath, i) => {
      const markerType = getMarkerType(i, markerPath.length);
      return renderMarker({ markerType, point: partMarkerPath.point });
    });
  }, [markerPath, renderMarker]);

  useEffect(() => {
    if (!kakaoMaps || !map) return;
    initMarker();

    // map click: custom overlay 삭제
    const handleMapClick = () => {
      currentOverlayRef.current?.setMap(null);
    };
    kakaoMaps.event.addListener(map, "click", handleMapClick);

    return () => {
      kakaoMaps.event.removeListener(map, "click", handleMapClick);
    };
  }, [map, kakaoMaps, initMarker]);

  const highlightMarker = ({ start, end }: { start: LatLng; end: LatLng }) => {
    removeMarker();
    const startMarker = renderMarker({ markerType: "enter", point: start });
    const endMarker = renderMarker({ markerType: "out", point: end });
    markersRef.current.push(startMarker);
    markersRef.current.push(endMarker);
  };

  return {
    initMarker,
    highlightMarker,
  };
};

export default useVisualizeMarker;
