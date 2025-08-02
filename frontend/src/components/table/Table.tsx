import { theme } from "@/styles/themes.style";
import type { TableObject } from "@/utils/tableMatcher";
import TableMatcher from "@/utils/tableMatcher";
import { css } from "@emotion/react";

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
            <th css={TableHeaderElement}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr>
            {keys.map((key) => (
              <td css={TableContentElement}>{row[key]}</td>
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
  font: ${theme.typography.Body.b4_medi};
`;

const TableHeader = css`
  color: ${theme.color.GrayScale.gray5};
  background-color: ${theme.color.GrayScale.gray1};
`;

const TableHeaderElement = css`
  padding: 16px 40px;
`;

const TableContentElement = css`
  text-align: center;
  padding: 16px 12px;
  /* border-right: 1px solid ${theme.color.GrayScale.gray3}; */
  border-bottom: 1px solid ${theme.color.GrayScale.gray3};

  &:last-child {
    border-right: none;
  }
`;
