import type { BookAPIResponse } from "@/features/book/Book.types";
import { APIMatcher } from "@/utils/APIMatcher";
import { clientInstance } from "@/utils/AxiosInstance";
import TabMatcher from "@/utils/TabMatcher";
import { useQuery } from "@tanstack/react-query";

export const useGetBook = (activeTab: string) => {
  const engBookStatus = TabMatcher.matchBookTypeKRToENG(activeTab);
  const bookStatus = TabMatcher.matchBookTypeClientToServer(engBookStatus);
  const { data, isFetching, refetch } = useQuery<BookAPIResponse>({
    queryKey: ["book", bookStatus],
    queryFn: () =>
      clientInstance.get(
        `/book/scroll?status=${bookStatus}&lastId=&lastCreatedAt=&size=100`,
      ),
    throwOnError: true,
    refetchInterval: 600000,
  });
  const bookData = data?.data.items.map((partData) =>
    APIMatcher.matchBookAPI(partData),
  );
  return {
    data: bookData,
    isFetching,
    refetch,
  };
};
