import CalenderHeader from "@/features/calender/CalenderHeader";
import CalenderContent from "@/features/calender/CalenderContent";
import {
  CalenderContainer,
  ButtonSection,
  ButtonStyle,
} from "@/features/calender/Calender.style";

interface CalenderProps {
  highlightType: "day" | "week";
  calendarDate: Date; // 현재 렌더링되는 연도 / 월의 날짜
  selectedDate: Date | null;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onDateClick: (date: Date) => void;
  // popup 모드를 위한 선택적 props
  isPopup?: boolean;
  onCancel?: () => void;
  onConfirm?: (date: Date | null) => void;
}

const Calender = ({
  highlightType,
  calendarDate,
  selectedDate,
  onPrevMonth,
  onNextMonth,
  onDateClick,
  isPopup = false,
  onCancel,
  onConfirm,
}: CalenderProps) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(selectedDate);
    }
  };

  return (
    <div css={CalenderContainer(isPopup)}>
      <CalenderHeader
        calendarDate={calendarDate}
        onClickPrev={onPrevMonth}
        onClickNext={onNextMonth}
      />
      <CalenderContent
        calendarDate={calendarDate}
        highlightType={highlightType}
        selectedDate={selectedDate}
        handleClickDate={onDateClick}
      />
      {isPopup && (
        <div css={ButtonSection}>
          <button css={ButtonStyle("cancel")} onClick={onCancel}>
            취소
          </button>
          <button css={ButtonStyle("confirm")} onClick={handleConfirm}>
            확인
          </button>
        </div>
      )}
    </div>
  );
};

export default Calender;
