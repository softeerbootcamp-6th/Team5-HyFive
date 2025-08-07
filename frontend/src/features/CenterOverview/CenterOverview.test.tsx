import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { CenterOverviewType } from "@/features/CenterOverview/CenterOverview.type";
import CenterOverview from "@/features/CenterOverview/CenterOverview";
import CenterInfoCard from "@/features/CenterOverview/CenterInfoCard";
import { CallIcon } from "@/assets/icons";
const mockCenterData: CenterOverviewType = {
  centerName: "남동구 노인 이동 센터",
  centerTel: "032-742-9900",
  centerAddr: "인천시 남동구 구월1동",
  registeredCars: 4,
  estimatedRevenue: "₩ 182,000",
};

describe("CenterOverview 컴포넌트", () => {
  it("props로 전달받은 센터명을 화면에 렌더링한다.", () => {
    render(<CenterOverview {...mockCenterData} />);
    expect(screen.getByText("남동구 노인 이동 센터")).toBeInTheDocument();
  });
});

describe("CenterInfoCard 컴포넌트", () => {
  it("props로 전달받은 데이터를 각각의 역할에 맞게 렌더링한다.", () => {
    render(
      <CenterInfoCard
        icon={<CallIcon />}
        label="전화번호"
        content="032-742-9900"
      />,
    );
    expect(screen.getByText("전화번호")).toBeInTheDocument();
    expect(screen.getByText("032-742-9900")).toBeInTheDocument();
  });
});
