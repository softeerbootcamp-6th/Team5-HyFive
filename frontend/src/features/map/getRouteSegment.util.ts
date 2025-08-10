import type { LatLng } from "@/features/map/Map.types";

interface GetRouteSegmentProps {
  path: LatLng[];
  start: number;
  end: number;
}
const getRouteSegment = ({ path, start, end }: GetRouteSegmentProps) => {
  if (!Array.isArray(path)) return [];

  const startValue = Math.max(0, start);
  const endValue = Math.min(end + 1, path.length);
  return path.slice(startValue, endValue);
};

export default getRouteSegment;
