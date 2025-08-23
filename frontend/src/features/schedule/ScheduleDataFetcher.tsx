import { useGetEntireSchedule } from "@/apis/ScheduleAPI";
import EmptyUI from "@/components/EmptyUI";
import type {
  ScheduleData,
  ScheduleType,
} from "@/features/schedule/Schedule.types";
import ScheduleCard from "@/features/schedule/ScheduleCard";
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { CustomError } from "@/utils/CustomError";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, type Dispatch, type SetStateAction } from "react";
const { color } = theme;

const ScheduleDataFetcher = ({
  activeTab,
  parsedActiveTab,
  selectedSchedule,
  setSelectedSchedule,
}: {
  activeTab: string;
  parsedActiveTab: ScheduleType;
  selectedSchedule: Partial<ScheduleData | null>;
  setSelectedSchedule: Dispatch<SetStateAction<Partial<ScheduleData | null>>>;
}) => {
  const { data, isError, isFetching, error } = useGetEntireSchedule(activeTab);
  if (isError)
    throw new CustomError({
      message: error?.message || "데이터 통신 중 에러가 발생했습니다.",
    });

  useEffect(() => {
    if (data && data.length > 0 && !selectedSchedule?.routeId) {
      setSelectedSchedule({
        routeId: data[0].routeId,
        routeStartLocation: data[0].routeStartLocation,
        routeEndLocation: data[0].routeEndLocation,
      });
    }
  }, [data, setSelectedSchedule]);

  if (isFetching) {
    return (
      <div css={LoadingSpinnerWrapper}>
        <LoadingSpinner />
      </div>
    );
  }

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
              routeEndLocation: scheduleData.routeStartLocation,
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

const LoadingSpinnerWrapper = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
