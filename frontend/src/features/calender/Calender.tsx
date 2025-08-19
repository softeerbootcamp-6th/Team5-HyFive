import CalenderHeader from "@/features/calender/CalenderHeader";
import CalenderContent from "@/features/calender/CalenderContent";
import { CalenderContainer } from "@/features/calender/Calender.style";

interface CalenderProps {
  highlightType: "day" | "week";
  calendarDate: Date; // 현재 렌더링되는 연도 / 월의 날짜
  selectedDate: Date | null;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onDateClick: (date: Date) => void;
}

const Calender = ({
  highlightType,
  calendarDate,
  selectedDate,
  onPrevMonth,
  onNextMonth,
  onDateClick,
}: CalenderProps) => {
  return (
    <div css={CalenderContainer}>
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
    </div>
  );
};

export default Calender;
