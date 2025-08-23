import {
  TableContainer,
  TableBody,
  LoadingContainer,
} from "../TimeTable.style";
import type {
  AvailableTimeSlotType,
  TimeTableProps,
} from "@/features/timeTable/TimeTable.type";

import { useEffect, useMemo, useState } from "react";
import {
  AvailableTimeSlots,
  TimeTableHeader,
  TimeLabels,
  TimeCells,
  AvailableTimeSlot,
} from "./index";
import { TIME_TABLE_CONFIG } from "@/features/timeTable/TimeTable.constants";
import { useTimeTableDrag } from "@/features/timeTable/hooks/useTimeTableDrag";
import { useGetTimeSlot } from "@/apis/TimeTableAPI";
import LoadingSpinner from "@/components/LoadingSpinner";
import ModalContent from "@/components/ModalContent";
import Modal from "@/components/Modal";
import { formatDateToYYMMDD } from "@/features/calender/Calender.util";

const TimeTable = ({ selectedCarId, selectedWeek, mode }: TimeTableProps) => {
  const [displayWeek, setDisplayWeek] = useState(selectedWeek);
  const [showSlots, setShowSlots] = useState(true);

  const weekKey = useMemo(() => {
    return formatDateToYYMMDD(displayWeek[0]);
  }, [displayWeek]);

  const nextWeekKey = useMemo(() => {
    return formatDateToYYMMDD(selectedWeek[0]);
  }, [selectedWeek]);

  const { timeSlotData, isFetching, error } = useGetTimeSlot(
    selectedCarId,
    nextWeekKey,
  );

  // draft 상태는 편집 모드에서만 사용 (수정/취소/저장을 위한 상태)
  const [timeSlotsDraft, setTimeSlotsDraft] = useState<AvailableTimeSlotType[]>(
    [],
  );

  const [previewSlot, setPreviewSlot] = useState<AvailableTimeSlotType | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // selectedCarId나 selectedWeek이 변경되면 draft 상태 초기화 및 애니메이션 처리
  useEffect(() => {
    setShowSlots(false);
    setTimeSlotsDraft([]);
    setPreviewSlot(null);

    const rafId = window.requestAnimationFrame(() => {
      setDisplayWeek(selectedWeek);
    });
    return () => window.cancelAnimationFrame(rafId);
  }, [selectedCarId, selectedWeek]);

  // 새로운 데이터가 로드되면 draft 상태 초기화
  useEffect(() => {
    if (timeSlotData) {
      setTimeSlotsDraft(timeSlotData);
      setPreviewSlot(null);
      setShowSlots(true);
    }
  }, [timeSlotData]);

  // 에러 발생 시 모달 표시
  useEffect(() => {
    if (error) {
      setErrorMessage(
        error.message || "시간표 데이터를 불러오는데 실패했습니다.",
      );
      setIsErrorModalOpen(true);
    }
  }, [error]);

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    setErrorMessage("");
  };

  const { handleCellMouseDown, handleCellMouseEnter, deleteSlot } =
    useTimeTableDrag({
      mode,
      selectedWeek,
      availableTimeSlots: timeSlotsDraft,
      onSlotsUpdate: (slots) => setTimeSlotsDraft(slots),
      setPreviewSlot: setPreviewSlot,
    });

  const slotsDisabled = Boolean(previewSlot);

  return (
    <div css={TableContainer}>
      {/* 헤더 - 최상단 날짜 */}
      <TimeTableHeader selectedWeek={displayWeek} />

      <div css={TableBody} key={weekKey}>
        {/* 시간 레이블들 - 좌측 9:00 ~ 19:00 셀 */}
        <TimeLabels />

        {/* 시간 셀들 - 빈 7 * 11개의 셀 */}
        <TimeCells
          mode={mode}
          totalHours={TIME_TABLE_CONFIG.TOTAL_HOURS}
          selectedWeek={displayWeek}
          handleCellMouseDown={
            mode === "edit" ? handleCellMouseDown : undefined
          }
          handleCellMouseEnter={
            mode === "edit" ? handleCellMouseEnter : undefined
          }
        />

        {/* 유휴시간 블록들 - TimeCell 위 블록*/}
        {!isFetching && showSlots && (
          <AvailableTimeSlots
            key={`slots-${weekKey}`}
            availableTimeData={timeSlotsDraft}
            selectedWeek={displayWeek}
            mode={mode}
            onDelete={deleteSlot}
            disabled={slotsDisabled}
          />
        )}

        {previewSlot && (
          <AvailableTimeSlot
            key={`preview-${previewSlot.rentalDate}-${previewSlot.rentalStartTime}-${previewSlot.rentalEndTime}`}
            slot={previewSlot}
            selectedWeek={displayWeek}
            variant="preview"
            mode={mode}
            disabled
          />
        )}

        {isFetching && (
          <div css={LoadingContainer}>
            <LoadingSpinner size="large" />
          </div>
        )}

        {error && (
          <Modal isOpen={isErrorModalOpen} onClose={handleCloseErrorModal}>
            <ModalContent
              type="alert"
              content={errorMessage}
              onClose={handleCloseErrorModal}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TimeTable;
