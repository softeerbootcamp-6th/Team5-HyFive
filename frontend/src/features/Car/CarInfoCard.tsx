import type { CarType } from "@/features/Car/Car.type";
import Tag from "@/components/Tag";
import {
  CardContainer,
  ImgSection,
  ContentSection,
  ContentHeader,
  NumLabel,
  NameLabel,
  TagSection,
  CarTag,
} from "@/features/Car/CarInfoCard.style";
import { CarIcon } from "@/assets/icons";
import { theme } from "@/styles/themes.style";
import { useState } from "react";
import usePressDetection from "@/hooks/usePressDetection";

interface CarInfoCardProps {
  carData: CarType;
  isSelected: boolean;
  setIsSelected: (id: number) => void;
}

const CarInfoCard = ({
  carData,
  isSelected,
  setIsSelected,
}: CarInfoCardProps) => {
  const { carId, carName, carNum, capacity, isLowFloor, carImgURL, isDriving } =
    carData;
  const [isPressing, setIsPressing] = useState(false);

  const pressHandlers = usePressDetection({
    setIsPressing,
  });

  return (
    <div
      data-testid="car-card"
      onClick={() => {
        setIsSelected(carId);
      }}
      {...pressHandlers}
      css={CardContainer(isSelected, isPressing)}
    >
      <div css={ImgSection}>
        {carImgURL === "" ? (
          <CarIcon
            data-testid="car-fallback-icon"
            width={"60%"}
            height={"50%"}
            fill={theme.color.GrayScale.gray3}
          />
        ) : (
          <img src={carImgURL} alt="차량 이미지" />
        )}
      </div>
      <div css={ContentSection}>
        <header css={ContentHeader}>
          <p css={NumLabel(isSelected)}>{carNum}</p>
          <p css={NameLabel}>{carName}</p>
        </header>
        <div css={TagSection}>
          <div css={CarTag(isSelected)}>{capacity}인승</div>
          {isLowFloor && <div css={CarTag(isSelected)}>저상형</div>}
        </div>
        {isDriving ? (
          <Tag type="green" label="운행 중" />
        ) : (
          <Tag type="gray" label="미운행" />
        )}
      </div>
    </div>
  );
};

export default CarInfoCard;
