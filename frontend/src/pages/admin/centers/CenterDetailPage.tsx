import CenterOverview from "@/features/centerOverview/CenterOverview";
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

const { color, typography } = theme;

import { useEffect, useReducer, useState } from "react";

import Calender from "@/features/calender/Calender";
import TimeTable from "@/features/timeTable/components/TimeTable";
import {
  calenderReducer,
  initialState,
} from "@/features/calender/CalenderReducer";
import { useGetCenterInfo } from "@/apis/CenterAPI";
import { useGetCarList } from "@/apis/CarAPI";
import { mapBackendCarListToCarList } from "@/features/car/Car.type";
import CarList from "@/features/car/CarList";
import { mapBackendCenterInfoToCenterOverview } from "@/features/centerOverview/CenterOverview.type";

const CenterDetailPage = () => {
  const {
    centerInfoData,
    isFetching: isCenterFetching,
    error: CenterError,
  } = useGetCenterInfo();
  const {
    carList,
    isFetching: isCarFetching,
    error: carError,
  } = useGetCarList();

  const mappedCenterData =
    centerInfoData && mapBackendCenterInfoToCenterOverview(centerInfoData);
  const mappedCarList = carList && mapBackendCarListToCarList(carList);

  // 선택된 차량 초기화를 위함
  useEffect(() => {
    if (mappedCarList && mappedCarList.length > 0) {
      setSelectedCarId(mappedCarList[0].carId);
    }
  }, [mappedCarList]);

  const [selectedCarId, setSelectedCarId] = useState<number>(0);

  const [state, dispatch] = useReducer(calenderReducer, initialState);

  // Calender - 헤더용 핸들러
  const handleMonthChange = (direction: "next" | "prev") => {
    dispatch({
      type: "CHANGE_MONTH",
      payload: state.calendarDate,
      direction: direction,
    });
  };

  // Calender - 컨텐츠용 핸들러
  const handleDateClick = (date: Date) => {
    dispatch({ type: "SET_SELECTED_WEEK", payload: date });
    dispatch({ type: "SELECT_DATE", payload: date });
  };

  return (
    <div css={PageContainer}>
      {/* 센터 정보 */}
      <CenterOverview
        {...mappedCenterData}
        isLoading={isCenterFetching}
        error={CenterError}
      />

      {/* 등록된 차량 */}
      <div css={SectionWrapper}>
        <h4 css={SectionLabel}>등록된 차량</h4>
        <div css={ContentSection}>
          <div css={ContentSection}>
            <CarList
              canAddCar={false}
              carList={mappedCarList}
              selectedCarId={selectedCarId}
              setSelectedCarId={setSelectedCarId}
              isLoading={isCarFetching}
              error={carError}
            />
          </div>
        </div>
      </div>

      {/* 타임 테이블 */}
      <div css={SectionWrapper}>
        <h4 css={SectionLabel}>차량 시간표</h4>
        <div css={TableSection}>
          <TimeTable
            mode="view"
            selectedCarId={selectedCarId}
            selectedWeek={state.selectedWeek}
          />
          <Calender
            highlightType="week"
            calendarDate={state.calendarDate}
            selectedDate={state.selectedDate}
            onPrevMonth={() => handleMonthChange("prev")}
            onNextMonth={() => handleMonthChange("next")}
            onDateClick={handleDateClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CenterDetailPage;

const PageContainer = css`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 60px;
  padding: 40px;
`;

const SectionWrapper = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const SectionLabel = css`
  font: ${typography.Heading.h4_semi};
  color: ${color.GrayScale.black};
`;

const ContentSection = css`
  display: flex;
  gap: 20px;
  width: 100%;
  align-items: flex-start;
`;

const TableSection = css`
  display: flex;
  gap: 20px;
  width: 100%;
  align-items: flex-start;
  height: 600px;
`;
