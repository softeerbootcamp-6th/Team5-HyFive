import { useState } from "react";

// 타입
import type { DateFilterValue } from "@/features/dateFilter/DateFilter.constants";
import type { RouteFilterValue } from "@/features/statusFilter/StatusFilter.constants";

// 스타일
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

// 컴포넌트
import DateFilter from "@/features/dateFilter/DateFilter";
import SearchInput from "@/components/SearchInput";
import ToolTip from "@/components/ToolTip";
import TableWithIndex from "@/components/table/TableWithIndex";
import StatusFilter from "@/features/statusFilter/StatusFilter";
import Pagination from "@/components/Pagination";

// 상수
import { DATE_FILTER_OPTIONS } from "@/features/dateFilter/DateFilter.constants";
import { ROUTE_STATUS_FILTER_OPTIONS } from "@/features/statusFilter/StatusFilter.constants";
import { RoutePageRowsMockData } from "@/mocks/tableMocks";

const { color, typography } = theme;

const DEFAULT_LOCATION = "운정 1구역";
const TEMP_COUNT = 12;
const TOOLTIP_DATA = {
  label: "운행 상태 기준",
  content:
    "운행 대기: 아직 운행하지 않은 스케줄의 경로\n예운행 중: 운행 중인 스케줄의 경로\n운행 완료: 운행이 완료된 스케줄의 경로",
};

const PathsPage = () => {
  const [selectedDateFilter, setSelectedDateFilter] =
    useState<DateFilterValue>("TODAY");
  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState<RouteFilterValue>("ALL");

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
          <h3 css={CountStyle}>총 {TEMP_COUNT}명</h3>
          <StatusFilter
            value={selectedStatusFilter}
            options={ROUTE_STATUS_FILTER_OPTIONS}
            setValue={setSelectedStatusFilter}
          />
          <ToolTip label={TOOLTIP_DATA.label} content={TOOLTIP_DATA.content} />
        </div>
        <SearchInput searchType="route" />
      </section>

      <TableWithIndex rows={RoutePageRowsMockData} />
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    </div>
  );
};

export default PathsPage;

const PageContainerStyle = css`
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  > *:not(:last-child) {
    margin-bottom: 20px; /* 기본 간격 */
  }
  > *:nth-child(1) {
    margin-bottom: 76px; /* 첫 번째 → 두 번째 */
  }
  > *:nth-child(2) {
    margin-bottom: 20px; /* 두 번째 → 세 번째 */
  }
  > *:nth-child(3) {
    margin-bottom: 52px; /* 세 번째 → 네 번째 */
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
  gap: 24px;
  align-items: center;
  justify-content: center;
`;

const CountStyle = css`
  font: ${typography.Heading.h4_semi};
  color: ${color.GrayScale.black};
`;
