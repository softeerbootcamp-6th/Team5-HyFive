import RefetchButton from "@/components/RefetchButton";
import Tabs from "@/components/Tabs";
import type { BookType } from "@/features/book/Book.types";
import BookCard from "@/features/book/BookCard";
import { bookDataList } from "@/mocks/bookMocks";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
import { useState } from "react";
const { color, typography } = theme;

const BookListSection = () => {
  const LOCATION_SECTION = "운정 1구역";
  const TAB_LIST: BookType[] = ["pending", "success", "fail"];
  const [activeTab, setActiveTab] = useState<BookType>(TAB_LIST[0]);
  return (
    <div css={BookListSectionContainer}>
      <div css={HeaderContainer}>
        <p css={LocationSectionText}>{LOCATION_SECTION}</p>
        <RefetchButton date="2025.05.07 17:00" handleClick={() => {}} />
      </div>
      <Tabs
        type="bar_true"
        group={TAB_LIST}
        selected={activeTab}
        setSelected={setActiveTab}
      />
      <div>
        {bookDataList.map((bookData, idx) => (
          <div>
            <BookCard
              key={bookData.name + bookData.routeId}
              bookType={activeTab}
              data={bookData}
            />
            {idx !== bookDataList.length - 1 && <div css={LineWrapper} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookListSection;

const BookListSectionContainer = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 485px;
  padding: 20px;
  border-right: 1px solid ${color.GrayScale.gray3};
`;

const HeaderContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 0;
`;

const LineWrapper = css`
  width: 405px;
  border-bottom: 1px solid ${color.GrayScale.gray3};
  margin: 20px auto;
`;

const LocationSectionText = css`
  color: ${color.GrayScale.black};
  font: ${typography.Label.l1_semi};
`;
