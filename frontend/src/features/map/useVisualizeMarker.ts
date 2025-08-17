import type { MarkerPath } from "@/features/map/Map.types";
import { useEffect } from "react";

interface UseVisualizeMarkerProps {
  map: MapInstance | null;
  markerPath: MarkerPath[];
}
const useVisualizeMarker = ({ map, markerPath }: UseVisualizeMarkerProps) => {
  useEffect(() => {
    const kakaoMaps = window.kakao.maps;
    if (!kakaoMaps || !map) return;

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

    for (let i = 0; i < markerPath.length; i++) {
      const markerType = getMarkerType(i, markerPath.length);
      const imageSize = new kakaoMaps.Size(32, 32);
      const markerImage = new kakaoMaps.MarkerImage(
        imageSrc[markerType],
        imageSize,
      );

      new kakaoMaps.Marker({
        map,
        position: new kakaoMaps.LatLng(
          markerPath[i].point.lat,
          markerPath[i].point.lng,
        ),
        title: "User Marker",
        image: markerImage,
      });
    }
  }, [map, markerPath]);

  const highlightMarker = () => {};

  const resetMarker = () => {};

  return {
    highlightMarker,
    resetMarker,
  };
};

export default useVisualizeMarker;
