import { useGetBook } from "@/apis/BookAPI";
import BookDetailSection from "@/features/book/BookDetailSection";
import BookListSection from "@/features/book/BookListSection";
import { css } from "@emotion/react";
import { useState } from "react";

const BookSection = () => {
  const [activeTab, setActiveTab] = useState<string>("신규 예약");
  const [activeBookId, setActiveBookId] = useState<number | null>(null);
  const { data } = useGetBook(activeTab);

  //   const [activeBookWithAPIType, setActiveBookWithAPIType] = useState<
  //     BookDataType | undefined
  //   >(undefined);

  // useEffect(() => {
  //   if (!data || data.length === 0) return;
  //   console.log(data);
  //   // setActiveBookId(data[0].id);
  //   // if (data && data.length > 0) {
  //   //   setActiveBookId(data[0].id);
  //   // }
  //   // return () => setActiveBookId(null);
  // }, [data, activeTab]);

  const activeBookWithAPIType = data?.find((book) => book.id === activeBookId);

  return (
    <div css={BookPageContainer}>
      <BookListSection
        data={data}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setActiveBookId={setActiveBookId}
      />
      <BookDetailSection data={activeBookWithAPIType} activeTab={activeTab} />
    </div>
  );
};

export default BookSection;

const BookPageContainer = css`
  display: flex;
  flex-direction: row;
`;
