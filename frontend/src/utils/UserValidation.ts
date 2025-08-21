import { formatTimeToHHMM } from "@/features/calender/Calender.util";

export const validateName = (value: string): string | null => {
  if (!value) return "이름을 입력해주세요";
  if (value.length < 2 || value.length > 10)
    return "이름은 2-10자 사이로 입력해주세요";
  if (!/^[가-힣]+$/.test(value)) return "한글만 입력 가능합니다";
  return null;
};

export const validatePhone = (value: string): string | null => {
  if (!value) return "전화번호를 입력해주세요";
  const numbers = value.replace(/\D/g, "");
  if (numbers.length !== 11) return "11자리 숫자를 입력해주세요";
  return null;
};

export const validateDate = (value: string): string | null => {
  if (!value) return "예약 날짜를 선택해주세요";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(value);
  if (selectedDate < today) return "오늘 이후 날짜를 선택해주세요";
  return null;
};

export const validateTime = (hour: string, minute: string): string | null => {
  if (!hour || !minute) return "시간을 입력해주세요";
  const h = parseInt(hour);
  const m = parseInt(minute);
  if (h < 1 || h > 12) return "시간은 1-12 사이로 입력해주세요";
  if (m < 0 || m > 59) return "분은 0-59 사이로 입력해주세요";
  return null;
};

// TimePicker 전용 유효성 검사 함수들
export const validateHour = (hour: string): string | null => {
  if (!hour && hour !== "0") return "시간을 입력해주세요";
  const h = parseInt(hour);
  if (isNaN(h)) return "숫자를 입력해주세요";
  if (h < 0 || h > 12) return "시간은 0-12 사이로 입력해주세요";
  return null;
};

export const validateMinute = (minute: string): string | null => {
  if (!minute && minute !== "0") return "분을 입력해주세요";
  const m = parseInt(minute);
  if (isNaN(m)) return "숫자를 입력해주세요";
  if (m < 0 || m > 59) return "분은 0-59 사이로 입력해주세요";
  return null;
};

export const validateTimePicker = (
  hour: string,
  minute: string,
): string | null => {
  const hourError = validateHour(hour);
  if (hourError) return hourError;

  const minuteError = validateMinute(minute);
  if (minuteError) return minuteError;

  return null;
};

export const validateAddress = (
  departure: string,
  destination: string,
): string | null => {
  if (!departure) return "출발지를 선택해주세요";
  if (!destination) return "도착지를 선택해주세요";
  if (departure === destination) return "출발지와 도착지가 같을 수 없습니다";
  return null;
};

// 포맷팅 유틸리티
export const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};

export const formatTime24Hour = (
  hour: string,
  minute: string,
  meridiem: string,
): string => {
  let h = parseInt(hour);
  const m = parseInt(minute);

  // 12시간 형식을 24시간 형식으로 변환
  if (meridiem === "AM") {
    h = h === 12 ? 0 : h; // 12 AM = 0시
  } else {
    h = h === 12 ? 12 : h + 12; // 12 PM = 12시, 나머지는 +12
  }

  return formatTimeToHHMM(h, m);
};

export const formatTimeDisplay = (time24: string): string => {
  if (!time24) return "";

  const [hourStr, minuteStr] = time24.split(":");
  const hour = parseInt(hourStr);

  const meridiem = hour < 12 ? "AM" : "PM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

  return `${displayHour}:${minuteStr} ${meridiem}`;
};
