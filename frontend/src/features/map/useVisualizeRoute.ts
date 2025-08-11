import animateRouteSegments from "@/features/map/animateRouteSegments.util";
import getRouteSegments from "@/features/map/getRouteSegments.util";
import type { LatLng } from "@/features/map/Map.types";
import { useEffect } from "react";

interface UseVisualizeRouteProps {
  map: MapInstance | null;
  path: LatLng[];
}

const useVisualizeRoute = ({ map, path }: UseVisualizeRouteProps) => {
  useEffect(() => {
    const kakaoMaps = window.kakao?.maps;
    if (!kakaoMaps || !map || path.length === 0) return;

    const SEGMENT_SIZE = 2;
    const segments = getRouteSegments({ path, size: SEGMENT_SIZE });

    const polyline = new kakaoMaps.Polyline({
      path: [],
      strokeWeight: 16,
      strokeColor: "#F70",
      strokeOpacity: 1,
      strokeStyle: "solid",
    });
    polyline.setMap(map);

    //requestAnimationFrame 기반 순차 렌더링
    let accumulatedPath: LatLng[] = [];
    animateRouteSegments({
      segments,
      renderSegment: (segment) => {
        accumulatedPath = [...accumulatedPath, ...segment];
        const kakaoLatLngPath = accumulatedPath.map(
          (p) => new kakaoMaps.LatLng(p.lat, p.lng),
        );
        polyline.setPath(kakaoLatLngPath);
      },
    });
  }, [map, path]);

  const highlightRoute = () => {};
  const resetRoute = () => {};

  return {
    highlightRoute,
    resetRoute,
  };
};

export default useVisualizeRoute;
