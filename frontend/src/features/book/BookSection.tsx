import { useGetBook } from "@/apis/BookAPI";
import BookDetailSection from "@/features/book/BookDetailSection";
import BookListSection from "@/features/book/BookListSection";
import { rowsUser } from "@/mocks/tableMocks";
import TableMatcher from "@/utils/TableMatcher";
import { css } from "@emotion/react";
import { useState } from "react";

const BookSection = () => {
  const TAB_LIST = ["신규 예약", "예약 성공", "예약 실패"];
  const [activeTab, setActiveTab] = useState<string>(TAB_LIST[0]);

  const { data } = useGetBook(activeTab);
  if (!data) return;
  const [activeBookId, setActiveBookId] = useState(data[0].id);
  const { userRows, bookingRows, routeRows } =
    TableMatcher.matchBookTableType(rowsUser);

  return (
    <div css={BookPageContainer}>
      <BookListSection
        data={data}
        TAB_LIST={TAB_LIST}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <BookDetailSection
        data={data[activeBookId]}
        activeTab={activeTab}
        userRows={userRows}
        bookingRows={bookingRows}
        routeRows={routeRows}
      />
    </div>
  );
};

export default BookSection;

const BookPageContainer = css`
  display: flex;
  flex-direction: row;
`;
