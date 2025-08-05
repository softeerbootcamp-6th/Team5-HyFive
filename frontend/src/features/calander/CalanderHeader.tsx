import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/icons";
import { getYearMonth } from "@/features/calander/Calander.util";
import {
  HeaderContainer,
  StyledButton,
  HeaderTitle,
} from "@/features/calander/Calander.style";

interface CalanderHeaderProps {
  date: Date;
  onClickPrev: () => void;
  onClickNext: () => void;
}

const CalanderHeader = ({
  date,
  onClickPrev,
  onClickNext,
}: CalanderHeaderProps) => {
  const formattedYearMonth = getYearMonth(date);

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

export default CalanderHeader;
