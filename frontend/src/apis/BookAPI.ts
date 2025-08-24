import type { BookAPIData, BookAPIResponse } from "@/features/book/Book.types";
import type { DateFilterValue } from "@/features/dateFilter/DateFilter.constants";
import type { UserFilterValue } from "@/features/statusFilter/StatusFilter.constants";
import { APIMatcher } from "@/utils/APIMatcher";
import { clientInstance } from "@/utils/AxiosInstance";
import TabMatcher from "@/utils/TabMatcher";
import { useQuery } from "@tanstack/react-query";

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
  const engBookStatus = TabMatcher.matchBookTypeKRToENG(activeTab);
  const bookStatus = TabMatcher.matchBookTypeClientToServer(engBookStatus);
  const { data, error, refetch } = useQuery<BookAPIResponse>({
    queryKey: ["book", bookStatus],
    queryFn: () =>
      clientInstance.get(
        `/book/scroll?status=${bookStatus}&lastId=&lastCreatedAt=&size=100`,
      ),
    throwOnError: true,
  });
  const bookData = data?.data.items.map((partData) =>
    APIMatcher.matchBookAPI(partData),
  );
  return {
    data: bookData,
    error,
    refetch,
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
