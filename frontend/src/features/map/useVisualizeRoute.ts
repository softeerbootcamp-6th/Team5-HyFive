import type { Path } from "@/types/path.types";
import { useEffect } from "react";

interface UseVisualizeRouteProps {
  map: MapInstance | null;
  path: Path[];
}
const useVisualizeRoute = ({ map, path }: UseVisualizeRouteProps) => {
  useEffect(() => {
    const kakaoMaps = window.kakao.maps;
    if (!kakaoMaps || !map) return;

    const linePath = path.map(
      (point) => new kakaoMaps.LatLng(point.lat, point.lng),
    );

    const polyline = new kakaoMaps.Polyline({
      path: linePath,
      strokeWeight: 16,
      strokeColor: "#F70",
      strokeOpacity: 1,
      strokeStyle: "solid",
    });

    polyline.setMap(map);
  }, [map, path]);

  const highlightRoute = () => {};

  const resetRoute = () => {};

  return {
    highlightRoute,
    resetRoute,
  };
};

export default useVisualizeRoute;
