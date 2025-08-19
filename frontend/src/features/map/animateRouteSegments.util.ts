import type { LatLng } from "@/features/map/Map.types";

interface AnimateRouteSegmentsProps {
  segments: LatLng[][];
  renderSegment: (segment: LatLng[]) => void;
}
const animateRouteSegments = ({
  segments,
  renderSegment,
}: AnimateRouteSegmentsProps) => {
  if (segments.length === 0) return;

  let stepIdx = 0;
  const step = () => {
    if (stepIdx >= segments.length) return;
    renderSegment(segments[stepIdx++]);
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
export default animateRouteSegments;
