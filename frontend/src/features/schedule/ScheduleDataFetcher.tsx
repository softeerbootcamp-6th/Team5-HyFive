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
import { CustomError } from "@/utils/CustomError";
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
  const { data, isError } = useGetEntireSchedule(activeTab);

  useEffect(() => {
    if (data && data.length > 0 && !selectedSchedule?.routeId) {
      setSelectedSchedule({
        routeId: data[0].routeId,
        routeStartLocation: data[0].routeStartLocation,
        routeEndLocation: data[0].routeEndLocation,
      });
    }
  }, [data, setSelectedSchedule, selectedSchedule?.routeId]);

  if (isError)
    throw new CustomError({
      message: "운행 경로 데이터 통신 중 문제가 발생했습니다.",
    });

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
