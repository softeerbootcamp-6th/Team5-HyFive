import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

const { color, typography } = theme;

import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/icons";
import { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  windowSize?: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  windowSize = 5,
}: PaginationProps) => {
  const safeTotal = Math.max(0, totalPages);
  const safeCurrent = Math.min(
    Math.max(1, currentPage),
    Math.max(1, safeTotal),
  );

  // 현재 속한 페이지 범위 계산
  const ranges = useMemo(() => {
    if (safeTotal === 0) return [];
    const start = Math.floor((safeCurrent - 1) / windowSize) * windowSize + 1;
    const end = Math.min(start + windowSize - 1, safeTotal);
    const tmpRanges = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i,
    );
    return tmpRanges;
  }, [safeTotal, safeCurrent, windowSize]);

  const handlePageChange = (clickedPage: number) => {
    if (
      clickedPage < 1 ||
      clickedPage > safeTotal ||
      clickedPage === safeCurrent
    )
      return;
    onPageChange(clickedPage);
  };

  return (
    <div css={PaginationContainer}>
      <button
        css={PageButtonStyle}
        onClick={() => handlePageChange(safeCurrent - 1)}
        disabled={safeCurrent === 1}
      >
        <ChevronLeftIcon className="chevron-icon" />
      </button>
      {ranges.map((page) => (
        <button
          key={page}
          css={PageNumberStyle(safeCurrent === page)}
          onClick={() => handlePageChange(page)}
          disabled={safeCurrent === page}
        >
          {page}
        </button>
      ))}
      <button
        css={PageButtonStyle}
        onClick={() => handlePageChange(safeCurrent + 1)}
        disabled={safeCurrent === safeTotal}
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

  /* disabled는 맨 마지막에 둬서 hover를 무력화 */
  &:disabled {
    cursor: not-allowed;
  }
  &:disabled .chevron-icon {
    stroke: ${color.GrayScale.gray3};
    transition: none;
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
    ${!isCurrentPage &&
    `
      background-color: ${color.GrayScale.gray2};
      color: ${color.GrayScale.gray4};
    `}
  }
`;
