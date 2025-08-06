import { css } from "@emotion/react";

const MapContent = () => {
  return (
    <div id="map-content" css={MapContentContainer}>
      MapContent
    </div>
  );
};

export default MapContent;

const MapContentContainer = css`
  position: relative;
  height: 100%;
`;
