import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import TimeTable from "./components/TimeTable";
import { getWeekRange } from "@/features/calender/Calender.util";
import type { TimeTableProps } from "@/features/timeTable/TimeTable.type";
import { format } from "date-fns";
import type { AvailableTimeSlot } from "@/mocks/timeBlockMocks";
import { isAllSlotsInSelectedWeek } from "@/features/timeTable/utils/TimeTable.util";

// API 모킹
vi.mock("@/apis/TimeTableAPI", () => ({
  useGetTimeSlot: vi.fn(),
}));

import { useGetTimeSlot } from "@/apis/TimeTableAPI";

const mockUseGetTimeSlot = vi.mocked(useGetTimeSlot);

const testData: TimeTableProps = {
  selectedCarId: 1,
  selectedWeek: getWeekRange(new Date("2025-08-13")),
  mode: "view",
};

const mockTimeSlotAPIData = [
  {
    id: 1,
    carId: 1,
    rentalDate: "2025-08-10",
    rentalStartTime: "10:00",
    rentalEndTime: "15:00",
  },
  {
    id: 2,
    carId: 1,
    rentalDate: "2025-08-11",
    rentalStartTime: "09:00",
    rentalEndTime: "12:00",
  },
  {
    id: 3,
    carId: 1,
    rentalDate: "2025-08-11",
    rentalStartTime: "14:00",
    rentalEndTime: "18:00",
  },
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  );
};

describe("TimeTable 컴포넌트", () => {
  beforeEach(() => {
    // API 모킹 - 성공 케이스
    mockUseGetTimeSlot.mockReturnValue({
      timeSlotData: mockTimeSlotAPIData,
      isFetching: false,
      error: null,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("9시부터 19시까지의 시간이 렌더링된다.", async () => {
    renderWithQueryClient(<TimeTable {...testData} />);

    for (let hour = 9; hour <= 19; hour++) {
      const timeLabel = screen.getByText(`${hour}:00`);
      expect(timeLabel).toBeInTheDocument();
    }
  });

  it("9시부터 19시까지 11개 시간 레이블이 렌더링된다.", async () => {
    renderWithQueryClient(<TimeTable {...testData} />);

    const timeLabels = screen.getAllByTestId("time-label");
    expect(timeLabels).toHaveLength(11);
  });

  it("범위 밖의 시간은 렌더링되지 않는다.", async () => {
    renderWithQueryClient(<TimeTable {...testData} />);

    expect(screen.queryByText("7:00")).not.toBeInTheDocument();
    expect(screen.queryByText("8:00")).not.toBeInTheDocument();
    expect(screen.queryByText("20:00")).not.toBeInTheDocument();
    expect(screen.queryByText("21:00")).not.toBeInTheDocument();
  });

  it("props로 전달된 날짜가 올바르게 렌더링된다.", async () => {
    renderWithQueryClient(<TimeTable {...testData} />);

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("13")).toBeInTheDocument();
    expect(screen.getByText("14")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("16")).toBeInTheDocument();

    expect(screen.queryByText("17")).not.toBeInTheDocument();
  });

  it("API에서 데이터를 가져오는 중일 때 로딩 스피너가 표시된다.", async () => {
    // API 모킹 - 로딩 상태
    mockUseGetTimeSlot.mockReturnValue({
      timeSlotData: undefined,
      isFetching: true,
      error: null,
    });

    renderWithQueryClient(<TimeTable {...testData} />);

    // 로딩 스피너 확인
    await waitFor(() => {
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });
  });

  it("selectedCarId가 0일 때 API 호출이 비활성화된다.", async () => {
    const testDataWithZeroCarId = {
      ...testData,
      selectedCarId: 0,
    };

    renderWithQueryClient(<TimeTable {...testDataWithZeroCarId} />);

    expect(mockUseGetTimeSlot).toHaveBeenCalledWith(0, expect.any(String));
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
