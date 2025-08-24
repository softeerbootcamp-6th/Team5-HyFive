import EmptyUI from "@/components/EmptyUI";
import RefetchButton from "@/components/RefetchButton";
import Tabs from "@/components/Tabs";
import BookCard from "@/features/book/BookCard";
import { bookDataList } from "@/mocks/bookMocks";
import { theme } from "@/styles/themes.style";
import TabMatcher from "@/utils/TabMatcher";
import { css } from "@emotion/react";
import { type Dispatch, type SetStateAction } from "react";
import type { BookData } from "@/features/book/Book.types";
const { color, typography } = theme;

interface BookListSectionProps {
  data: BookData[] | undefined;
  activeTab: string;
  activeBookId: number | null;
  setActiveTab: Dispatch<SetStateAction<string>>;
  setActiveBookId: Dispatch<SetStateAction<number | null>>;
  refetch: () => void;
}
const BookListSection = ({
  data,
  activeTab,
  activeBookId,
  setActiveTab,
  setActiveBookId,
  refetch,
}: BookListSectionProps) => {
  const TAB_LIST = ["신규 예약", "예약 성공", "예약 실패"];
  const LOCATION_SECTION = "운정 1구역";

  return (
    <div css={BookListSectionContainer}>
      <div css={HeaderContainer}>
        <p css={LocationSectionText}>{LOCATION_SECTION}</p>
        <RefetchButton handleClick={refetch} />
      </div>
      <Tabs
        type="bar_true"
        group={TAB_LIST}
        selected={activeTab}
        setSelected={setActiveTab}
      />
      <div css={ContentContainer}>
        {data && data?.length > 0 ? (
          data.map((bookData, idx) => (
            <div
              key={`${activeTab}-${bookData.id}`}
              onClick={() => setActiveBookId(bookData.id)}
            >
              <BookCard
                bookType={TabMatcher.matchBookTypeKRToENG(activeTab)}
                data={bookData}
                isActive={bookData.id === activeBookId}
              />
              {idx !== bookDataList.length - 1 && <div css={LineWrapper} />}
            </div>
          ))
        ) : (
          <EmptyUI />
        )}
      </div>
    </div>
  );
};

export default BookListSection;

const BookListSectionContainer = css`
  min-width: 485px;
  max-width: 485px;
  height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  border-right: 1px solid ${color.GrayScale.gray3};
`;

const HeaderContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 0;
  flex-shrink: 0;
`;

const ContentContainer = css`
  flex: 1;
  overflow-y: scroll;
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
