import type { LatLng } from "@/features/map/Map.types";

const getRouteMidPoint = (path: LatLng[]): LatLng | {} => {
  const pathLength = path.length;
  if (pathLength === 0) return { lat: undefined, lng: undefined };

  const middleIdx = Math.floor((pathLength - 1) / 2);
  return path[middleIdx];
};

export default getRouteMidPoint;
