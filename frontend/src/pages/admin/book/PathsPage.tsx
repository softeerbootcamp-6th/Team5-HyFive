import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";

// 타입
import type { DateFilterValue } from "@/features/dateFilter/DateFilter.constants";
import type { RouteFilterValue } from "@/features/statusFilter/StatusFilter.constants";

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
import { ROUTE_STATUS_FILTER_OPTIONS } from "@/features/statusFilter/StatusFilter.constants";
import { useGetRouteList } from "@/apis/RouteListAPI";
import EmptyUI from "@/components/EmptyUI";
import LoadingSpinner from "@/components/LoadingSpinner";
import RefetchButton from "@/components/RefetchButton";

const { color, typography } = theme;

const DEFAULT_LOCATION = "운정 1구역";
const TOOLTIP_DATA = {
  label: "운행 상태 기준",
  content:
    "운행 대기: 아직 운행하지 않은 스케줄의 경로\n예운행 중: 운행 중인 스케줄의 경로\n운행 완료: 운행이 완료된 스케줄의 경로",
};

const PathsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedDateFilter, setSelectedDateFilter] =
    useState<DateFilterValue>("TODAY");
  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState<RouteFilterValue>("ALL");
  const [selectedPage, setSelectedPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const routeId = searchParams.get("routeId");
  const pathId = routeId ? Number(routeId) : null;

  const { items, pageInfo, isFetching } = useGetRouteList(
    selectedDateFilter,
    selectedStatusFilter,
    selectedPage,
    ITEMS_PER_PAGE,
    pathId,
  );

  const handleRefetch = () => {
    void navigate("/admin/book/paths", { replace: true });

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
            <h3 css={CountStyle}>총 {items.length}명</h3>
            <StatusFilter
              value={selectedStatusFilter}
              options={ROUTE_STATUS_FILTER_OPTIONS}
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
          <TableWithIndex rows={items} />
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

export default PathsPage;

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
