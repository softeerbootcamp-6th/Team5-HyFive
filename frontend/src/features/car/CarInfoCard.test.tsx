import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import type { CarType } from "@/features/car/Car.type";
import CarImage from "@/assets/images/OriginalCarImg.png";
import CarInfoCard from "@/features/car/CarInfoCard";
import { theme } from "@/styles/themes.style";
import { useState } from "react";

describe("차량 카드 컴포넌트", () => {
  it("props로 받은 데이터를 렌더링한다", () => {
    const mockCarData: CarType = {
      carId: 1,
      carName: "기아 레이",
      carNum: "12가 1234",
      capacity: 5,
      isLowFloor: true,
      carImgURL: CarImage,
      isDriving: true,
    };

    render(
      <CarInfoCard
        carData={mockCarData}
        isSelected={true}
        setIsSelected={() => {}}
      />,
    );

    expect(screen.getByText("기아 레이")).toBeInTheDocument();
    expect(screen.getByText("12가 1234")).toBeInTheDocument();
    expect(screen.getByText("5인승")).toBeInTheDocument(); // 렌더링시 포맷팅됨
  });

  it("isLowFloor가 false라면 저상형 태그가 렌더링되지 않는다.", () => {
    const lowFalseData: CarType = {
      carId: 1,
      carName: "기아 레이",
      carNum: "12가 1234",
      capacity: 5,
      isLowFloor: false,
      carImgURL: "CarImage",
      isDriving: true,
    };

    render(
      <CarInfoCard
        carData={lowFalseData}
        isSelected={true}
        setIsSelected={() => {}}
      />,
    );
    expect(screen.queryByText("저상형")).not.toBeInTheDocument();
  });

  it("차량 이미지가 빈 값이라면 대체 아이콘이 렌더링된다.", () => {
    const noImgData: CarType = {
      carId: 1,
      carName: "기아 레이",
      carNum: "12가 1234",
      capacity: 5,
      isLowFloor: false,
      carImgURL: "",
      isDriving: true,
    };

    render(
      <CarInfoCard
        carData={noImgData}
        isSelected={true}
        setIsSelected={() => {}}
      />,
    );
    expect(screen.getByTestId("car-fallback-icon")).toBeInTheDocument();
  });

  it("차량이 운행중이라면 운행 중 태그가 렌더링된다.", () => {
    const mockCarData: CarType = {
      carId: 1,
      carName: "기아 레이",
      carNum: "12가 1234",
      capacity: 5,
      isLowFloor: true,
      carImgURL: CarImage,
      isDriving: true,
    };

    render(
      <CarInfoCard
        carData={mockCarData}
        isSelected={true}
        setIsSelected={() => {}}
      />,
    );

    expect(screen.getByText("운행 중")).toBeInTheDocument();
  });

  it("차량이 미운행이라면 미운행 태그가 렌더링된다.", () => {
    const mockCarData: CarType = {
      carId: 1,
      carName: "기아 레이",
      carNum: "12가 1234",
      capacity: 5,
      isLowFloor: true,
      carImgURL: CarImage,
      isDriving: false,
    };

    render(
      <CarInfoCard
        carData={mockCarData}
        isSelected={true}
        setIsSelected={() => {}}
      />,
    );

    expect(screen.getByText("미운행")).toBeInTheDocument();
  });

  it("차량을 선택할 경우 스타일이 변경된다.", async () => {
    const user = userEvent.setup();
    const mockCarData: CarType = {
      carId: 1,
      carName: "기아 레이",
      carNum: "12가 1234",
      capacity: 5,
      isLowFloor: true,
      carImgURL: CarImage,
      isDriving: true,
    };

    const Wrapper = () => {
      const [selectedId, setSelectedId] = useState<number | null>(null);
      const isSelected = selectedId === mockCarData.carId;

      return (
        <CarInfoCard
          carData={mockCarData}
          isSelected={isSelected}
          setIsSelected={setSelectedId}
        />
      );
    };

    render(<Wrapper />);

    const card = screen.getByTestId("car-card");

    // 1. 초기 상태: 선택되지 않음
    expect(card).toHaveStyle(
      `background-color: ${theme.color.GrayScale.white}`,
    );

    // 2. 클릭 → 선택됨
    await user.click(card);

    // 3. 스타일이 바뀌었는지 확인
    expect(card).toHaveStyle(
      `background-color: ${theme.color.GrayScale.black}`,
    );
  });
});
