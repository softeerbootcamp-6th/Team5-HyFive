import animateRouteSegments from "@/features/map/animateRouteSegments.util";
import type { LatLng, PolylinePath } from "@/features/map/Map.types";
import { useEffect, useRef } from "react";

interface UseVisualizeRouteProps {
  map: MapInstance | null;
  polylinePath: PolylinePath[];
}

const useVisualizeRoute = ({ map, polylinePath }: UseVisualizeRouteProps) => {
  const kakaoMaps = window.kakao?.maps;
  const basePolylineRef = useRef<PolylineInstance | null>(null);
  const highlightPolylineRef = useRef<PolylineInstance | null>(null);

  useEffect(() => {
    if (!kakaoMaps || !map || polylinePath.length === 0) return;

    const basePolyline = new kakaoMaps.Polyline({
      path: [],
      strokeWeight: 16,
      strokeColor: "#F70",
      strokeOpacity: 1,
      strokeStyle: "solid",
    });
    basePolyline.setMap(map);
    basePolylineRef.current = basePolyline;

    const highlightPolyline = new kakaoMaps.Polyline({
      path: [],
      strokeWeight: 16,
      strokeColor: "#F70",
      strokeOpacity: 1,
      strokeStyle: "solid",
    });
    highlightPolyline.setMap(map);
    highlightPolylineRef.current = highlightPolyline;

    //requestAnimationFrame 기반 순차 렌더링
    const accumulatedPath: LatLngInstance[] = [];
    animateRouteSegments({
      polylinePath,
      renderSegment: (segment) => {
        const kakaoPath = segment.map(
          (p) => new kakaoMaps.LatLng(p.lat, p.lng),
        );
        accumulatedPath.push(...kakaoPath);
        basePolyline.setPath(accumulatedPath);
      },
    });
  }, [map, polylinePath]);

  const highlightRoute = (highlightPath: LatLng[]) => {
    if (!kakaoMaps || !basePolylineRef.current || !highlightPolylineRef.current)
      return;
    const kakaoPath = highlightPath.map(
      (p) => new kakaoMaps.LatLng(p.lat, p.lng),
    );
    highlightPolylineRef.current.setPath(kakaoPath);
    basePolylineRef.current.setOptions({ strokeColor: "#ccc" });
  };

  const resetRoute = () => {
    if (!kakaoMaps || !basePolylineRef.current || !highlightPolylineRef.current)
      return;
    highlightPolylineRef.current.setPath([]);
    basePolylineRef.current.setOptions({ strokeColor: "#F70" });
  };

  return {
    highlightRoute,
    resetRoute,
  };
};

export default useVisualizeRoute;
