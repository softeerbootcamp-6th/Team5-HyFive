import { useEffect, useState } from "react";

interface UseZoomLevelProps {
  map: any;
}
export const INITIAL_ZOOM_LEVEL = 4;

const useZoomLevel = ({ map }: UseZoomLevelProps) => {
  const [zoomLevel, setZoomLevel] = useState(INITIAL_ZOOM_LEVEL);

  useEffect(() => {
    if (!map) return;
    map.setLevel(zoomLevel);
  }, [zoomLevel, map]);

  return {
    setZoomLevel,
  };
};

export default useZoomLevel;
