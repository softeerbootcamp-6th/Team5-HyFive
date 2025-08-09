import type { Path } from "@/types/path.types";
import { useEffect } from "react";

interface UseVisualizeMarkerProps {
  map: any;
  path: Path[];
}
const useVisualizeMarker = ({ map, path }: UseVisualizeMarkerProps) => {
  const initializeMarker = () => {
    useEffect(() => {
      if (!map) return;

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

      for (let i = 0; i < path.length; i++) {
        const markerType = getMarkerType(i, path.length);
        const imageSize = new window.kakao.maps.Size(32, 32);
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc[markerType],
          imageSize,
        );

        new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(path[i].lng, path[i].lat),
          title: "User Marker",
          image: markerImage,
        });
      }
    }, [map]);
  };

  const highlightMarker = () => {};

  const resetMarker = () => {};

  return {
    initializeMarker,
    highlightMarker,
    resetMarker,
  };
};

export default useVisualizeMarker;
