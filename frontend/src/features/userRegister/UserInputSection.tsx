import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import Input from "@/components/Input";
import { CalenderIcon, TimeIcon } from "@/assets/icons";
import AddressInput from "@/features/addressInput/AddressInput";
import RadioGroup from "@/components/RadioGroup";
import { useState } from "react";
import Button from "@/components/Button";
import Calender from "@/features/calender/Calender";
import TimePicker from "@/features/timePicker/TimePicker";

const { color } = theme;

type PopupType = "calendar" | "timePicker" | null;

const UserInputSection = () => {
  const radioGroupItem = ["소유", "미소유"];
  const [selectedState, setSelectedState] = useState("소유");

  // 팝업 상태 관리
  const [activePopup, setActivePopup] = useState<PopupType>(null);

  // 임시 상태 (나중에 실제 값으로 교체)
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 팝업 핸들러
  const handleCalendarClick = () => {
    setActivePopup(activePopup === "calendar" ? null : "calendar");
  };

  const handleTimePickerClick = () => {
    setActivePopup(activePopup === "timePicker" ? null : "timePicker");
  };

  const handleClosePopup = () => {
    setActivePopup(null);
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(calendarDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCalendarDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(calendarDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCalendarDate(nextMonth);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    // TODO 재민 - Input value 업데이트 로직 추가
    setActivePopup(null);
  };

  const handleTimeConfirm = (_time: string) => {
    // TODO 재민 - Input value 업데이트 로직 추가
    setActivePopup(null);
  };

  return (
    <div css={UserInputSectionContainer}>
      <Input label="이름" required={true} placeholder="이름을 입력해주세요" />
      <Input
        label="전화번호"
        required
        placeholder="'-'를 제외하고 숫자만 입력해주세요"
      />

      <div css={InputWithPopupContainer}>
        <Input
          label="예약날짜"
          required
          icon={<CalenderIcon fill={color.GrayScale.gray4} />}
          placeholder="날짜를 선택해주세요"
          readOnly
          onClick={handleCalendarClick}
        />
        {activePopup === "calendar" && (
          <div css={PopupContainer}>
            <Calender
              highlightType="day"
              calendarDate={calendarDate}
              selectedDate={selectedDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onDateClick={handleDateClick}
            />
          </div>
        )}
      </div>

      <AddressInput />

      <div css={InputWithPopupContainer}>
        <Input
          label="병원 도착 시간"
          required
          icon={<TimeIcon fill={color.GrayScale.gray4} />}
          placeholder="병원 도착 시간을 입력해주세요"
          readOnly
          onClick={handleTimePickerClick}
        />
        {activePopup === "timePicker" && (
          <div css={PopupContainer}>
            <TimePicker
              onCancel={handleClosePopup}
              onConfirm={handleTimeConfirm}
            />
          </div>
        )}
      </div>

      <RadioGroup
        label="보행 특이사항 (보행기구 유무)"
        group={radioGroupItem}
        selected={selectedState}
        setSelected={setSelectedState}
      />
      <Button type="submit" bgColor="gray" label="등록하기" size="big" />
    </div>
  );
};

export default UserInputSection;

const UserInputSectionContainer = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const InputWithPopupContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const PopupContainer = css`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 12px;
  z-index: 10;
  background-color: ${color.GrayScale.white};
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);

  /* 애니메이션 효과 */
  animation: popupSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: top;

  @keyframes popupSlideIn {
    0% {
      opacity: 0;
      transform: translateY(-8px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;
