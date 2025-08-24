import Tag from "@/components/Tag";
import {
  ROUTE_STATUS_META,
  USER_STATUS_META,
  type RouteFilterValue,
  type UserFilterValue,
} from "@/features/statusFilter/StatusFilter.constants";
import type { DateFilterValue } from "@/features/dateFilter/DateFilter.constants";
import { theme } from "@/styles/themes.style";
import type { TableObject } from "@/utils/TableMatcher";
import TableMatcher from "@/utils/TableMatcher";
import { css } from "@emotion/react";
import { useNavigate } from "react-router";
const { color } = theme;

interface TableProps {
  rows: TableObject[];
  selectedDateFilter?: DateFilterValue;
}

const isUserFilterValue = (
  value: string,
): value is Exclude<UserFilterValue, "ALL"> => {
  return value in USER_STATUS_META;
};

const isRouteFilterValue = (
  value: string,
): value is Exclude<RouteFilterValue, "ALL"> => {
  return value in ROUTE_STATUS_META;
};

const TableWithIndex = ({ rows, selectedDateFilter }: TableProps) => {
  const navigate = useNavigate();
  const { keys, labels } = TableMatcher.matchTableHeader(rows);

  const handleRouteIdClick = (routeId: string | number) => {
    const searchParams = new URLSearchParams();
    searchParams.append("routeId", String(routeId));

    // 선택된 날짜 필터가 있으면 URL 파라미터에 추가
    if (selectedDateFilter) {
      searchParams.append("period", selectedDateFilter);
    }

    void navigate(`/admin/book/paths?${searchParams.toString()}`);
  };

  const formatElement = ({
    key,
    value,
  }: {
    key: string;
    value: string | number | boolean | undefined;
  }) => {
    switch (key) {
      case "isExistWalkingDevice":
        return value === true ? "o" : "-";
      case "routeId":
        return value && typeof value !== "boolean" ? (
          <p css={RouteIDStyle} onClick={() => handleRouteIdClick(value)}>
            #{value}
          </p>
        ) : (
          "-"
        );
      case "totalUserCount":
        return value + "명";
      case "status": {
        if (!value) return " ";
        const stringValue = String(value);

        if (isUserFilterValue(stringValue)) {
          const dataForTag = USER_STATUS_META[stringValue];
          return <Tag type={dataForTag.tagType} label={dataForTag.label} />;
        }

        if (isRouteFilterValue(stringValue)) {
          const dataForTag = ROUTE_STATUS_META[stringValue];
          return <Tag type={dataForTag.tagType} label={dataForTag.label} />;
        }

        return String(value);
      }
      default:
        return value;
    }
  };
  return (
    <table css={TableContainer}>
      <thead css={TableHeader}>
        <tr>
          <th css={TableHeaderElement}> </th>
          {labels.map((label) => (
            <th key={label} css={TableHeaderElement}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} css={TableContentRow}>
            <td css={TableContentElement}>{idx + 1}</td>
            {keys.map((key) => (
              <td key={key} css={TableContentElement}>
                {formatElement({ key, value: row[key] })}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableWithIndex;

const TableContainer = css`
  width: 100%;
  font: ${theme.typography.Body.b4_medi};
`;

const TableHeader = css`
  color: ${theme.color.GrayScale.gray5};
  background-color: ${theme.color.GrayScale.gray1};
`;

const TableContentRow = css`
  &:hover {
    background-color: ${color.GrayScale.gray1};
  }
`;

const TableHeaderElement = css`
  padding: 16px 40px;
`;

const TableContentElement = css`
  text-align: center;
  padding: 16px 12px;
  border-bottom: 1px solid ${theme.color.GrayScale.gray3};

  &:last-child {
    border-right: none;
  }
`;

const RouteIDStyle = css`
  font: ${theme.typography.Body.b4_medi};
  color: ${theme.color.GrayScale.gray4};
  cursor: pointer;
  text-decoration-line: underline;
`;
