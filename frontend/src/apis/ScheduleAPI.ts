import type {
  NodeAPIReponse,
  PassengerAPIResponse,
  ScheduleAPIResposne,
} from "@/features/schedule/Schedule.types";
import { APIMatcher } from "@/utils/APIMatcher";
import { clientInstance } from "@/utils/AxiosInstance";
import TabMatcher from "@/utils/TabMatcher";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetEntireSchedule = (activeTab: string) => {
  // 한글 탭 > 영어 탭으로 변경
  const engScheduleStatus = TabMatcher.matchScheduleTypeKRToENG(activeTab);
  // 영어 클라이언트용 탭 > 영어 서버용 탭으로 변경
  const scheduleStatus =
    TabMatcher.matchScheduleTypeClientToServer(engScheduleStatus);

  const { data, isError, error, isFetching, refetch } =
    useSuspenseQuery<ScheduleAPIResposne>({
      queryKey: ["schedule", scheduleStatus],
      queryFn: () =>
        clientInstance.get(`/path/scroll?status=${scheduleStatus}&size=100`),
      retry: 1,
    });

  const entireScheduleData = data?.data?.items?.map((partData) =>
    APIMatcher.matchScheduleAPI(partData),
  );
  return {
    data: entireScheduleData,
    isError,
    error,
    isFetching,
    refetch,
  };
};

export const useGetPassenger = (activeId: number) => {
  const { data, refetch } = useSuspenseQuery<PassengerAPIResponse>({
    queryKey: ["passenger", activeId],
    queryFn: () => clientInstance.get(`/path/${activeId}/passenger`),
    retry: 1,
  });

  const passengerData = data?.data?.map((partData) =>
    APIMatcher.matchPassengerAPI(partData),
  );

  return {
    data: passengerData,
    refetch,
  };
};

export const useGetNode = (activeId: number) => {
  const { data, refetch } = useSuspenseQuery<NodeAPIReponse>({
    queryKey: ["node", activeId],
    queryFn: () => clientInstance.get(`/path/${activeId}/nodes`),
    retry: 1,
  });

  const { polyline, marker, highlight } = data?.data ?? {};

  return {
    polyline,
    marker,
    highlight,
    refetch,
  };
};
