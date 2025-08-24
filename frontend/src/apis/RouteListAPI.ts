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
  pathId: number | null = null,
) => {
  if (status === "ALL") status = "";
  const { data, error, isFetching, refetch } = useQuery<RouteListAPIResponse>({
    queryKey: ["routeList", period, status, pathId, page, limit],
    queryFn: () => {
      const params = new URLSearchParams();
      params.append("period", period);
      params.append("status", status);
      params.append("page", String(page));
      params.append("limit", String(limit));
      if (pathId !== null && pathId !== undefined) {
        params.append("path-id", String(pathId));
      }
      return clientInstance.get(`/path/list?${params.toString()}`);
    },
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
    refetch,
  };
};
