import { css } from "@emotion/react";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const MapContent = () => {
  const mapRef = useRef(null);
  useEffect(() => {
    const container = mapRef.current;
    if (!container) {
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const initializedMap = new window.kakao.maps.Map(container, options);
  }, []);
  return <div id="map" ref={mapRef} css={MapContentContainer} />;
};

export default MapContent;

const MapContentContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
`;
