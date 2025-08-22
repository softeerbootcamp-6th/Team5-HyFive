import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import type { CarType } from "@/features/car/Car.type";
import CarInfoCard from "@/features/car/CarInfoCard";
import CarInfoCardSkeleton from "@/features/car/CarInfoCardSkeleton";
import CarAddCard from "@/features/car/CarAddCard";
import { InfoIcon } from "@/assets/icons";

const { color, typography } = theme;

interface CarListProps {
  canAddCar?: boolean;
  carList?: CarType[];
  selectedCarId: number | null;
  setSelectedCarId: (id: number) => void;
  onAddCarClick?: () => void;
  isLoading?: boolean;
  error?: Error | null;
  maxCars?: number;
}

const CarList = ({
  canAddCar = false,
  carList = [],
  selectedCarId,
  setSelectedCarId,
  onAddCarClick,
  isLoading = false,
  error = null,
  maxCars = 6,
}: CarListProps) => {
  if (isLoading) {
    return (
      <div css={ListContainer}>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarInfoCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div css={ListContainer}>
        <div css={ErrorContainer}>
          <InfoIcon />
          <div css={ErrorContent}>
            <span css={ErrorTitle}>차량 정보를 불러올 수 없습니다</span>
            <span css={ErrorMessage}>
              {typeof error === "string"
                ? error
                : "알 수 없는 오류가 발생했습니다."}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div css={ListContainer}>
      {carList.length > 0 ? (
        carList.map((car) => (
          <CarInfoCard
            key={car.carId}
            carData={car}
            isSelected={selectedCarId === car.carId}
            setIsSelected={setSelectedCarId}
          />
        ))
      ) : (
        <div css={ErrorContainer}>
          <InfoIcon />
          <div css={ErrorContent}>
            <span css={ErrorTitle}>등록된 차량이 없습니다</span>
          </div>
        </div>
      )}
      {canAddCar && carList.length < maxCars && (
        <CarAddCard onClick={() => onAddCarClick?.()} />
      )}
    </div>
  );
};

export default CarList;

const ListContainer = css`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;
`;

const ErrorContainer = css`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 40px 20px;
  background-color: ${color.GrayScale.gray1};
  border-radius: 12px;
  border: 1px solid ${color.GrayScale.gray3};
`;

const ErrorContent = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ErrorTitle = css`
  font: ${typography.Body.b2_semi};
  color: ${color.GrayScale.gray6};
`;

const ErrorMessage = css`
  font: ${typography.Body.b4_regu};
  color: ${color.GrayScale.gray5};
`;
