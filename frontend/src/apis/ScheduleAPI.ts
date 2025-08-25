import type {
  NodeAPIReponse,
  PassengerAPIResponse,
  ScheduleAPIResponse,
} from "@/features/schedule/Schedule.types";
import { APIMatcher } from "@/utils/APIMatcher";
import { clientInstance } from "@/utils/AxiosInstance";
import TabMatcher from "@/utils/TabMatcher";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRef } from "react";

export const useGetEntireSchedule = (activeTab: string) => {
  // 한글 탭 > 영어 탭으로 변경
  const engScheduleStatus = TabMatcher.matchScheduleTypeKRToENG(activeTab);
  // 영어 클라이언트용 탭 > 영어 서버용 탭으로 변경
  const scheduleStatus =
    TabMatcher.matchScheduleTypeClientToServer(engScheduleStatus);

  // polling 주기 관리
  const minInterval = 1 * 60000; //1분
  const maxInterval = 2 * 60000; //2분
  const intervalRef = useRef(minInterval);

  const { data, isFetching, refetch } = useSuspenseQuery<ScheduleAPIResponse>({
    queryKey: ["schedule", scheduleStatus],
    queryFn: () =>
      clientInstance.get(`/path/scroll?status=${scheduleStatus}&size=100`),
    retry: 1,
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

  const entireScheduleData = data?.data?.items?.map((partData) =>
    APIMatcher.matchScheduleAPI(partData),
  );

  return {
    data: entireScheduleData,
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

  const passengerData = data?.data?.map((partData, idx) => ({
    order: idx + 1,
    ...APIMatcher.matchPassengerAPI(partData),
  }));

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
