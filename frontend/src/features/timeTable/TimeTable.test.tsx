import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TimeTable from "./components/TimeTable";
import { getWeekRange } from "@/features/calender/Calender.util";

const testData = {
  selectedCarId: 1,
  selectedWeek: getWeekRange(new Date("2025-08-13")),
};

describe("TimeTable 컴포넌트", () => {
  beforeEach(() => {
    render(<TimeTable {...testData} />);
  });

  it("9시부터 19시까지의 시간이 렌더링된다.", () => {
    for (let hour = 9; hour <= 19; hour++) {
      const timeLabel = screen.getByText(`${hour}:00`);
      expect(timeLabel).toBeInTheDocument();
    }
  });

  it("9시부터 19시까지 11개 시간 레이블이 렌더링된다.", () => {
    const timeLabels = screen.getAllByTestId("time-label");
    expect(timeLabels).toHaveLength(11);
  });

  it("범위 밖의 시간은 렌더링되지 않는다.", () => {
    expect(screen.queryByText("7:00")).not.toBeInTheDocument();
    expect(screen.queryByText("8:00")).not.toBeInTheDocument();
    expect(screen.queryByText("20:00")).not.toBeInTheDocument();
    expect(screen.queryByText("21:00")).not.toBeInTheDocument();
  });

  it("props로 전달된 날짜가 올바르게 렌더링된다.", () => {
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("13")).toBeInTheDocument();
    expect(screen.getByText("14")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("16")).toBeInTheDocument();

    expect(screen.queryByText("17")).not.toBeInTheDocument();
  });
});
