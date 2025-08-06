import { css } from "@emotion/react";
import { useEffect, useRef } from "react";

const MapContent = () => {
  const mapRef = useRef(null);
  useEffect(() => {}, []);
  return <div id="map" ref={mapRef} css={MapContentContainer} />;
};

export default MapContent;

const MapContentContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
`;
