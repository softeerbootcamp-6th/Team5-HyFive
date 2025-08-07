import type { Path } from "@/types/path.types";
import { useEffect } from "react";

interface UseVisualizeRouteProps {
  map: any;
  path: Path[];
}
const useVisualizeRoute = ({ map, path }: UseVisualizeRouteProps) => {
  useEffect(() => {
    if (!map) return;

    const linePath = path.map(
      (point) => new window.kakao.maps.LatLng(point.lng, point.lat),
    );

    const polyline = new window.kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 16,
      strokeColor: "#F70",
      strokeOpacity: 1,
      strokeStyle: "solid",
    });

    polyline.setMap(map);
  }, [map]);
};

export default useVisualizeRoute;
