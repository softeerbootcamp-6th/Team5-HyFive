import {
  TableContainer,
  TableBody,
  LoadingContainer,
} from "../TimeTable.style";
import type {
  AvailableTimeSlotType,
  TimeTableProps,
} from "@/features/timeTable/TimeTable.type";

import { useEffect, useState } from "react";
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

const TimeTable = ({ selectedCarId, selectedWeek, mode }: TimeTableProps) => {
  const { timeSlotData, isFetching, error } = useGetTimeSlot(
    selectedCarId,
    selectedWeek,
  );

  // draft 상태는 편집 모드에서만 사용 (수정/취소/저장을 위한 상태)
  const [timeSlotsDraft, setTimeSlotsDraft] = useState<AvailableTimeSlotType[]>(
    [],
  );

  const [previewSlot, setPreviewSlot] = useState<AvailableTimeSlotType | null>(
    null,
  );

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    setTimeSlotsDraft([]);
    setPreviewSlot(null);
  }, [selectedCarId, selectedWeek]);

  // 새로운 데이터가 로드되면 draft 상태 초기화
  useEffect(() => {
    if (timeSlotData) {
      setTimeSlotsDraft(timeSlotData);
      setPreviewSlot(null);
    }
  }, [timeSlotData]);

  // 에러 발생 시 모달 열기
  useEffect(() => {
    if (error) {
      setIsErrorModalOpen(true);
    }
  }, [error]);

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
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
      <TimeTableHeader selectedWeek={selectedWeek} />

      <div css={TableBody}>
        {/* 시간 레이블들 - 좌측 9:00 ~ 19:00 셀 */}
        <TimeLabels />

        {/* 시간 셀들 - 빈 7 * 11개의 셀 */}
        <TimeCells
          mode={mode}
          totalHours={TIME_TABLE_CONFIG.TOTAL_HOURS}
          selectedWeek={selectedWeek}
          handleCellMouseDown={
            mode === "edit" ? handleCellMouseDown : undefined
          }
          handleCellMouseEnter={
            mode === "edit" ? handleCellMouseEnter : undefined
          }
        />

        {/* 유휴시간 블록들 - TimeCell 위 블록*/}
        <AvailableTimeSlots
          availableTimeData={timeSlotsDraft}
          selectedWeek={selectedWeek}
          mode={mode}
          onDelete={deleteSlot}
          disabled={slotsDisabled}
        />

        {previewSlot && (
          <AvailableTimeSlot
            key={`preview-${previewSlot.rentalDate}-${previewSlot.rentalStartTime}-${previewSlot.rentalEndTime}`}
            slot={previewSlot}
            selectedWeek={selectedWeek}
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
              content={
                error.message || "시간표 데이터를 불러오는데 실패했습니다."
              }
              onClose={handleCloseErrorModal}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TimeTable;
