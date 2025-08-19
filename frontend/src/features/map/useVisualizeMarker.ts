import {
  MarkerDefaultIcon,
  MarkerEndIcon,
  MarkerEnterIcon,
  MarkerOutIcon,
  MarkerStartIcon,
} from "@/assets/icons";
import type { LatLng, MarkerPath } from "@/features/map/Map.types";
import { useCallback, useEffect, useMemo, useRef } from "react";

interface UseVisualizeMarkerProps {
  map: MapInstance | null;
  markerPath: MarkerPath[];
}
type MarkerType = "start" | "end" | "middle" | "enter" | "out";

const useVisualizeMarker = ({ map, markerPath }: UseVisualizeMarkerProps) => {
  const markersRef = useRef<MarkerInstance[]>([]);
  const kakaoMaps = window.kakao?.maps;
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
      const imageSize = new kakaoMaps.Size(32, 32);
      const markerImage = new kakaoMaps.MarkerImage(
        imageSrc[markerType],
        imageSize,
      );
      const marker = new kakaoMaps.Marker({
        map,
        position: new kakaoMaps.LatLng(point.lat, point.lng),
        title: "User Marker",
        image: markerImage,
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
