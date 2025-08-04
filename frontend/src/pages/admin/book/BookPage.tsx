import type { BookType } from "@/features/book/Book.types";
import BookDetailSection from "@/features/book/BookDetailSection";
import BookListSection from "@/features/book/BookListSection";
import { rowsUser } from "@/mocks/tableMocks";
import TableMatcher from "@/utils/TableMatcher";
import { css } from "@emotion/react";
import { useState } from "react";

const BookPage = () => {
  const { userRows, bookingRows, routeRows } =
    TableMatcher.matchBookTableType(rowsUser);

  const TAB_LIST: BookType[] = ["pending", "success", "fail"];
  const [activeTab, setActiveTab] = useState<BookType>(TAB_LIST[0]);
  return (
    <div css={BookPageContainer}>
      <BookListSection
        TAB_LIST={TAB_LIST}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <BookDetailSection
        activeTab={activeTab}
        userRows={userRows}
        bookingRows={bookingRows}
        routeRows={routeRows}
      />
    </div>
  );
};

export default BookPage;

const BookPageContainer = css`
  display: flex;
  flex-direction: row;
`;
