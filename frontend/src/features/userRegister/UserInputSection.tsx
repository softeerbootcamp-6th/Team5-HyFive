import { css } from "@emotion/react";
import { useState, useReducer, useRef } from "react";
import { createPortal } from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { theme } from "@/styles/themes.style";
import Input from "@/components/Input";
import Button from "@/components/Button";
import RadioGroup from "@/components/RadioGroup";
import { CalenderIcon, TimeIcon } from "@/assets/icons";
import AddressInput from "@/features/addressInput/AddressInput";
import Calender from "@/features/calender/Calender";
import TimePicker from "@/features/timePicker/TimePicker";
import {
  validateName,
  validatePhone,
  validateDate,
  formatTimeDisplay,
  formatPhone,
} from "@/utils/UserValidation";
import {
  calenderReducer,
  initialState,
} from "@/features/calender/CalenderReducer";
import { formatDateToYYMMDD } from "@/features/calender/Calender.util";

const { color } = theme;

interface UserFormData {
  bookName: string;
  bookTel: string;
  hospitalDate: string;
  hospitalTime: string;
  startAddr: string;
  endAddr: string;
  walker: boolean;
}

type PopupType = "calendar" | "timePicker" | null;

const UserInputSection = () => {
  const radioGroupItem = ["소유", "미소유"];

  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const [state, dispatch] = useReducer(calenderReducer, initialState);

  // Input 컨테이너 refs
  const dateInputRef = useRef<HTMLDivElement>(null);
  const timeInputRef = useRef<HTMLDivElement>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    trigger,
  } = useForm<UserFormData>({
    mode: "onChange",
    defaultValues: {
      bookName: "",
      bookTel: "",
      hospitalDate: "",
      hospitalTime: "",
      startAddr: "",
      endAddr: "",
      walker: true,
    },
  });

  // 폼 제출 핸들러
  const onSubmit = (formData: UserFormData) => {
    const formattedData = {
      ...formData,
      bookTel: formatPhone(formData.bookTel),
    };

    alert(`폼 제출: ${JSON.stringify(formattedData)}`);
  };

  // 팝업 관련 핸들러들
  const closePopup = () => setActivePopup(null);

  // Portal을 위한 DOM 요소 찾기
  const portalTarget = document.getElementById("admin-portal");

  // Portal 팝업 렌더링 함수
  const renderPopupPortal = () => {
    if (!activePopup || !portalTarget) return null;

    // 해당 Input의 위치 계산
    const inputRef = activePopup === "calendar" ? dateInputRef : timeInputRef;
    const inputElement = inputRef.current;

    if (!inputElement) return null;

    const rect = inputElement.getBoundingClientRect();
    const popupRight = rect.right - rect.width;
    const popupTop = rect.bottom + rect.height * 0.2;

    const popupContent =
      activePopup === "calendar" ? (
        <Calender
          highlightType="day"
          calendarDate={state.calendarDate}
          selectedDate={state.selectedDate}
          onPrevMonth={() => handleMonthChange("prev")}
          onNextMonth={() => handleMonthChange("next")}
          onDateClick={handleDateClick}
          isPopup={true}
          onCancel={closePopup}
          onConfirm={handleCalendarConfirm}
        />
      ) : (
        <TimePicker onCancel={closePopup} onConfirm={handleTimeConfirm} />
      );

    return createPortal(
      <div css={PortalOverlay} onClick={closePopup}>
        <div
          css={PortalContent}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            top: popupTop,
            left: popupRight,
          }}
        >
          {popupContent}
        </div>
      </div>,
      portalTarget,
    );
  };

  // 캘린더 관련 핸들러들
  const handleMonthChange = (direction: "next" | "prev") => {
    dispatch({
      type: "CHANGE_MONTH",
      payload: state.calendarDate,
      direction: direction,
    });
  };

  const handleDateClick = (date: Date) => {
    dispatch({ type: "SELECT_DATE", payload: date });
  };

  const handleCalendarConfirm = (date: Date | null) => {
    if (date) {
      const formattedDate = formatDateToYYMMDD(date);
      setValue("hospitalDate", formattedDate);
      void trigger("hospitalDate");
    }
    closePopup();
  };

  // 시간 선택 핸들러
  const handleTimeConfirm = (time: string) => {
    setValue("hospitalTime", time);
    void trigger("hospitalTime");
    closePopup();
  };

  // 보행기구 변경 핸들러
  const handleWalkerChange = (value: string) => {
    setValue("walker", value === "소유");
  };

  // 주소 변경 핸들러들
  const handleDepartureChange = (address: string) => {
    setValue("startAddr", address);
    void trigger("startAddr");
  };

  const handleDestinationChange = (address: string) => {
    setValue("endAddr", address);
    void trigger("endAddr");
  };

  const startAddrValue = watch("startAddr") || "";
  const endAddrValue = watch("endAddr") || "";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div css={UserInputSectionContainer}>
          {/* 이름 입력 */}
          <Controller
            name="bookName"
            control={control}
            rules={{
              validate: (value) => validateName(value) || true,
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="이름"
                required
                placeholder="이름을 입력해주세요"
                errorMessage={errors.bookName?.message}
              />
            )}
          />

          {/* 전화번호 입력 */}
          <Controller
            name="bookTel"
            control={control}
            rules={{
              validate: (value) => validatePhone(value) || true,
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="전화번호"
                required
                placeholder="'-'를 제외하고 숫자만 입력해주세요"
                errorMessage={errors.bookTel?.message}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  field.onChange(value);
                }}
              />
            )}
          />

          {/* 예약날짜 입력 */}
          <div ref={dateInputRef}>
            <Controller
              name="hospitalDate"
              control={control}
              rules={{
                validate: (value) => validateDate(value) || true,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="예약날짜"
                  required
                  icon={<CalenderIcon fill={color.GrayScale.gray4} />}
                  placeholder="날짜를 선택해주세요"
                  readOnly
                  onFocus={() => setActivePopup("calendar")}
                  errorMessage={errors.hospitalDate?.message}
                  value={field.value || ""}
                />
              )}
            />
          </div>

          {/* 주소 입력 */}
          <AddressInput
            onDepartureChange={handleDepartureChange}
            onDestinationChange={handleDestinationChange}
            departureValue={startAddrValue}
            destinationValue={endAddrValue}
          />

          {/* 도착 시간 입력 */}
          <div ref={timeInputRef}>
            <Controller
              name="hospitalTime"
              control={control}
              rules={{
                required: "병원 도착 시간을 선택해주세요",
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="병원 도착 시간"
                  required
                  icon={<TimeIcon fill={color.GrayScale.gray4} />}
                  placeholder="병원 도착 시간을 입력해주세요"
                  readOnly
                  onFocus={() => setActivePopup("timePicker")}
                  errorMessage={errors.hospitalTime?.message}
                  value={field.value ? formatTimeDisplay(field.value) : ""}
                />
              )}
            />
          </div>

          {/* 보행기구 유무 */}
          <Controller
            name="walker"
            control={control}
            render={({ field }) => (
              <RadioGroup
                label="보행 특이사항 (보행기구 유무)"
                group={radioGroupItem}
                selected={field.value ? "소유" : "미소유"}
                setSelected={handleWalkerChange}
              />
            )}
          />

          {/* 제출 버튼 */}
          <Button
            type="submit"
            bgColor={isValid ? "orange" : "gray"}
            label="등록하기"
            size="big"
            disabled={!isValid}
          />
        </div>
      </form>

      {/* Portal로 렌더링되는 팝업 */}
      {renderPopupPortal()}
    </>
  );
};

export default UserInputSection;

const UserInputSectionContainer = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const PortalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 1000;
`;

const PortalContent = css`
  background-color: ${color.GrayScale.white};
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;

  /* 애니메이션 효과 */
  animation: contentSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes contentSlideIn {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;
