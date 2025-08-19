import Table from "@/components/table/Table";
import RouteCard from "@/features/book/RouteCard";
import { theme } from "@/styles/themes.style";
import type { BookDataType } from "@/types/bookType.types";
import TableMatcher from "@/utils/TableMatcher";
import TabMatcher from "@/utils/TabMatcher";
import { css } from "@emotion/react";
const { typography } = theme;

interface BookDetailSectionProps {
  data: BookDataType | undefined;
  activeTab: string;
}

const BookDetailSection = ({ data, activeTab }: BookDetailSectionProps) => {
  const { id, bookStatus, ...activeBook } = data ?? {};
  const { userRows, bookingRows, routeRows } = TableMatcher.matchBookTableType(
    data ? [activeBook] : [],
  );
  const TABLE_SECTIONS = [
    { title: "예약자 정보", data: userRows },
    { title: "예약 정보", data: bookingRows },
    { title: "이용 경로 정보", data: routeRows },
  ];
  const parsedActiveTab = TabMatcher.matchBookTypeKRToENG(activeTab);

  return (
    <div css={BookDetailSectionContainer}>
      {TABLE_SECTIONS.map(({ title, data }) => (
        <div css={TableWrapper} key={title}>
          <p css={TitleText}>{title}</p>
          {title === "이용 경로 정보" && parsedActiveTab !== "success" ? (
            <RouteCard routeType={parsedActiveTab as "pending" | "fail"} />
          ) : (
            <Table rows={data} />
          )}
        </div>
      ))}
    </div>
  );
};

export default BookDetailSection;

const BookDetailSectionContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 40px;
`;

const TableWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TitleText = css`
  font: ${typography.Heading.h5_semi};
`;
