import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { AddIcon, RemoveIcon } from "@/assets/icons";
import { MAX_ZOOM_LEVEL } from "@/features/map/useZoomLevel";
const { color } = theme;

interface ZoomButtonProps {
  zoomLevel: number;
  safeSetZoomLevel: (mode: "add" | "remove") => void;
}
const ZoomButton = ({ zoomLevel, safeSetZoomLevel }: ZoomButtonProps) => {
  const isActiveZoomLevel = (type: "min" | "max") => {
    const activeZoomLevel = type === "min" ? 1 : MAX_ZOOM_LEVEL;
    return zoomLevel === activeZoomLevel ? true : false;
  };

  return (
    <div css={ZoomButtonContainer}>
      <AddIcon
        onClick={() => safeSetZoomLevel("add")}
        fill={
          isActiveZoomLevel("max")
            ? color.GrayScale.gray3
            : color.GrayScale.gray5
        }
      />
      <div css={LineWrapper} />
      <RemoveIcon
        onClick={() => safeSetZoomLevel("remove")}
        fill={
          isActiveZoomLevel("min")
            ? color.GrayScale.gray3
            : color.GrayScale.gray5
        }
      />
    </div>
  );
};

export default ZoomButton;

const ZoomButtonContainer = css`
  position: absolute;
  top: 24px;
  right: 48px;
  width: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
  background: ${color.GrayScale.white};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  z-index: 5;
  cursor: pointer;
`;

const LineWrapper = css`
  width: 100%;
  border-bottom: 1px solid ${color.GrayScale.gray3};
`;
