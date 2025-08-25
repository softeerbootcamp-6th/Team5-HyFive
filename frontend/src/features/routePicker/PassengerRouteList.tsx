import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { CloseIcon } from "@/assets/icons";
import PassengerRouteItem from "@/features/routePicker/PassengerRouteItem";
import type { HighlightType } from "@/features/map/Map.types";

const { color } = theme;

interface PassengerListProps {
  passengers: Partial<HighlightType>[];
  onSelect: (id: number) => void;
  onClose: () => void;
}

const PassengerRouteList = ({
  passengers,
  onSelect,
  onClose,
}: PassengerListProps) => {
  return (
    <div css={RouteDetailContainer}>
      <ul css={PassengerWrapper}>
        {passengers.map((passenger, idx) => (
          <li
            data-testid="passenger-highlight-btn"
            key={passenger.bookId}
            css={PartPassengerWrapper}
            onClick={() => passenger.bookId && onSelect(passenger.bookId)}
          >
            <PassengerRouteItem idx={idx + 1} passenger={passenger} />
          </li>
        ))}
      </ul>
      <div css={RouteButtonContainer} onClick={onClose}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default PassengerRouteList;

const RouteDetailContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
`;

const PassengerWrapper = css`
  display: flex;
  padding: 12px;
  flex-direction: column;
  gap: 6px;
  border-radius: 16px;
  background: ${color.GrayScale.white};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const PartPassengerWrapper = css`
  display: flex;
  padding: 6px 10px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 8px;
`;

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
