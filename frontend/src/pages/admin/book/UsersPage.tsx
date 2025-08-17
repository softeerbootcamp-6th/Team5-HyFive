// 타입
import type { DateFilterValue } from "@/features/dateFilter/DateFilter.constants";
import type { UserFilterValue } from "@/features/statusFilter/StatusFilter.constants";

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
import { USER_STATUS_FILTER_OPTIONS } from "@/features/statusFilter/StatusFilter.constants";
import { UsersPageRowsMockData } from "@/mocks/tableMocks";

const { color, typography } = theme;

const DEFAULT_LOCATION = "운정 1구역";
const TEMP_COUNT = 12;
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
            options={USER_STATUS_FILTER_OPTIONS}
            setValue={setSelectedStatusFilter}
          />
          <ToolTip label={TOOLTIP_DATA.label} content={TOOLTIP_DATA.content} />
        </div>
        <SearchInput searchType="user" />
      </section>

      <TableWithIndex rows={UsersPageRowsMockData} />
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    </div>
  );
};

export default UsersPage;

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
