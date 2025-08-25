import { useEffect, useState } from "react";

interface UseZoomLevelProps {
  map: MapInstance | null;
}

export const INITIAL_ZOOM_LEVEL = 5;
export const MAX_ZOOM_LEVEL = 6;

const useZoomLevel = ({ map }: UseZoomLevelProps) => {
  const [zoomLevel, setZoomLevel] = useState(INITIAL_ZOOM_LEVEL);
  const kakaoMaps = window.kakao?.maps;

  useEffect(() => {
    if (!kakaoMaps || !map) return;
    kakaoMaps.event.addListener(map, "zoom_changed", function () {
      setZoomLevel(map.getLevel());
    });
  }, [kakaoMaps, map]);

  useEffect(() => {
    if (!map) return;
    map.setLevel(zoomLevel);
  }, [zoomLevel, map]);

  const handleZoomLevel = (mode: "add" | "remove") => {
    if (mode === "add") {
      setZoomLevel((prev) => {
        if (prev > 1) return prev - 1;
        return prev;
      });
    }
    if (mode === "remove") {
      setZoomLevel((prev) => {
        if (prev < MAX_ZOOM_LEVEL) return prev + 1;
        return prev;
      });
    }
  };

  return {
    zoomLevel,
    handleZoomLevel,
  };
};

export default useZoomLevel;
