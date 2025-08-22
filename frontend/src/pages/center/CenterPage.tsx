// React & Hooks
import { useMemo, useReducer, useState } from "react";

// 스타일
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

// 컴포넌트
import CenterOverview from "@/features/centerOverview/CenterOverview";
import { TimeTable } from "@/features/timeTable/components";
import Calender from "@/features/calender/Calender";
import ToolTip from "@/components/ToolTip";
import MonoButton from "@/components/MonoButton";

// 아이콘
import { WhiteEditIcon } from "@/assets/icons";

// 데이터 & 유틸
import {
  calenderReducer,
  initialState,
} from "@/features/calender/CalenderReducer";
import { isFutureWeek } from "@/features/calender/Calender.util";
import { useCarNavigation } from "@/hooks/useCenterNavigation";
import Modal from "@/components/Modal";
import { useCenterModal } from "@/hooks/useCenterModal";
import { useGetCenterInfo } from "@/apis/CenterAPI";
import { useGetCarList } from "@/apis/CarAPI";
import { mapBackendCenterInfoToCenterOverview } from "@/features/centerOverview/CenterOverview.type";
import { mapBackendCarListToCarList } from "@/features/car/Car.type";
import CarList from "@/features/car/CarList";

const { color, typography } = theme;
const TOOLTIP_DATA = {
  label: "일정 등록 기준",
  content: "최소 2시간 이상 등록 가능합니다.",
};

const CenterPage = () => {
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

  // 상태
  const [selectedCarId, setSelectedCarId] = useState<number>(0);
  const [state, dispatch] = useReducer(calenderReducer, initialState);
  const [isEditMode, setIsEditMode] = useState(false);

  const isEditableWeek = useMemo(
    () => isFutureWeek(state.selectedWeek),
    [state.selectedWeek],
  );

  // 이벤트 핸들러
  const { navigateToRegisterCar, navigateToEditCar } = useCarNavigation();
  const {
    modalState,
    openEditModal,
    openDeleteModal,
    openDoneModal,
    closeModal,
    createModalContent,
  } = useCenterModal();

  const handleClickEdit = (type: "edit" | "delete") => {
    if (!selectedCarId || !mappedCarList) {
      alert("선택된 차량이 없습니다. 차량 선택 후 진행해주세요.");
      return;
    }

    const selectedCarInfo = mappedCarList.find(
      (car) => car.carId === selectedCarId,
    );

    if (!selectedCarInfo) return;

    if (type === "edit") {
      openEditModal();
    } else if (type === "delete") {
      openDeleteModal();
    }
  };

  const handleEditConfirm = () => {
    const selectedCarInfo = mappedCarList!.find(
      (car) => car.carId === selectedCarId,
    );

    if (!selectedCarInfo) return;

    navigateToEditCar(selectedCarInfo);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    // TODO 재민 - 삭제 로직 구현
    closeModal();
    // TODO - 삭제 완료 후 확인 모달 열기
    setTimeout(() => {
      openDoneModal();
    }, 1000);
  };

  const handleMonthChange = (direction: "next" | "prev") => {
    dispatch({
      type: "CHANGE_MONTH",
      payload: state.calendarDate,
      direction: direction,
    });
  };

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
        <div css={CarSectionHeader}>
          <h4 css={SectionLabel}>등록된 차량</h4>
          <div css={ActionButtonGroup}>
            <button
              css={CarEditTextStyle}
              onClick={() => handleClickEdit("edit")}
            >
              수정하기
            </button>
            <div css={DividerStyle} />
            <button
              css={CarEditTextStyle}
              onClick={() => handleClickEdit("delete")}
            >
              삭제하기
            </button>
          </div>
        </div>
        <div css={ContentSection}>
          <CarList
            canAddCar={true}
            onAddCarClick={navigateToRegisterCar}
            carList={mappedCarList}
            selectedCarId={selectedCarId}
            setSelectedCarId={setSelectedCarId}
            isLoading={isCarFetching}
            error={carError}
          />
        </div>
      </div>

      {/* 타임 테이블 */}
      <div css={SectionWrapper}>
        <div css={TimeTableSectionHeader}>
          <div css={HeaderLeftGroup}>
            <h4 css={SectionLabel}>차량 시간표</h4>
            <ToolTip
              label={TOOLTIP_DATA.label}
              content={TOOLTIP_DATA.content}
            />
          </div>
          <div css={HeaderRightGroup}>
            {isEditableWeek &&
              (isEditMode ? (
                <div css={ActionButtonGroup}>
                  <MonoButton
                    mode="white"
                    label="취소"
                    onClick={() => {
                      setIsEditMode(false);
                    }}
                  />
                  <MonoButton
                    mode="black"
                    label="저장"
                    onClick={() => {
                      setIsEditMode(false);
                    }}
                  />
                </div>
              ) : (
                <MonoButton
                  mode="black"
                  label="유휴시간 편집"
                  icon={<WhiteEditIcon />}
                  onClick={() => {
                    setIsEditMode(true);
                  }}
                />
              ))}
          </div>
        </div>

        <div css={TableSection}>
          <TimeTable
            mode={isEditMode ? "edit" : "view"}
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
      <Modal isOpen={!!modalState} onClose={closeModal}>
        {createModalContent({
          close: closeModal,
          handleEditConfirm,
          handleDeleteConfirm,
        })}
      </Modal>
    </div>
  );
};

export default CenterPage;

// TODO 재민 - 하드코딩 값 제거 + 반응형 고려
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

const ActionButtonGroup = css`
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

const TimeTableSectionHeader = css`
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  justify-content: center;
`;

const HeaderLeftGroup = css`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: auto;
`;

const HeaderRightGroup = css`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 466px;
`;
