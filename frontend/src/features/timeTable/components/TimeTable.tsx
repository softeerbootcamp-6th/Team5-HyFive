import { useCallback, useEffect, useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

// 컴포넌트
import {
  AvailableTimeSlots,
  TimeTableHeader,
  TimeLabels,
  TimeCells,
  AvailableTimeSlot,
} from "./index";
import ActionButtonGroup from "@/features/timeTable/components/ActionButtonGroup";
import LoadingSpinner from "@/components/LoadingSpinner";
import ModalContent from "@/components/ModalContent";
import Modal from "@/components/Modal";

// 스타일
import {
  TableContainer,
  TableBody,
  LoadingContainer,
  TimeTableWrapper,
} from "../TimeTable.style";

// 타입
import type {
  AvailableTimeSlotType,
  TimeTableProps,
} from "@/features/timeTable/TimeTable.type";
import type { TimeSlotAPIResponse } from "@/apis/TimeTableAPI";

// API, 훅
import {
  timeSlotQueryKey,
  useGetTimeSlot,
  usePostTimeSlot,
} from "@/apis/TimeTableAPI";
import { useTimeTableDrag } from "@/features/timeTable/hooks/useTimeTableDrag";

// 상수, 유틸
import { TIME_TABLE_CONFIG } from "@/features/timeTable/TimeTable.constants";
import { formatDateToYYMMDD } from "@/features/calender/Calender.util";

const TimeTable = ({
  selectedCarId,
  selectedWeek,
  mode,
  showActionButtons = false,
  isEditableWeek = false,
  isEditMode = false,
  onEditModeChange = () => {},
}: TimeTableProps) => {
  // Display 관련 상태
  const [displayWeek, setDisplayWeek] = useState(selectedWeek);
  const [showSlots, setShowSlots] = useState(true);

  // TimeSlot 관련 상태
  const [timeSlotsDraft, setTimeSlotsDraft] = useState<AvailableTimeSlotType[]>(
    [],
  );
  const [previewSlot, setPreviewSlot] = useState<AvailableTimeSlotType | null>(
    null,
  );

  const weekKey = useMemo(() => {
    return formatDateToYYMMDD(displayWeek[0]);
  }, [displayWeek]);

  const nextWeekKey = useMemo(() => {
    return formatDateToYYMMDD(selectedWeek[0]);
  }, [selectedWeek]);

  const queryKey = useMemo(
    () => timeSlotQueryKey(selectedCarId, nextWeekKey),
    [selectedCarId, nextWeekKey],
  );

  const slotsDisabled = Boolean(previewSlot);

  const queryClient = useQueryClient();
  const { createTimeSlot, error: postError } = usePostTimeSlot();
  const {
    timeSlotData,
    isFetching,
    error: fetchError,
    refetch,
  } = useGetTimeSlot(selectedCarId, nextWeekKey);

  // Error 관련 상태
  const activeError = postError ?? fetchError;
  const errorMessage =
    (activeError instanceof Error
      ? activeError.message
      : String(activeError)) || "시간표 데이터를 불러오는데 실패했습니다.";

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (activeError) setIsModalOpen(true);
  }, [activeError]);

  const { handleCellMouseDown, handleCellMouseEnter, deleteSlot } =
    useTimeTableDrag({
      mode,
      selectedWeek,
      availableTimeSlots: timeSlotsDraft,
      onSlotsUpdate: (slots) => setTimeSlotsDraft(slots),
      setPreviewSlot: setPreviewSlot,
    });

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

  const handleCancelClick = useCallback(() => {
    const cachedSlotData =
      queryClient.getQueryData<TimeSlotAPIResponse>(queryKey);
    const originalSlotData = cachedSlotData?.data ?? [];

    setShowSlots(false);
    setPreviewSlot(null);
    setTimeSlotsDraft(originalSlotData);
    requestAnimationFrame(() => setShowSlots(true));

    onEditModeChange(false);
  }, [queryClient, queryKey, onEditModeChange]);

  // 날짜, 차량 변경 시 편집 모드 해제
  useEffect(() => {
    handleCancelClick();
  }, [selectedWeek, selectedCarId, handleCancelClick]);

  const handleSaveClick = () => {
    createTimeSlot({
      selectedCarId,
      weekKey,
      timeSlots: timeSlotsDraft,
    });
    void refetch();
    onEditModeChange(false);
  };

  return (
    <div css={TimeTableWrapper}>
      {showActionButtons && (
        <ActionButtonGroup
          isEditableWeek={isEditableWeek}
          isEditMode={isEditMode}
          onEditModeChange={onEditModeChange}
          onCancelClick={handleCancelClick}
          onSaveClick={handleSaveClick}
        />
      )}
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

          {(postError || fetchError) && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ModalContent
                type="alert"
                content={errorMessage}
                onClose={() => setIsModalOpen(false)}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
