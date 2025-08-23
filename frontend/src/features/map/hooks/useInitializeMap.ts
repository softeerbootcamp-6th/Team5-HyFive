import {
  INITIAL_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
} from "@/features/map/hooks/useZoomLevel";
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
  const [map, setMap] = useState<MapInstance | null>(null);
  const midPoint = { lat: centerLat, lng: centerLng };
  const kakaoMaps = window.kakao?.maps;

  useEffect(() => {
    if (!mapRef.current || !kakaoMaps) return;

    const options = {
      center: new kakaoMaps.LatLng(centerLat, centerLng),
      level: INITIAL_ZOOM_LEVEL,
    };

    const initializedMap = new kakaoMaps.Map(mapRef.current, options);
    initializedMap.setMaxLevel(MAX_ZOOM_LEVEL);

    setMap(initializedMap);
  }, [mapRef, centerLat, centerLng]);

  const handleInitMidPoint = () => {
    if (!map || !kakaoMaps) return;
    map?.setCenter(new kakaoMaps.LatLng(midPoint.lat, midPoint.lng));
  };

  return { map, handleInitMidPoint };
};

export default useInitializeMap;
