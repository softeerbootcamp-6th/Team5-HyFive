import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/icons";
import { getYearMonth } from "@/features/calender/Calender.util";
import {
  HeaderContainer,
  StyledButton,
  HeaderTitle,
} from "@/features/calender/Calender.style";

interface CalenderHeaderProps {
  calendarDate: Date;
  onClickPrev: () => void;
  onClickNext: () => void;
}

const CalenderHeader = ({
  calendarDate,
  onClickPrev,
  onClickNext,
}: CalenderHeaderProps) => {
  const formattedYearMonth = getYearMonth(calendarDate);

  return (
    <div css={HeaderContainer}>
      <button css={StyledButton} aria-label="이전 달" onClick={onClickPrev}>
        <ChevronLeftIcon className="chevron-icon" />
      </button>
      <p css={HeaderTitle}>{formattedYearMonth}</p>
      <button css={StyledButton} aria-label="다음 달" onClick={onClickNext}>
        <ChevronRightIcon className="chevron-icon" />
      </button>
    </div>
  );
};

export default CalenderHeader;
