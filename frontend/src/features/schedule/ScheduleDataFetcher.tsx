import { useGetEntireSchedule } from "@/apis/ScheduleAPI";
import EmptyUI from "@/components/EmptyUI";
import type {
  ScheduleData,
  ScheduleType,
} from "@/features/schedule/Schedule.types";
import ScheduleCard from "@/features/schedule/ScheduleCard";
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { useEffect, type Dispatch, type SetStateAction } from "react";
const { color } = theme;

const ScheduleDataFetcher = ({
  activeTab,
  parsedActiveTab,
  selectedSchedule,
  setSelectedSchedule,
  setRefetchFn,
  setIsFetching,
}: {
  activeTab: string;
  parsedActiveTab: ScheduleType;
  selectedSchedule: Partial<ScheduleData | null>;
  setSelectedSchedule: Dispatch<SetStateAction<Partial<ScheduleData | null>>>;
  setRefetchFn: (refetch: () => void) => void;
  setIsFetching: (fetching: boolean) => void;
}) => {
  const { data, isFetching, refetch } = useGetEntireSchedule(activeTab);

  useEffect(() => {
    setRefetchFn(refetch);
  }, [refetch, setRefetchFn]);

  useEffect(() => {
    setIsFetching(isFetching);
  }, [isFetching, setIsFetching]);

  useEffect(() => {
    if (data && data.length > 0 && !selectedSchedule?.routeId) {
      setSelectedSchedule({
        routeId: data[0].routeId,
        routeStartLocation: data[0].routeStartLocation,
        routeEndLocation: data[0].routeEndLocation,
      });
    }
  }, [data, setSelectedSchedule, selectedSchedule?.routeId]);

  if (!data || data.length === 0) {
    return <EmptyUI />;
  }

  return (
    <>
      {data.map((scheduleData, idx) => (
        <div
          key={scheduleData.routeId}
          onClick={() =>
            setSelectedSchedule({
              routeId: scheduleData.routeId,
              routeStartLocation: scheduleData.routeStartLocation,
              routeEndLocation: scheduleData.routeEndLocation,
            })
          }
        >
          <ScheduleCard
            drivingType={parsedActiveTab}
            data={scheduleData}
            isActive={scheduleData.routeId === selectedSchedule?.routeId}
          />
          {idx !== data.length - 1 && <div css={LineWrapper} />}
        </div>
      ))}
    </>
  );
};

export default ScheduleDataFetcher;

const LineWrapper = css`
  width: 405px;
  border-bottom: 1px solid ${color.GrayScale.gray3};
  margin: 20px auto;
`;
