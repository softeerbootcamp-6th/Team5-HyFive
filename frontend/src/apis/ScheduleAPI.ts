import type {
  NodeAPIReponse,
  PassengerAPIResponse,
  ScheduleAPIResposne,
} from "@/features/schedule/Schedule.types";
import { APIMatcher } from "@/utils/APIMatcher";
import { clientInstance } from "@/utils/AxiosInstance";
import TabMatcher from "@/utils/TabMatcher";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const useGetEntireSchedule = (activeTab: string) => {
  const engScheduleStatus = TabMatcher.matchScheduleTypeKRToENG(activeTab);
  const scheduleStatus =
    TabMatcher.matchScheduleTypeClientToServer(engScheduleStatus);
  const { data, isError, error, isFetching, refetch } =
    useSuspenseQuery<ScheduleAPIResposne>({
      queryKey: ["schedule", scheduleStatus],
      queryFn: () =>
        clientInstance.get(`/path/sroll?status=${scheduleStatus}&size=100`),
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
  const { data, isError, error, isFetching, refetch } =
    useQuery<PassengerAPIResponse>({
      queryKey: ["passenger", activeId],
      queryFn: () => clientInstance.get(`/path/${activeId}/passenger`),
      retry: 1,
    });

  const passengerData = data?.data?.map((partData) =>
    APIMatcher.matchPassengerAPI(partData),
  );

  return {
    data: passengerData,
    isError,
    error,
    isFetching,
    refetch,
  };
};

export const useGetNode = (activeId: number) => {
  const { data, isError, error, isFetching, refetch } =
    useQuery<NodeAPIReponse>({
      queryKey: ["node", activeId],
      queryFn: () => clientInstance.get(`/path/${activeId}/nodes`),
      retry: 1,
    });

  const { polyline, marker, highlight } = data?.data ?? {};

  return {
    polyline,
    marker,
    highlight,
    isError,
    error,
    isFetching,
    refetch,
  };
};
