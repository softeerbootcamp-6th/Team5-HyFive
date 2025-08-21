import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { useState, type MouseEvent } from "react";
import PassengerRouteList from "@/features/routePicker/PassengerRouteList";
import RouteButton from "@/features/routePicker/RouteButton";
import type { HighlightType } from "@/features/map/Map.types";
const { color, typography } = theme;

interface RoutePickerProps {
  passengers: Partial<HighlightType>[];
  selectedPassenger: Partial<HighlightType> | null;
  handleHighlight: (id: number) => void;
  handleReset: () => void;
}
const RoutePicker = ({
  passengers,
  selectedPassenger,
  handleHighlight,
  handleReset,
}: RoutePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectPassenger = (id: number) => {
    handleHighlight(id);
    setIsOpen(false);
  };

  const handleResetPassenger = (e: MouseEvent) => {
    e.stopPropagation();
    handleReset();
    setIsOpen(false);
  };

  return (
    <div css={RoutePickerContainer}>
      {isOpen ? (
        <PassengerRouteList
          passengers={passengers}
          onSelect={handleSelectPassenger}
          onClose={() => setIsOpen(false)}
        />
      ) : (
        <RouteButton
          selectedPassenger={selectedPassenger}
          onOpen={() => setIsOpen(true)}
          onReset={handleResetPassenger}
        />
      )}
    </div>
  );
};

export default RoutePicker;

const RoutePickerContainer = css`
  position: absolute;
  bottom: 40px;
  right: 48px;
  z-index: 5;
  font: ${typography.Body.b2_medi};
  color: ${color.GrayScale.gray5};
  cursor: pointer;
`;
