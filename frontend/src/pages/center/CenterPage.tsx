import { useNavigate } from "react-router";
import { useReducer, useState } from "react";
import { mockCarData, mockCenterData } from "@/mocks/centerDetailMocks";
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import {
  calenderReducer,
  initialState,
} from "@/features/calender/CalenderReducer";
import CenterOverview from "@/features/centerOverview/CenterOverview";
import CarInfoCard from "@/features/car/CarInfoCard";
import { TimeTable } from "@/features/timeTable/components";
import Calender from "@/features/calender/Calender";
import CarAddCard from "@/features/car/CarAddCard";

const { color, typography } = theme;

const CenterPage = () => {
  const navigate = useNavigate();

  const handleAddCar = () => {
    void navigate("/center/register");
  };

  const handleEditCar = () => {
    const selectedCar = mockCarData.find((car) => car.carId === selectedCarId);
    if (!selectedCar) return;

    void navigate("/center/edit", {
      state: {
        carImage: selectedCar.carImgURL,
        carModel: selectedCar.carName,
        carNumber: selectedCar.carNum,
        maxPassenger: selectedCar.capacity,
        isLowFloor: selectedCar.isLowFloor,
      },
    });
  };

  const [selectedCarId, setSelectedCarId] = useState<number>(
    mockCarData[0].carId,
  );
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
      <CenterOverview {...mockCenterData} />

      {/* 등록된 차량 */}
      <div css={SectionWrapper}>
        <div css={CarSectionHeader}>
          <h4 css={SectionLabel}>등록된 차량</h4>
          <div css={CarEditButtonContainer}>
            <button css={CarEditTextStyle} onClick={() => handleEditCar()}>
              수정하기
            </button>
            <div css={DividerStyle} />
            <button css={CarEditTextStyle}>삭제하기</button>
          </div>
        </div>
        <div css={ContentSection}>
          {mockCarData.map((car) => (
            <CarInfoCard
              key={car.carId}
              carData={car}
              isSelected={selectedCarId === car.carId}
              setIsSelected={setSelectedCarId}
            />
          ))}
          {mockCarData.length < 6 && <CarAddCard onClick={handleAddCar} />}
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

export default CenterPage;

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

const CarSectionHeader = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const TableSection = css`
  display: flex;
  gap: 20px;
  width: 100%;
  align-items: flex-start;
  height: 600px;
`;

const CarEditButtonContainer = css`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 12px;
`;

const DividerStyle = css`
  width: 1px;
  align-self: stretch;
  background-color: ${color.GrayScale.gray3};
`;

const CarEditTextStyle = css`
  cursor: pointer;
  flex: 1;
  font: ${typography.Body.b4_medi};
  color: ${color.GrayScale.gray5};
`;
