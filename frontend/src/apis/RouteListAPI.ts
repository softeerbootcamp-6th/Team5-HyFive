import type { DateFilterValue } from "@/features/dateFilter/DateFilter.constants";
import type { RouteFilterValue } from "@/features/statusFilter/StatusFilter.constants";
import type { BackendRouteType } from "@/types/routeType.types";
import { APIMatcher } from "@/utils/APIMatcher";
import { clientInstance } from "@/utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

interface RouteListAPIResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    items: BackendRouteType[];
    currentPageNum: number;
    totalPageNum: number;
    totalItemNum: number;
  };
}

export const useGetRouteList = (
  period: DateFilterValue,
  status: RouteFilterValue | "",
  page: number,
  limit: number,
) => {
  if (status === "ALL") status = "";
  const { data, error, isFetching } = useQuery<RouteListAPIResponse>({
    queryKey: ["routeList", period, status, page, limit],
    queryFn: () =>
      clientInstance.get(
        `/path/list?period=${period}&status=${status}&path-id=1&page=${page}&limit=${limit}`,
      ),
    throwOnError: true,
  });
  const routeList = data?.data.items.map((partData) =>
    APIMatcher.matchRouteListAPI(partData),
  );
  return {
    items: routeList ?? [],
    pageInfo: {
      current: data?.data.currentPageNum ?? 1,
      totalPages: data?.data.totalPageNum ?? 1,
      totalItems: data?.data.totalItemNum ?? 0,
    },

    error,
    isFetching,
  };
};
