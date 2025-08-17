import type { LatLng, MarkerPath } from "@/features/map/Map.types";
import { useEffect, useRef } from "react";

interface UseVisualizeMarkerProps {
  map: MapInstance | null;
  markerPath: MarkerPath[];
}
const useVisualizeMarker = ({ map, markerPath }: UseVisualizeMarkerProps) => {
  const markersRef = useRef<MarkerInstance[]>([]);
  const kakaoMaps = window.kakao.maps;
  const imageSize = new kakaoMaps.Size(32, 32);

  const getMarkerType = (
    index: number,
    length: number,
  ): keyof typeof imageSrc => {
    if (index === 0) return "start";
    if (index === length - 1) return "end";
    return "middle";
  };

  const imageSrc = {
    start: "/src/assets/icons/marker-start.svg",
    middle: "/src/assets/icons/marker-default.svg",
    end: "/src/assets/icons/marker-end.svg",
  };

  useEffect(() => {
    if (!kakaoMaps || !map) return;

    for (let i = 0; i < markerPath.length; i++) {
      const markerType = getMarkerType(i, markerPath.length);
      const markerImage = new kakaoMaps.MarkerImage(
        imageSrc[markerType],
        imageSize,
      );

      const marker = new kakaoMaps.Marker({
        map,
        position: new kakaoMaps.LatLng(
          markerPath[i].point.lat,
          markerPath[i].point.lng,
        ),
        title: "User Marker",
        image: markerImage,
      });
      markersRef.current.push(marker);
    }
  }, [map, markerPath]);

  const highlightMarker = ({ start, end }: { start: LatLng; end: LatLng }) => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
    const markerImageS = new kakaoMaps.MarkerImage(
      imageSrc["start"],
      imageSize,
    );
    const markerImageE = new kakaoMaps.MarkerImage(imageSrc["end"], imageSize);

    const startMarker = new kakaoMaps.Marker({
      map,
      position: new kakaoMaps.LatLng(start.lat, start.lng),
      title: "User Marker",
      image: markerImageS,
    });

    const endMarker = new kakaoMaps.Marker({
      map,
      position: new kakaoMaps.LatLng(end.lat, end.lng),
      title: "User Marker",
      image: markerImageE,
    });
    markersRef.current.push(startMarker);
    markersRef.current.push(endMarker);
  };

  const resetMarker = () => {
    const kakaoMaps = window.kakao.maps;
    if (!kakaoMaps || !map) return;

    // 기존 마커 제거
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    for (let i = 0; i < markerPath.length; i++) {
      const markerType = getMarkerType(i, markerPath.length);
      const markerImage = new kakaoMaps.MarkerImage(
        imageSrc[markerType],
        imageSize,
      );

      const marker = new kakaoMaps.Marker({
        map,
        position: new kakaoMaps.LatLng(
          markerPath[i].point.lat,
          markerPath[i].point.lng,
        ),
        title: "User Marker",
        image: markerImage,
      });
      markersRef.current.push(marker);
    }
  };

  return {
    highlightMarker,
    resetMarker,
  };
};

export default useVisualizeMarker;
