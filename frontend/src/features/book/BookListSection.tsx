import EmptyUI from "@/components/EmptyUI";
import RefetchButton from "@/components/RefetchButton";
import Tabs from "@/components/Tabs";
import BookCard from "@/features/book/BookCard";
import { bookDataList } from "@/mocks/bookMocks";
import { theme } from "@/styles/themes.style";
import TabMatcher from "@/utils/TabMatcher";
import { css, keyframes } from "@emotion/react";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useGetBook } from "@/apis/BookAPI";
import type { BookData } from "@/features/book/Book.types";
import Tag from "@/components/Tag";
const { color, typography } = theme;

interface BookListSectionProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeBookData: BookData | null;
  setActiveBookData: Dispatch<SetStateAction<BookData | null>>;
}
const BookListSection = ({
  activeTab,
  setActiveTab,
  activeBookData,
  setActiveBookData,
}: BookListSectionProps) => {
  const TAB_LIST = ["신규 예약", "예약 성공", "예약 실패"];
  const LOCATION_SECTION = "운정 1구역";

  const {
    visibleData: data,
    isNewDataActive,
    pendingCount,
    mergePendingToVisible,
    isFetching,
    refetch,
  } = useGetBook(activeTab);

  // 첫 번째 인덱스의 값 초기값으로 설정
  useEffect(() => {
    setActiveBookData(data[0]);
  }, [data, setActiveBookData]);

  return (
    <div css={BookListSectionContainer}>
      <div css={HeaderContainer}>
        <p css={LocationSectionText}>{LOCATION_SECTION}</p>
        <RefetchButton isFetching={isFetching} handleClick={refetch} />
      </div>
      <Tabs
        type="bar_true"
        group={TAB_LIST}
        selected={activeTab}
        setSelected={setActiveTab}
      />
      {isNewDataActive && (
        <div onClick={mergePendingToVisible} css={NewDataWrapper}>
          <Tag type="blue" label={`새로운 예약: ${pendingCount}건`} />
        </div>
      )}
      <div css={ContentContainer}>
        {data && data?.length > 0 ? (
          data.map((bookData, idx) => (
            <div
              key={`${activeTab}-${bookData.id}`}
              onClick={() => setActiveBookData(bookData)}
            >
              <BookCard
                bookType={TabMatcher.matchBookTypeKRToENG(activeTab)}
                data={bookData}
                isActive={bookData.id === activeBookData?.id}
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

const popIn = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  70% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const NewDataWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${popIn} 0.5s ease-out;
`;

const LocationSectionText = css`
  color: ${color.GrayScale.black};
  font: ${typography.Label.l1_semi};
`;
