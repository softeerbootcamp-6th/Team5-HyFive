import { useEffect, useState } from "react";

// 타입
import type { DateFilterValue } from "@/features/dateFilter/DateFilter.constants";
import type { UserFilterValue } from "@/features/statusFilter/StatusFilter.constants";

// 스타일
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

// 컴포넌트
import DateFilter from "@/features/dateFilter/DateFilter";
import ToolTip from "@/components/ToolTip";
import TableWithIndex from "@/components/table/TableWithIndex";
import StatusFilter from "@/features/statusFilter/StatusFilter";
import Pagination from "@/components/Pagination";

// 상수
import { DATE_FILTER_OPTIONS } from "@/features/dateFilter/DateFilter.constants";
import { USER_STATUS_FILTER_OPTIONS } from "@/features/statusFilter/StatusFilter.constants";
import { useGetBookList } from "@/apis/BookAPI";
import EmptyUI from "@/components/EmptyUI";
import LoadingSpinner from "@/components/LoadingSpinner";
import RefetchButton from "@/components/RefetchButton";

const { color, typography } = theme;

const DEFAULT_LOCATION = "운정 1구역";
const TOOLTIP_DATA = {
  label: "예약 상태 기준",
  content:
    "신규 예약: 예약 접수 후 이용 가능 여부가 정해지지 않은 상태\n예약 성공: 예약 접수 후 이용 가능한 경로가 확보된 상태\n예약 실패: 예약 접수 후 이용 가능한 경로 확보에 실패한 상태\n경로 확정: 예약 성공 후 승차 시간이 전달된 상태",
};

const UsersPage = () => {
  const [selectedDateFilter, setSelectedDateFilter] =
    useState<DateFilterValue>("TODAY");
  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState<UserFilterValue>("ALL");
  const [selectedPage, setSelectedPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const { items, pageInfo, isFetching } = useGetBookList(
    selectedDateFilter,
    selectedStatusFilter,
    selectedPage,
    ITEMS_PER_PAGE,
  );

  const handleRefetch = () => {
    setSelectedDateFilter("TODAY");
    setSelectedStatusFilter("ALL");
    setSelectedPage(1);
  };

  useEffect(() => {
    setSelectedPage(1);
  }, [selectedDateFilter, selectedStatusFilter]);

  return (
    <div css={PageContainerStyle}>
      <header css={HeaderStyle}>
        <h1 css={TitleStyle}>{DEFAULT_LOCATION}</h1>
        <DateFilter
          value={selectedDateFilter}
          options={DATE_FILTER_OPTIONS}
          setValue={setSelectedDateFilter}
        />
      </header>

      <section css={ToolbarStyle}>
        <div css={StatusSectionStyle}>
          <div css={leftSectionStyle}>
            <h3 css={CountStyle}>총 {pageInfo.totalItems}명</h3>
            <StatusFilter
              value={selectedStatusFilter}
              options={USER_STATUS_FILTER_OPTIONS}
              setValue={setSelectedStatusFilter}
            />
            <ToolTip
              label={TOOLTIP_DATA.label}
              content={TOOLTIP_DATA.content}
            />
          </div>
          <div css={rightSectionStyle}>
            <RefetchButton handleClick={handleRefetch} />
          </div>
        </div>
      </section>
      <div css={TableSectionStyle}>
        {isFetching ? (
          <div css={LoadingSpinnerStyle}>
            <LoadingSpinner size="large" />
          </div>
        ) : items.length > 0 ? (
          <TableWithIndex
            rows={items}
            selectedDateFilter={selectedDateFilter}
          />
        ) : (
          <EmptyUI />
        )}
      </div>

      <Pagination
        currentPage={pageInfo.current}
        totalPages={pageInfo.totalPages}
        onPageChange={setSelectedPage}
      />
    </div>
  );
};

export default UsersPage;

const PageContainerStyle = css`
  width: 100%;
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  > *:not(:last-child) {
    margin-bottom: 20px; /* 기본 간격 */
  }
  > *:nth-child(1) {
    margin-bottom: 66px; /* 첫 번째 → 두 번째 */
  }
  > *:nth-child(2) {
    margin-bottom: 20px; /* 두 번째 → 세 번째 */
  }
  > *:nth-child(3) {
    margin-bottom: 30px; /* 세 번째 → 네 번째 */
  }
`;

const HeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleStyle = css`
  font: ${typography.Label.l1_semi};
  color: ${color.GrayScale.black};
`;

const ToolbarStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusSectionStyle = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const CountStyle = css`
  font: ${typography.Heading.h4_semi};
  color: ${color.GrayScale.black};
`;

const TableSectionStyle = css`
  width: 100%;
  min-height: 810px;
`;

const LoadingSpinnerStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const leftSectionStyle = css`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
`;

const rightSectionStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
