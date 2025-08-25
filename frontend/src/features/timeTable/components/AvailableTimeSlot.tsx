import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

import type { MouseEvent as ReactMouseEvent } from "react";
import type {
  AvailableTimeSlotType,
  TimeTableMode,
} from "@/features/timeTable/TimeTable.type";
import { getTimeSlotGridStyle } from "@/features/timeTable/TimeTable.style";
import { CloseIcon } from "@/assets/icons";
import { useState } from "react";
import { isBeforeToday } from "@/features/calender/Calender.util";

const { color, typography } = theme;

interface AvailableTimeSlotProps {
  slot: AvailableTimeSlotType;
  selectedWeek: Date[];
  variant?: "default" | "preview";
  mode?: TimeTableMode;
  onDelete?: (slot: AvailableTimeSlotType) => void;
  disabled?: boolean;
}

const AvailableTimeSlot = ({
  slot,
  selectedWeek,
  variant = "default",
  mode = "view",
  onDelete,
  disabled = false,
}: AvailableTimeSlotProps) => {
  const [hovered, setHovered] = useState(false);

  const isPastDate = isBeforeToday(slot.rentalDate);

  const canInteract =
    mode === "edit" && variant === "default" && !disabled && !isPastDate;

  const handleDeleteClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.(slot);
  };

  return (
    <div
      onMouseEnter={() => canInteract && setHovered(true)}
      onMouseLeave={() => canInteract && setHovered(false)}
      css={[
        getTimeSlotGridStyle(slot, selectedWeek),
        getSlotContainerStyle(isPastDate, variant, canInteract, hovered),
      ]}
    >
      {variant === "default" && (
        <>
          <header>유휴 시간</header>
          {canInteract && hovered && (
            <button
              type="button"
              onClick={handleDeleteClick}
              css={DeleteButtonStyle(hovered)}
            >
              <CloseIcon fill={color.Maincolor.primary} />
            </button>
          )}
          <time dateTime={`${slot.rentalStartTime}/${slot.rentalEndTime}`}>
            {slot.rentalStartTime} ~ {slot.rentalEndTime}
          </time>
        </>
      )}
    </div>
  );
};

export default AvailableTimeSlot;

// 기본 슬롯 스타일
const BaseSlotStyle = (
  variant: "default" | "preview",
  canInteract: boolean,
  hovered: boolean,
) => css`
  position: relative;
  height: calc(100% - 16px); // 상하 margin 제외
  border-radius: 0 10px 10px 0;
  margin: 8px;
  padding: ${variant === "preview" ? "8px 12px" : "20px"};
  font: ${typography.Label.l4_semi};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: ${canInteract ? "auto" : "none"};

  ${hovered &&
  canInteract &&
  variant === "default" &&
  css`
    transition:
      transform 140ms ease,
      box-shadow 140ms ease,
      filter 140ms ease;
    will-change: transform, box-shadow;
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    filter: brightness(0.98);
  `}
`;

// 현재/미래 날짜 스타일
const ActiveSlotStyle = css`
  background: ${color.SemanticScale.orange[100]};
  border-left: 4px solid ${color.Maincolor.primary};
  color: ${color.Maincolor.primary};
`;

// 과거 날짜 스타일
const PastSlotStyle = css`
  background: ${color.GrayScale.gray2};
  border-left: 4px solid ${color.GrayScale.gray4};
  color: ${color.GrayScale.gray4};
`;

// 스타일 조합 함수
const getSlotContainerStyle = (
  isPastDate: boolean,
  variant: "default" | "preview",
  canInteract: boolean,
  hovered: boolean,
) => {
  const styles = [BaseSlotStyle(variant, canInteract, hovered)];

  if (isPastDate) {
    styles.push(PastSlotStyle);
  } else {
    styles.push(ActiveSlotStyle);
  }
  return styles;
};

const DeleteButtonStyle = (hovered: boolean) => css`
  position: absolute;
  top: 16px;
  right: 20px;
  border: none;
  cursor: pointer;
  color: ${hovered ? color.Maincolor.primary : color.GrayScale.gray4};
`;
