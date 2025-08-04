import { theme } from "@/styles/themes.style";
import type { TableObject } from "@/utils/TableMatcher";
import TableMatcher from "@/utils/TableMatcher";
import { css } from "@emotion/react";
const { color, typography } = theme;

interface TableProps {
  rows: TableObject[];
}

const Table = ({ rows }: TableProps) => {
  const { keys, labels } = TableMatcher.matchTableHeader(rows);
  return (
    <table css={TableContainer}>
      <thead css={TableHeader}>
        <tr>
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
            {keys.map((key) => (
              <td key={key} css={TableContentElement}>
                {row[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

const TableContainer = css`
  width: 100%;
  font: ${typography.Body.b4_medi};
`;

const TableHeader = css`
  color: ${theme.color.GrayScale.gray5};
  background-color: ${color.GrayScale.gray1};
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
  border-bottom: 1px solid ${color.GrayScale.gray3};

  &:last-child {
    border-right: none;
  }
`;
