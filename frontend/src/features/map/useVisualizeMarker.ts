import type { LatLng, MarkerPath } from "@/features/map/Map.types";
import { useEffect, useRef } from "react";

interface UseVisualizeMarkerProps {
  map: MapInstance | null;
  markerPath: MarkerPath[];
}
type MarkerType = "start" | "end" | "middle" | "enter" | "out";

const useVisualizeMarker = ({ map, markerPath }: UseVisualizeMarkerProps) => {
  const markersRef = useRef<MarkerInstance[]>([]);
  const kakaoMaps = window.kakao.maps;
  const imageSize = new kakaoMaps.Size(32, 32);
  const imageSrc = {
    start: "/src/assets/icons/marker-start.svg",
    middle: "/src/assets/icons/marker-default.svg",
    end: "/src/assets/icons/marker-end.svg",
    enter: "/src/assets/icons/marker-enter.svg",
    out: "/src/assets/icons/marker-out.svg",
  };

  const getMarkerType = (
    index: number,
    length: number,
  ): Partial<MarkerType> => {
    if (index === 0) return "start";
    if (index === length - 1) return "end";
    return "middle";
  };

  useEffect(() => {
    if (!kakaoMaps || !map) return;
    initMarker();
  }, [map, markerPath]);

  const renderMarker = ({
    markerType,
    point,
  }: {
    markerType: MarkerType;
    point: LatLng;
  }) => {
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
  };

  const removeMarker = () => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  };

  const initMarker = () => {
    removeMarker();
    for (let i = 0; i < markerPath.length; i++) {
      const markerType = getMarkerType(i, markerPath.length);
      const marker = renderMarker({
        markerType,
        point: markerPath[i].point,
      });
      markersRef.current.push(marker);
    }
  };

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
