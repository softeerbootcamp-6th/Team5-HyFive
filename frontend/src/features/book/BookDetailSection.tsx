import Table from "@/components/table/Table";
import RouteCard from "@/features/book/RouteCard";
import { theme } from "@/styles/themes.style";
import type { TableObject } from "@/utils/TableMatcher";
import TabMatcher from "@/utils/TabMatcher";
import { css } from "@emotion/react";
const { typography } = theme;

interface BookDetailSectionProps {
  activeTab: string;
  userRows: TableObject[];
  bookingRows: TableObject[];
  routeRows: TableObject[];
}

const BookDetailSection = ({
  activeTab,
  userRows,
  bookingRows,
  routeRows,
}: BookDetailSectionProps) => {
  const TABLE_SECTIONS = [
    { title: "예약자 정보", data: userRows },
    { title: "예약 정보", data: bookingRows },
    { title: "이용 경로 정보", data: routeRows },
  ];
  const parsedActiveTab = TabMatcher.matchBookTypKRToENG(activeTab);

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
