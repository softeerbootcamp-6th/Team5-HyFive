import { css } from "@emotion/react";
import { useReducer } from "react";
import { useForm, Controller } from "react-hook-form";
import { theme } from "@/styles/themes.style";
import Input from "@/components/Input";
import Button from "@/components/Button";
import RadioGroup from "@/components/RadioGroup";
import { CalenderIcon, TimeIcon } from "@/assets/icons";
import AddressInput from "@/features/addressInput/AddressInput";
import {
  validateName,
  validatePhone,
  validateDate,
  formatTimeDisplay,
  formatPhone,
  validateTime,
} from "@/utils/UserValidation";
import {
  calenderReducer,
  initialState,
} from "@/features/calender/CalenderReducer";
import { formatDateToYYMMDD } from "@/features/calender/Calender.util";
import type { UserFormData } from "@/features/userRegister/UserRegister.types";
import { usePostUserRegister } from "@/apis/UserRegisterAPI";
import { usePopupManager } from "@/features/userRegister/usePopupManager";
import { useModalManager } from "@/features/userRegister/useModalManager";

const { color } = theme;

const UserInputSection = () => {
  const radioGroupItem = ["소유", "미소유"];
  const [state, dispatch] = useReducer(calenderReducer, initialState);

  const {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
    isError,
    reset: resetMutation,
  } = usePostUserRegister();

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
  };

  const handleTimeConfirm = (time: string) => {
    setValue("hospitalTime", time);
    void trigger("hospitalTime");
  };

  // 팝업 관리 훅
  const { dateInputRef, timeInputRef, openPopup, renderPopupPortal } =
    usePopupManager({
      onCalendarConfirm: handleCalendarConfirm,
      onTimeConfirm: handleTimeConfirm,
      state,
      handleMonthChange,
      handleDateClick,
    });

  // 모달 관리 훅
  const { openModal, renderModal } = useModalManager({
    isPending,
    isSuccess,
    isError,
    data,
    error: error as Error | null,
    resetMutation,
  });

  const onSubmitForm = (formData: UserFormData) => {
    const formattedData = {
      ...formData,
      bookTel: formatPhone(formData.bookTel),
    };

    openModal();
    mutate(formattedData);
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
      <form onSubmit={handleSubmit(onSubmitForm)}>
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
                  onFocus={() => openPopup("calendar")}
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
                validate: (value) => validateTime(value) || true,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="병원 도착 시간"
                  required
                  icon={<TimeIcon fill={color.GrayScale.gray4} />}
                  placeholder="병원 도착 시간을 입력해주세요"
                  readOnly
                  onFocus={() => openPopup("timePicker")}
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

      {renderModal()}
    </>
  );
};

export default UserInputSection;

const UserInputSectionContainer = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
