import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { getYearMonth } from "./Calander.util.ts";
import CalanderHeader from "@/features/calander/CalanderHeader.tsx";
import Calander from "@/features/calander/Calander.tsx";
import { theme } from "@/styles/themes.style";

describe("CalanderHeader 컴포넌트", () => {
  it("props로 받은 날짜에 해당하는 연도와 월을 표시한다.", () => {
    const testDate = new Date();
    render(
      <CalanderHeader
        date={testDate}
        onClickPrev={() => {}}
        onClickNext={() => {}}
      />,
    );
    expect(screen.getByText(getYearMonth(testDate))).toBeInTheDocument();
  });
});

describe("Calander 컴포넌트", () => {
  it("좌우 버튼을 클릭하면 연도와 월이 변경된다.", async () => {
    const user = userEvent.setup();
    const fixedDate = new Date("2025-08-01T00:00:00");
    vi.setSystemTime(fixedDate);

    render(<Calander />);

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

    render(<Calander />);

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

    render(<Calander />);

    expect(screen.getByText("2025년 8월")).toBeInTheDocument();

    // 예: 7월 31일이 포함되어 있다고 가정하고 해당 날짜를 클릭
    await user.click(screen.getByTestId("day-2025-7-31"));

    expect(screen.getByText("2025년 7월")).toBeInTheDocument();
  });

  it("hilightType === day 라면 오늘 날짜는 강조 스타일이 적용된다.", () => {
    const fixedDate = new Date("2025-08-01T00:00:00");
    vi.setSystemTime(fixedDate);

    render(<Calander highlightType="day" />);

    const todayCell = screen.getByTestId("day-2025-8-1");
    expect(todayCell).toHaveStyle(`color: ${theme.color.Maincolor.primary};`);
  });

  it("현재 월이 아닌 날짜는 흐리게 표시된다.", () => {
    const fixedDate = new Date("2025-08-01");
    vi.setSystemTime(fixedDate);

    render(<Calander />);

    const prevMonthDay = screen.getByTestId("day-2025-7-31");
    expect(prevMonthDay).toHaveStyle(`color: ${theme.color.GrayScale.gray3};`);
  });

  it("highlightType === week 이라면 날짜를 클릭했을 때 해당 주에 배경 강조 스타일이 적용된다.", async () => {
    const user = userEvent.setup();
    const fixedDate = new Date("2025-08-01T00:00:00");
    vi.setSystemTime(fixedDate);

    render(<Calander highlightType="week" />);

    const targetDay = screen.getByTestId("day-2025-8-3");
    await user.click(targetDay);
    const weekSection = targetDay.closest("div[data-testid^='week-']");
    expect(weekSection).toHaveStyle(
      `background-color: ${theme.color.GrayScale.gray2};`,
    );
  });
});
