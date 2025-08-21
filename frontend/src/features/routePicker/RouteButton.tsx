import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { CloseIcon, RouteIcon } from "@/assets/icons";
import type { MouseEvent } from "react";
import PassengerRouteItem from "@/features/routePicker/PassengerRouteItem";
import type { HighlightType } from "@/features/map/Map.types";
const { color } = theme;

interface RouteButtonProps {
  selectedPassenger: Partial<HighlightType> | null;
  onOpen: () => void;
  onReset: (e: MouseEvent) => void;
}

const RouteButton = ({
  selectedPassenger,
  onOpen,
  onReset,
}: RouteButtonProps) => {
  return (
    <div
      css={RouteButtonContainer}
      onClick={onOpen}
      data-testid="passenger-btn"
    >
      <div css={TextButtonWrapper}>
        {selectedPassenger ? (
          <>
            <PassengerRouteItem passenger={selectedPassenger} />
            <CloseIcon onClick={onReset} />
          </>
        ) : (
          <>
            <RouteIcon fill={color.GrayScale.gray5} />
            <p>탑승자 경로 보기</p>
          </>
        )}
      </div>
    </div>
  );
};

export default RouteButton;

const RouteButtonContainer = css`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 16px;
  background: ${color.GrayScale.white};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const TextButtonWrapper = css`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
`;
