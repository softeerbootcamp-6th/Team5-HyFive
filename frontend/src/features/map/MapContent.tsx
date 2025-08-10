import useInitializeMap from "@/features/map/useInitializeMap";
import useVisualizeMarker from "@/features/map/useVisualizeMarker";
import useVisualizeRoute from "@/features/map/useVisualizeRoute";
import useZoomLevel from "@/features/map/useZoomLevel";
import ZoomButton from "@/features/map/ZoomButton";
import { path } from "@/mocks/pathMocks";
import { css } from "@emotion/react";
import { useRef } from "react";

const MapContent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { map } = useInitializeMap({
    mapRef,
    centerLat: path[(path.length - 1) / 2].lng,
    centerLng: path[(path.length - 1) / 2].lat,
  });
  useVisualizeMarker({ map, path });
  useVisualizeRoute({ map, path });
  const { setZoomLevel } = useZoomLevel({ map });

  return (
    <div css={MapContentContainer}>
      <div id="map" ref={mapRef} css={MapWrapper} />
      <ZoomButton setZoomLevel={setZoomLevel} />
    </div>
  );
};

export default MapContent;

const MapContentContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MapWrapper = css`
  width: 100%;
  height: 100%;
`;
