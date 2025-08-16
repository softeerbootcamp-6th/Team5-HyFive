import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { useState, type MouseEvent } from "react";
import type { PassengerRoute } from "@/types/routeType.types";
import PassengerRouteList from "@/features/routePicker/PassengerRouteList";
import RouteButton from "@/features/routePicker/RouteButton";

const { color, typography } = theme;

const RoutePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPassenger, setSelectedPassenger] =
    useState<PassengerRoute | null>(null);

  const mockPassengers: PassengerRoute[] = [
    { id: 1, name: "홍길동", status: "하차" },
    { id: 2, name: "홍길동", status: "탑승" },
    { id: 3, name: "홍길동", status: "탑승" },
    { id: 4, name: "홍길동", status: "대기" },
    { id: 5, name: "홍길동", status: "대기" },
  ];

  const handleSelectPassenger = (passenger: PassengerRoute) => {
    setSelectedPassenger(passenger);
    setIsOpen(false);
  };

  const handleResetPassenger = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setSelectedPassenger(null);
  };

  return (
    <div css={RoutePickerContainer}>
      {isOpen ? (
        <PassengerRouteList
          passengers={mockPassengers}
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
