import type { BookAPIResponse } from "@/types/bookType.types";
import { clientInstance } from "@/utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetBook = () => {
  const { data, error, refetch } = useQuery<BookAPIResponse>({
    queryKey: ["book"],
    queryFn: () =>
      clientInstance.get(
        "/book/scroll?status=SUCCESS&lastId=&lastCreatedAt=&size=10",
      ),
    throwOnError: true,
  });
  const bookData = data?.data.items;
  return {
    data: bookData,
    error,
    refetch,
  };
};
