import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getYearMonth } from "./Calander.util.ts";
import CalanderHeader from "@/features/calander/CalanderHeader.tsx";

describe("CalanderHeader 컴포넌트", () => {
  it("props로 받은 날짜에 해당하는 연도와 월을 표시한다.", () => {
    const testDate = new Date();
    render(<CalanderHeader date={testDate} />); // TODO: CalanderHeader 들어가야함
    expect(screen.getByText(getYearMonth(testDate))).toBeInTheDocument();
  });
});
