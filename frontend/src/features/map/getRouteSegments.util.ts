import type { LatLng } from "@/features/map/Map.types";

interface GetRouteSegmentProps {
  path: LatLng[];
  size: number;
}
const getRouteSegments = ({ path, size }: GetRouteSegmentProps): LatLng[][] => {
  if (!Array.isArray(path) || path.length <= 1 || size <= 0) return [];

  const segments: LatLng[][] = [];
  for (let i = 0; i < path.length; i += size) {
    segments.push(path.slice(i, i + size));
  }
  return segments;
};

export default getRouteSegments;
