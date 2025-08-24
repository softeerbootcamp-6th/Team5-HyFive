import type { BookData } from "@/features/book/Book.types";
import BookDetailSection from "@/features/book/BookDetailSection";
import BookListSection from "@/features/book/BookListSection";
import { css } from "@emotion/react";
import { useState } from "react";

const BookSection = () => {
  const [activeTab, setActiveTab] = useState<string>("신규 예약");
  const [activeBookData, setActiveBookData] = useState<BookData | null>(null);

  return (
    <div css={BookPageContainer}>
      <BookListSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeBookData={activeBookData}
        setActiveBookData={setActiveBookData}
      />
      <BookDetailSection data={activeBookData} activeTab={activeTab} />
    </div>
  );
};

export default BookSection;

const BookPageContainer = css`
  display: flex;
  flex-direction: row;
`;
