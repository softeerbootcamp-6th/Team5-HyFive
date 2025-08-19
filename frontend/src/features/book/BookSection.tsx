import { useGetBook } from "@/apis/BookAPI";
import BookDetailSection from "@/features/book/BookDetailSection";
import BookListSection from "@/features/book/BookListSection";
import { css } from "@emotion/react";
import { useState } from "react";

const BookSection = () => {
  const [activeTab, setActiveTab] = useState<string>("신규 예약");
  const [activeBookId, setActiveBookId] = useState<number | null>(null);

  const { data, refetch } = useGetBook(activeTab);
  const activeBookData = data?.find(
    (book) => book.id === (activeBookId ? activeBookId : data[0].id),
  );

  return (
    <div css={BookPageContainer}>
      <BookListSection
        data={data}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeBookId={activeBookId}
        setActiveBookId={setActiveBookId}
        refetch={refetch}
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
