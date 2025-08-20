import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { AddIcon, RemoveIcon } from "@/assets/icons";
import { MAX_ZOOM_LEVEL } from "@/features/map/useZoomLevel";
import usePressDetection from "@/hooks/usePressDetection";
import { useState } from "react";
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

  const [isAddPressing, setIsAddPressing] = useState(false);
  const [isRemovePressing, setIsRemovePressing] = useState(false);

  const addHandlers = usePressDetection({ setIsPressing: setIsAddPressing });
  const removeHandlers = usePressDetection({
    setIsPressing: setIsRemovePressing,
  });
  return (
    <div css={ZoomButtonContainer}>
      <div {...addHandlers} css={ButtonWrapper(isAddPressing)}>
        <AddIcon
          onClick={() => safeSetZoomLevel("add")}
          fill={
            isActiveZoomLevel("min")
              ? color.GrayScale.gray3
              : color.GrayScale.gray5
          }
        />
      </div>
      <div css={LineWrapper} />
      <div {...removeHandlers} css={ButtonWrapper(isRemovePressing)}>
        <RemoveIcon
          onClick={() => safeSetZoomLevel("remove")}
          fill={
            isActiveZoomLevel("max")
              ? color.GrayScale.gray3
              : color.GrayScale.gray5
          }
        />
      </div>
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

const ButtonWrapper = (isPressing: boolean) => css`
  border-radius: 2px;
  background-color: ${isPressing ? color.GrayScale.gray3 : "transparent"};
  ${!isPressing &&
  css`
    &:hover {
      background-color: ${color.GrayScale.gray1};
    }
  `}
`;
