import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { useReducer } from "react";
import { getYearMonth } from "./Calender.util.ts";
import CalenderHeader from "@/features/calender/CalenderHeader.tsx";
import Calender from "@/features/calender/Calender.tsx";
import {
  calenderReducer,
  initialState,
} from "@/features/calender/CalenderReducer";
import { theme } from "@/styles/themes.style";

// 테스트용 래퍼 컴포넌트 - 리듀서 로직을 내부에서 처리
interface TestCalenderProps {
  highlightType?: "day" | "week";
  handleClickDate?: (date: Date) => void;
  initialDate?: Date;
}

const TestCalender = ({
  highlightType = "day",
  handleClickDate = () => {},
  initialDate = new Date(),
}: TestCalenderProps) => {
  const testInitialState = {
    ...initialState,
    calendarDate: initialDate,
    selectedDate: initialDate,
  };
  const [state, dispatch] = useReducer(calenderReducer, testInitialState);

  const handleMonthChange = (direction: "next" | "prev") => {
    dispatch({
      type: "CHANGE_MONTH",
      payload: state.calendarDate,
      direction: direction,
    });
  };

  const handleDateClick = (date: Date) => {
    dispatch({ type: "SELECT_DATE", payload: date });
    handleClickDate(date);
  };

  return (
    <Calender
      highlightType={highlightType}
      calendarDate={state.calendarDate}
      selectedDate={state.selectedDate}
      onPrevMonth={() => handleMonthChange("prev")}
      onNextMonth={() => handleMonthChange("next")}
      onDateClick={handleDateClick}
    />
  );
};

describe("CalenderHeader 컴포넌트", () => {
  it("props로 받은 날짜에 해당하는 연도와 월을 표시한다.", () => {
    const testDate = new Date();
    render(
      <CalenderHeader
        calendarDate={testDate}
        onClickPrev={() => {}}
        onClickNext={() => {}}
      />,
    );
    expect(screen.getByText(getYearMonth(testDate))).toBeInTheDocument();
  });
});

describe("Calender 컴포넌트", () => {
  it("좌우 버튼을 클릭하면 연도와 월이 변경된다.", async () => {
    const user = userEvent.setup();
    const fixedDate = new Date("2025-08-01T00:00:00");
    vi.setSystemTime(fixedDate);

    render(<TestCalender initialDate={fixedDate} />);

    // 1. 초기 렌더링: 2025년 8월
    expect(screen.getByText("2025년 8월")).toBeInTheDocument();

    // 2. "이전 달" 버튼 클릭: 2025년 7월
    await user.click(screen.getByRole("button", { name: /이전/i }));
    expect(screen.getByText("2025년 7월")).toBeInTheDocument();

    // 3. "다음 달" 버튼 클릭: 다시 2025년 8월
    await user.click(screen.getByRole("button", { name: /다음/i }));
    expect(screen.getByText("2025년 8월")).toBeInTheDocument();
  });

  it("12월에서 추가 / 1월에서 감소하면 연도가 변경된다.", async () => {
    const user = userEvent.setup();
    const fixedDate = new Date("2025-01-01T00:00:00");
    vi.setSystemTime(fixedDate);

    render(<TestCalender initialDate={fixedDate} />);

    // 2025년 1월에서 "이전 달" 버튼 클릭: 2024년 12월
    await user.click(screen.getByRole("button", { name: /이전/i }));
    expect(screen.getByText("2024년 12월")).toBeInTheDocument();

    // 2024년 12월에서 "다음 달" 버튼 클릭: 2025년 1월
    await user.click(screen.getByRole("button", { name: /다음/i }));
    expect(screen.getByText("2025년 1월")).toBeInTheDocument();
  });

  it("헤더의 월이 아닌 날짜를 클릭하면 currentDate가 변경된다.", async () => {
    const user = userEvent.setup();
    // 시스템 시간을 2025년 8월 1일로 고정
    const fixedDate = new Date("2025-08-01T00:00:00");
    vi.setSystemTime(fixedDate);

    render(<TestCalender initialDate={fixedDate} />);

    expect(screen.getByText("2025년 8월")).toBeInTheDocument();

    // 1. 이전 달 날짜 클릭 (예: 7월 31일)
    await user.click(screen.getByTestId("day-2025-7-31"));
    expect(screen.getByText("2025년 7월")).toBeInTheDocument();

    // 2. 다음 달 날짜 클릭 (예: 8월 1일)
    await user.click(screen.getByTestId("day-2025-8-1"));
    expect(screen.getByText("2025년 8월")).toBeInTheDocument();
  });

  it("8월 31일에서 다음 달을 클릭하면 9월 1일로 이동한다.", async () => {
    const user = userEvent.setup();
    // 시스템 시간을 2025년 8월 15일로 고정
    const fixedDate = new Date("2025-08-15T00:00:00");
    vi.setSystemTime(fixedDate);

    render(<TestCalender highlightType="week" initialDate={fixedDate} />);

    // 1. 8월 31일 클릭
    await user.click(screen.getByTestId("day-2025-8-31"));
    expect(screen.getByText("2025년 8월")).toBeInTheDocument();

    // 2. 다음 달 버튼 클릭
    await user.click(screen.getByRole("button", { name: /다음/i }));

    // 3. 현재 날짜가 9월 1일로 변경됨
    expect(screen.getByText("2025년 9월")).toBeInTheDocument();
  });

  it("오늘 날짜는 다른 색상이 적용된다.", () => {
    const mockToday = new Date("2025-08-10T00:00:00");
    vi.setSystemTime(mockToday);

    render(<TestCalender highlightType="week" initialDate={mockToday} />);

    const todayCell = screen.getByTestId("day-2025-8-10");
    expect(todayCell).toHaveStyle(`color: ${theme.color.Maincolor.primary}`);

    vi.useRealTimers();
  });

  it("현재 월이 아닌 날짜는 흐리게 표시된다.", () => {
    const fixedDate = new Date("2025-08-01");
    vi.setSystemTime(fixedDate);

    render(<TestCalender initialDate={fixedDate} />);

    const prevMonthDay = screen.getByTestId("day-2025-7-31");
    expect(prevMonthDay).toHaveStyle(`color: ${theme.color.GrayScale.gray3};`);
  });

  it("highlightType === week 이라면 날짜를 클릭했을 때 해당 주에 배경 강조 스타일이 적용된다.", async () => {
    const user = userEvent.setup();
    const fixedDate = new Date("2025-08-01T00:00:00");
    vi.setSystemTime(fixedDate);

    render(<TestCalender highlightType="week" initialDate={fixedDate} />);

    const targetDay = screen.getByTestId("day-2025-8-3");
    await user.click(targetDay);
    const weekSection = targetDay.closest("div[data-testid^='week-']");
    expect(weekSection).toHaveStyle(
      `background-color: ${theme.color.GrayScale.gray2};`,
    );
  });
});
