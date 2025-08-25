import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import Calender from "@/features/calender/Calender";
import TimePicker from "@/features/timePicker/TimePicker";
import type { CalenderState } from "@/features/calender/CalenderReducer";

const { color } = theme;

export type PopupType = "calendar" | "timePicker" | null;

interface UsePopupManagerProps {
  onCalendarConfirm: (date: Date | null) => void;
  onTimeConfirm: (time: string) => void;
  state: CalenderState;
  handleMonthChange: (direction: "next" | "prev") => void;
  handleDateClick: (date: Date) => void;
}

export const usePopupManager = ({
  onCalendarConfirm,
  onTimeConfirm,
  state,
  handleMonthChange,
  handleDateClick,
}: UsePopupManagerProps) => {
  const [activePopup, setActivePopup] = useState<PopupType>(null);

  const dateInputRef = useRef<HTMLDivElement>(null);
  const timeInputRef = useRef<HTMLDivElement>(null);

  const openPopup = (type: PopupType) => setActivePopup(type);
  const closePopup = () => setActivePopup(null);

  const portalTarget = document.getElementById("admin-portal");

  const handleCalendarConfirm = (date: Date | null) => {
    onCalendarConfirm(date);
    closePopup();
  };

  const handleTimeConfirm = (time: string) => {
    onTimeConfirm(time);
    closePopup();
  };

  const renderPopupPortal = () => {
    if (!activePopup || !portalTarget) return null;

    const inputRef = activePopup === "calendar" ? dateInputRef : timeInputRef;
    const inputElement = inputRef.current;

    if (!inputElement) return null;

    const rect = inputElement.getBoundingClientRect();

    const popupLeft = rect.left / 0.8;
    const popupTop = rect.top / 0.8 + rect.height + 25;

    const popupContent =
      activePopup === "calendar" ? (
        <Calender
          highlightType="day"
          calendarDate={state.calendarDate}
          selectedDate={state.selectedDate}
          onPrevMonth={() => handleMonthChange("prev")}
          onNextMonth={() => handleMonthChange("next")}
          onDateClick={handleDateClick}
          isPopup={true}
          onCancel={closePopup}
          onConfirm={handleCalendarConfirm}
        />
      ) : (
        <TimePicker onCancel={closePopup} onConfirm={handleTimeConfirm} />
      );

    return createPortal(
      <div css={PortalOverlay} onClick={closePopup}>
        <div
          css={PortalContent}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            top: popupTop,
            left: popupLeft,
          }}
        >
          {popupContent}
        </div>
      </div>,
      portalTarget,
    );
  };

  return {
    activePopup,
    dateInputRef,
    timeInputRef,
    openPopup,
    closePopup,
    renderPopupPortal,
  };
};

const PortalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 1000;
`;

const PortalContent = css`
  background-color: ${color.GrayScale.white};
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;

  animation: contentSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes contentSlideIn {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;
