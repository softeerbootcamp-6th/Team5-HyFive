import type {
  BookAPIData,
  BookAPIResponse,
  BookData,
} from "@/features/book/Book.types";
import type { DateFilterValue } from "@/features/dateFilter/DateFilter.constants";
import type { UserFilterValue } from "@/features/statusFilter/StatusFilter.constants";
import { APIMatcher } from "@/utils/APIMatcher";
import { clientInstance } from "@/utils/AxiosInstance";
import TabMatcher from "@/utils/TabMatcher";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface BookListAPIResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    items: (BookAPIData & { pathId: number })[];
    currentPageNum: number;
    totalPageNum: number;
    totalItemNum: number;
  };
}

export const useGetBook = (activeTab: string) => {
  // book 상태 관리
  const [visibleData, setVisibleData] = useState<BookData[]>([]);
  const [pendingData, setPendingData] = useState<BookData[]>([]);
  const [isNewDataActive, setIsNewDataActive] = useState(false);

  // 이전 탭 추적
  const prevTabRef = useRef<string>(activeTab);
  const isInitializedRef = useRef(false);

  // book status 서버용으로 변환
  const engBookStatus = TabMatcher.matchBookTypeKRToENG(activeTab);
  const bookStatus = TabMatcher.matchBookTypeClientToServer(engBookStatus);

  // polling 주기 관리
  const minInterval = 0.5 * 60000; //30초
  const maxInterval = 1 * 60000; //1분
  const intervalRef = useRef(minInterval);

  const query = useQuery<BookAPIResponse>({
    queryKey: ["book", bookStatus],
    queryFn: () =>
      clientInstance.get(
        `/book/scroll?status=${bookStatus}&lastId=&lastCreatedAt=&size=100`,
      ),
    throwOnError: true,
    refetchInterval: (query) => {
      /**
       * polling
       * - 에러 발생시 interval 2배
       * - 통신 성공+새 데이터 발생시 interval 최소값으로 설정
       * - 통신 성공+새 데이터 없을시 interval 2배
       */
      if (query.state.error) {
        intervalRef.current = Math.min(intervalRef.current * 2, maxInterval);
      } else if (query.state.data && query.state.data?.data.items?.length > 0) {
        intervalRef.current = minInterval;
      } else {
        intervalRef.current = Math.min(intervalRef.current * 2, maxInterval);
      }
      return intervalRef.current;
    },
  });

  const bookData = query.data?.data.items.map((partData) =>
    APIMatcher.matchBookAPI(partData),
  );

  // 탭 변경 감지 및 초기화
  useEffect(() => {
    if (prevTabRef.current !== activeTab) {
      setVisibleData([]);
      setPendingData([]);
      setIsNewDataActive(false);
      isInitializedRef.current = false;
      prevTabRef.current = activeTab;
    }
  }, [activeTab]);

  // 새로운 데이터 처리
  useEffect(() => {
    if (!bookData || bookData.length === 0) return;

    if (!isInitializedRef.current) {
      setVisibleData(bookData);
      isInitializedRef.current = true;
    } else {
      const existingIds = new Set([
        ...visibleData.map((item) => item.id),
        ...pendingData.map((item) => item.id),
      ]);

      const newItems = bookData.filter((item) => !existingIds.has(item.id));
      if (newItems.length > 0) {
        setPendingData((prev) => [...newItems, ...prev]);
        setIsNewDataActive(true);
      }
    }
  }, [bookData, visibleData, pendingData]);

  // visible Data에 pending Data 수동 병합
  const mergePendingToVisible = () => {
    setVisibleData((prev) => [...pendingData, ...prev]);
    setPendingData([]);
    setIsNewDataActive(false);
  };

  return {
    data: bookData,
    visibleData,
    pendingData,
    isNewDataActive,
    pendingCount: pendingData.length,
    isFetching: query.isFetching,
    refetch: query.refetch,
    mergePendingToVisible,
  };
};

export const useGetBookList = (
  period: DateFilterValue,
  status: UserFilterValue | "",
  page: number,
  limit: number,
) => {
  if (status === "ALL") status = "";
  const { data, error, isFetching } = useQuery<BookListAPIResponse>({
    queryKey: ["bookList", period, status, page, limit],
    queryFn: () =>
      clientInstance.get(
        `/book/list?period=${period}&status=${status}&page=${page}&limit=${limit}`,
      ),
    throwOnError: true,
  });

  const bookList = data?.data.items.map((partData) =>
    APIMatcher.matchbookListAPI(partData),
  );
  return {
    items: bookList ?? [],
    pageInfo: {
      current: data?.data.currentPageNum ?? 1,
      totalPages: data?.data.totalPageNum ?? 1,
      totalItems: data?.data.totalItemNum ?? 0,
    },

    error,
    isFetching,
  };
};
