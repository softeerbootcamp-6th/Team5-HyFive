import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TimeTable from "./components/TimeTable";
import { getWeekRange } from "@/features/calender/Calender.util";
import type { TimeTableProps } from "@/features/timeTable/TimeTable.type";
import { format } from "date-fns";
import type { AvailableTimeSlot } from "@/mocks/timeBlockMocks";
import { isAllSlotsInSelectedWeek } from "@/features/timeTable/TimeTable.util";

const testData: TimeTableProps = {
  selectedCarId: 1,
  selectedWeek: getWeekRange(new Date("2025-08-13")),
  mode: "view",
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

export const mockSelectedWeek: Date[] = [
  new Date("2025-08-10"), // 일요일
  new Date("2025-08-11"), // 월요일
  new Date("2025-08-12"), // 화요일
  new Date("2025-08-13"), // 수요일
  new Date("2025-08-14"), // 목요일
  new Date("2025-08-15"), // 금요일
  new Date("2025-08-16"), // 토요일
];
const mockTimeSlotData: AvailableTimeSlot[] = [
  {
    rentalDate: format(new Date("2025-08-10"), "yyyy-MM-dd"), // 일요일
    rentalStartTime: "10:00",
    rentalEndTime: "15:00",
  },
  {
    rentalDate: format(new Date("2025-08-11"), "yyyy-MM-dd"), // 월요일
    rentalStartTime: "09:00",
    rentalEndTime: "12:00",
  },
  {
    rentalDate: format(new Date("2025-08-11"), "yyyy-MM-dd"), // 월요일
    rentalStartTime: "14:00",
    rentalEndTime: "18:00",
  },
  {
    rentalDate: format(new Date("2025-08-12"), "yyyy-MM-dd"), // 화요일
    rentalStartTime: "10:00",
    rentalEndTime: "16:00",
  },
  {
    rentalDate: format(new Date("2025-08-13"), "yyyy-MM-dd"), // 수요일
    rentalStartTime: "11:00",
    rentalEndTime: "13:00",
  },
  {
    rentalDate: format(new Date("2025-08-13"), "yyyy-MM-dd"), // 수요일
    rentalStartTime: "15:00",
    rentalEndTime: "19:00",
  },
  {
    rentalDate: format(new Date("2025-08-14"), "yyyy-MM-dd"), // 목요일
    rentalStartTime: "09:00",
    rentalEndTime: "11:00",
  },
];

describe("TimeTable.util.ts", () => {
  it("isAllSlotsInSelectedWeek 함수가 모든 슬롯이 선택된 주에 포함되는지 확인한다.", () => {
    const result = isAllSlotsInSelectedWeek(mockTimeSlotData, mockSelectedWeek);
    expect(result).toBe(true);
  });

  it("isAllSlotsInSelectedWeek 함수가 일부 슬롯이 선택된 주에 포함되지 않으면 false를 반환한다.", () => {
    const invalidSlots: AvailableTimeSlot[] = [
      {
        rentalDate: format(new Date("2025-08-14"), "yyyy-MM-dd"), // 목요일
        rentalStartTime: "09:00",
        rentalEndTime: "11:00",
      },
      {
        rentalDate: "2025-08-17", // 토요일, 선택된 주에 없음
        rentalStartTime: "10:00",
        rentalEndTime: "12:00",
      },
    ];
    const result = isAllSlotsInSelectedWeek(invalidSlots, mockSelectedWeek);
    expect(result).toBe(false);
  });
});
