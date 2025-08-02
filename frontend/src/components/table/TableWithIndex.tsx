import type { BookType } from "@/components/statusCard/BookCard";
import type { DrivingType } from "@/components/statusCard/DrivingCard";
import { theme } from "@/styles/themes.style";
import type { TableObject } from "@/utils/TableMatcher";
import TableMatcher from "@/utils/TableMatcher";
import { css } from "@emotion/react";
const { color } = theme;

interface TableProps {
  rows: TableObject[];
}
type StatusType = BookType | DrivingType;

const TableWithIndex = ({ rows }: TableProps) => {
  const { keys, labels } = TableMatcher.matchTableHeader(rows);
  return (
    <table css={TableContainer}>
      <thead css={TableHeader}>
        <tr>
          <th css={TableHeaderElement}> </th>
          {labels.map((label) => (
            <th css={TableHeaderElement}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr css={TableContentRow}>
            <td css={TableContentElement}>{idx + 1}</td>
            {keys.map((key) => {
              switch (key) {
                case "isExistWalkingDevice":
                  return (
                    <td css={TableContentElement}>
                      {row[key] === true ? "o" : "-"}
                    </td>
                  );
                case "routeId":
                  return (
                    <td css={TableContentElement}>
                      {row[key] ? "#" + row[key] : "-"}
                    </td>
                  );
                case "totalUserCount":
                  return <td css={TableContentElement}>{row[key]}명</td>;
                case "status":
                  return <td css={TableContentElement}>{row[key]}</td>;
                default:
                  return <td css={TableContentElement}>{row[key]}</td>;
              }
            })}
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

const backgroundColorMap: Record<StatusType, string> = {
  waiting: color.GrayScale.gray2,
  progress: color.SemanticScale.blue[50],
  end: color.SemanticScale.green[50],
  pending: color.SemanticScale.orange[50],
  success: color.SemanticScale.blue[50],
  fail: color.SemanticScale.red[50],
};

const textColorMap: Record<StatusType, string> = {
  waiting: color.GrayScale.gray5,
  progress: color.Semantic.success,
  end: color.Semantic.information,
  pending: color.Maincolor.primary,
  success: color.Semantic.success,
  fail: color.Semantic.error,
};

const StatusWrapper = (value: StatusType) => css`
  background-color: ${backgroundColorMap[value]};
  color: ${textColorMap[value]};
`;
