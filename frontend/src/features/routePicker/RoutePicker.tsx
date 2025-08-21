import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { useEffect, useState, type MouseEvent } from "react";
import type { PassengerRoute } from "@/types/routeType.types";
import PassengerRouteList from "@/features/routePicker/PassengerRouteList";
import RouteButton from "@/features/routePicker/RouteButton";
import type { HighlightType } from "@/features/map/Map.types";

const { color, typography } = theme;

interface RoutePickerProps {
  passengers: Partial<HighlightType>[];
  handleHighlight: (id: number) => void;
  handleReset: () => void;
}
const RoutePicker = ({
  passengers,
  handleHighlight,
  handleReset,
}: RoutePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPassenger, setSelectedPassenger] =
    useState<Partial<HighlightType> | null>(null);

  const handleSelectPassenger = (passenger: Partial<HighlightType>) => {
    if (!passenger.bookId) return;
    handleHighlight(passenger.bookId);
    setSelectedPassenger(passenger);
    setIsOpen(false);
  };

  const handleResetPassenger = (e: MouseEvent) => {
    e.stopPropagation();
    handleReset();
    setIsOpen(false);
    setSelectedPassenger(null);
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
