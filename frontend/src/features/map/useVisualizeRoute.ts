import animateRouteSegments from "@/features/map/animateRouteSegments.util";
import type { LatLng, PolylinePath } from "@/features/map/Map.types";
import { theme } from "@/styles/themes.style";
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
    const polylinePathLatLngList = polylinePath.map((path) => path.pointList);
    animateRouteSegments({
      segments: polylinePathLatLngList,
      renderSegment: (segment) => {
        const kakaoPath = segment.map(
          (point) => new kakaoMaps.LatLng(point.lat, point.lng),
        );
        accumulatedPath.push(...kakaoPath);
        basePolyline.setPath(accumulatedPath);
      },
    });
  }, [map, kakaoMaps, polylinePath]);

  const highlightRoute = (highlightPath: LatLng[]) => {
    if (!basePolylineRef.current || !highlightPolylineRef.current) return;
    const kakaoPath = highlightPath.map(
      (point) => new kakaoMaps.LatLng(point.lat, point.lng),
    );
    highlightPolylineRef.current.setPath(kakaoPath);
    basePolylineRef.current.setOptions({
      strokeColor: theme.color.GrayScale.gray4,
    });
  };

  const resetRoute = () => {
    if (!basePolylineRef.current || !highlightPolylineRef.current) return;
    highlightPolylineRef.current.setPath([]);
    basePolylineRef.current.setOptions({ strokeColor: "#F70" });
  };

  return {
    highlightRoute,
    resetRoute,
  };
};

export default useVisualizeRoute;
