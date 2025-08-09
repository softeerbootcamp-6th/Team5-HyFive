import { INITIAL_ZOOM_LEVEL } from "@/features/map/useZoomLevel";
import { useEffect, useState, type RefObject } from "react";

interface UseInitializeMapProps {
  mapRef: RefObject<HTMLDivElement | null>;
  centerLat: number;
  centerLng: number;
}
const useInitializeMap = ({
  mapRef,
  centerLat,
  centerLng,
}: UseInitializeMapProps) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(centerLat, centerLng),
      level: INITIAL_ZOOM_LEVEL,
    };
    const initializedMap = new window.kakao.maps.Map(mapRef.current, options);
    setMap(initializedMap);
  }, [mapRef, centerLat, centerLng]);

  return { map };
};

export default useInitializeMap;
