import { useGetEntireSchedule } from "@/apis/ScheduleAPI";
import EmptyUI from "@/components/EmptyUI";
import type { ScheduleType } from "@/features/schedule/Schedule.types";
import ScheduleCard from "@/features/schedule/ScheduleCard";
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { CustomError } from "@/utils/CustomError";
import LoadingSpinner from "@/components/LoadingSpinner";
const { color } = theme;

const ScheduleDataFetcher = ({
  activeTab,
  parsedActiveTab,
}: {
  activeTab: string;
  parsedActiveTab: ScheduleType;
}) => {
  const { data, isError, isFetching, error } = useGetEntireSchedule(activeTab);
  if (isError)
    throw new CustomError({
      message: error?.message || "데이터 통신 중 에러가 발생했습니다.",
    });

  if (isFetching && (!data || data.length === 0)) {
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
        <div key={scheduleData.routeId}>
          <ScheduleCard drivingType={parsedActiveTab} data={scheduleData} />
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
