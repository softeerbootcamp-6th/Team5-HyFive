import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/icons";
import { getYearMonth } from "@/features/calander/Calander.util";
const { color, typography } = theme;

interface CalanderHeaderProps {
  date: Date;
}

const CalanderHeader = ({ date }: CalanderHeaderProps) => {
  const formattedYearMonth = getYearMonth(date);

  return (
    <div css={HeaderContainer}>
      <button css={StyledButton}>
        <ChevronLeftIcon className="chevron-icon" />
      </button>
      <p css={HeaderTitle}>{formattedYearMonth}</p>
      <button css={StyledButton}>
        <ChevronRightIcon className="chevron-icon" />
      </button>
    </div>
  );
};

export default CalanderHeader;

const HeaderContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = css`
  font: ${typography.Body.b2_semi};
  color: ${color.GrayScale.black};
`;

const StyledButton = css`
  cursor: pointer;
  .chevron-icon {
    stroke: ${color.GrayScale.gray3};
    transition: stroke 0.2s ease;
  }

  &:hover .chevron-icon {
    stroke: ${color.GrayScale.gray5};
  }
`;
