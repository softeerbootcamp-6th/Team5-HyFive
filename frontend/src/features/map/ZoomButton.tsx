import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { AddIcon, RemoveIcon } from "@/assets/icons";
import type { Dispatch, SetStateAction } from "react";
const { color } = theme;

interface ZoomButtonProps {
  setZoomLevel: Dispatch<SetStateAction<number>>;
}
const ZoomButton = ({ setZoomLevel }: ZoomButtonProps) => {
  return (
    <div css={ZoomButtonContainer}>
      <AddIcon
        onClick={() => {
          console.log("hi");
          setZoomLevel((prev) => prev - 1);
        }}
      />
      <div css={LineWrapper} />
      <RemoveIcon onClick={() => setZoomLevel((prev) => prev + 1)} />
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
