import Tag from "@/components/Tag";
import {
  USER_STATUS_META,
  type UserFilterValue,
} from "@/features/statusFilter/StatusFilter.constants";
import { theme } from "@/styles/themes.style";
import type { TableObject } from "@/utils/TableMatcher";
import TableMatcher from "@/utils/TableMatcher";
import { css } from "@emotion/react";
const { color } = theme;

interface TableProps {
  rows: TableObject[];
}

const TableWithIndex = ({ rows }: TableProps) => {
  const { keys, labels } = TableMatcher.matchTableHeader(rows);
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
        return value ? <p css={RouteIDStyle}>#{value}</p> : "-";
      case "totalUserCount":
        return value + "명";
      case "status": {
        if (!value) return " ";
        const valueForTagType = String(value) as Exclude<
          UserFilterValue,
          "ALL"
        >;
        const dataForTag = USER_STATUS_META[valueForTagType];
        if (!dataForTag) return String(value);
        return <Tag type={dataForTag.tagType} label={dataForTag.label} />;
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
