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
  const INITIAL_ZOOM_SIZE = 4;
  useEffect(() => {
    const container = mapRef.current;
    if (!container) {
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(centerLat, centerLng),
      level: INITIAL_ZOOM_SIZE,
    };

    const initializedMap = new window.kakao.maps.Map(container, options);
    setMap(initializedMap);
  }, []);

  return { map };
};

export default useInitializeMap;
