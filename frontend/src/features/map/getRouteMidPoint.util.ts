import type { LatLng } from "@/features/map/Map.types";

const getRouteMidPoint = (path: LatLng[]): LatLng => {
  const pathLength = path.length;
  if (pathLength === 0) return { lat: 37.5665, lng: 126.978 };

  const middleIdx = Math.floor((pathLength - 1) / 2);
  return path[middleIdx];
};

export default getRouteMidPoint;
