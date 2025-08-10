import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TimeTable from "./TimeTable";
import { addDays, startOfWeek } from "date-fns";

const testData = {
  selectedCarId: 1,
  selectedWeek: Array.from({ length: 7 }, (_, i) => {
    const startOfCurrentWeek = startOfWeek(new Date("2025-08-13"), {
      weekStartsOn: 0,
    });
    return addDays(startOfCurrentWeek, i);
  }),
};

describe("TimeTable 컴포넌트", () => {
  beforeEach(() => {
    render(<TimeTable {...testData} />);
  });

  test("9시부터 19시까지의 시간이 렌더링된다.", () => {
    for (let hour = 9; hour <= 19; hour++) {
      const timeLabel = screen.getByText(`${hour}:00`);
      expect(timeLabel).toBeInTheDocument();
    }
  });

  test("11개 시간 레이블이 렌더링된다.", () => {
    const timeLabels = screen.getAllByText(/\d{1,2}:00/);
    expect(timeLabels).toHaveLength(11);
  });

  test("범위 밖의 시간은 렌더링되지 않는다.", () => {
    expect(screen.queryByText("8:00")).not.toBeInTheDocument();
    expect(screen.queryByText("20:00")).not.toBeInTheDocument();
    expect(screen.queryByText("7:00")).not.toBeInTheDocument();
    expect(screen.queryByText("21:00")).not.toBeInTheDocument();
  });

  test("props로 전달된 날짜가 올바르게 렌더링된다.", () => {
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
