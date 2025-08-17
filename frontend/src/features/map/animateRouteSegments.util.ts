import type { LatLng, PolylinePath } from "@/features/map/Map.types";

interface AnimateRouteSegmentsProps {
  polylinePath: PolylinePath[];
  renderSegment: (segment: LatLng[]) => void;
}
const animateRouteSegments = ({
  polylinePath,
  renderSegment,
}: AnimateRouteSegmentsProps) => {
  if (polylinePath.length === 0) return;

  let stepIdx = 0;
  const step = () => {
    if (stepIdx >= polylinePath.length) return;
    renderSegment(polylinePath[stepIdx++].pointList);
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
export default animateRouteSegments;
