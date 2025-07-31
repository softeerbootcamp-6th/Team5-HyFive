import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";

type TableType = "users" | "books" | "orders" | "centers";
interface TableProps {
  type: TableType;
  rows: String[][]; //rows > row > item
}

const Table = ({ type, rows }: TableProps) => {
  const TABLE_HEADER = {
    users: ["이름", "전화번호", "보행 기구 유무", "예약 접수 시간"],
    books: ["이용 희망 날짜", "출발지", "목적지", "병원 도착 시간"],
    orders: [
      "탑승 순서",
      "이름",
      "전화번호",
      "보행 기구 유무",
      "탑승 예정 시간",
      "하차 예정 시간",
    ],
    centers: ["센터명", "전화 번호", "위치", "등록 차량", "저상형 대수"],
  };
  return (
    <table css={TableContainer}>
      <thead css={TableHeader}>
        <tr>
          {TABLE_HEADER[type].map((item) => (
            <th css={TableHeaderElement}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr>
            {row.map((item) => (
              <th css={TableContentElement}>{item}</th>
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
`;

const TableHeader = css`
  font: ${theme.typography.Body.b4_medi};
  color: ${theme.color.GrayScale.gray5};
  background-color: ${theme.color.GrayScale.gray1};
`;

const TableHeaderElement = css`
  padding: 16px 40px;
`;

const TableContentElement = css`
  padding: 16px 12px;
  /* border-right: 1px solid ${theme.color.GrayScale.gray3}; */
  border-bottom: 1px solid ${theme.color.GrayScale.gray3};

  &:last-child {
    border-right: none;
  }
`;
