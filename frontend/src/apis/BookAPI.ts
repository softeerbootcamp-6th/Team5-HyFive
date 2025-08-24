import type { BookAPIResponse } from "@/features/book/Book.types";
import { APIMatcher } from "@/utils/APIMatcher";
import { clientInstance } from "@/utils/AxiosInstance";
import TabMatcher from "@/utils/TabMatcher";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

export const useGetBook = (activeTab: string) => {
  // book status 서버용으로 변환
  const engBookStatus = TabMatcher.matchBookTypeKRToENG(activeTab);
  const bookStatus = TabMatcher.matchBookTypeClientToServer(engBookStatus);

  // polling 주기 관리
  const minInterval = 5000;
  const maxInterval = 60000;
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
      console.log(intervalRef.current);
      return intervalRef.current;
    },
  });

  const bookData = query.data?.data.items.map((partData) =>
    APIMatcher.matchBookAPI(partData),
  );

  return {
    data: bookData,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
};
