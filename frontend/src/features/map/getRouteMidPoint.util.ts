import type { LatLng, MarkerPath } from "@/features/map/Map.types";

const getRouteMidPoint = (
  path: MarkerPath[],
): LatLng | { lat: null; lng: null } => {
  const pathLength = path.length;
  if (pathLength === 0) return { lat: null, lng: null };

  const middleIdx = Math.floor((pathLength - 1) / 2);
  return path[middleIdx].point;
};

export default getRouteMidPoint;
