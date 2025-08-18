import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

const { color, typography } = theme;

import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// 기능X, UI만 구현된 상태
// TODO 재민 - 페이지네이션 기능 구현
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const tmpRange = [1, 2, 3, 4, 5];

  return (
    <div css={PaginationContainer}>
      <button
        css={PageButtonStyle}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="chevron-icon" />
      </button>
      {tmpRange.map((page) => (
        <p key={page} css={PageNumberStyle(currentPage === page)}>
          {page}
        </p>
      ))}
      <button
        css={PageButtonStyle}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon className="chevron-icon" />
      </button>
    </div>
  );
};

export default Pagination;

const PaginationContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const PageButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .chevron-icon {
    stroke: ${color.GrayScale.gray4};
    transition: stroke 0.2s ease;
  }
  &:hover .chevron-icon {
    stroke: ${color.GrayScale.gray5};
  }
`;

const PageNumberStyle = (isCurrentPage: boolean) => css`
  display: flex;
  width: 34px;
  height: 34px;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  font: ${typography.Body.b4_medi};
  color: ${isCurrentPage ? color.GrayScale.white : color.GrayScale.gray4};
  background-color: ${isCurrentPage ? color.GrayScale.black : "transparent"};
  border-radius: 999px;
  cursor: pointer;
  &:hover {
    background-color: ${color.GrayScale.gray2};
    color: ${color.GrayScale.gray4};
  }
`;
