import { mockCarData } from "@/mocks/centerDetailMocks";
import { useNavigate } from "react-router";

export const useCarNavigation = () => {
  const navigate = useNavigate();

  const navigateToRegisterCar = () => {
    void navigate("/center/register");
  };

  // TODO 재민 - API 연결되면, 차량 ID가 아닌 해당 차량의 데이터를 받아와야함
  const navigateToEditCar = (selectedCarId: number) => {
    const selectedCar = mockCarData.find((car) => car.carId === selectedCarId);
    if (!selectedCar) return;

    void navigate("/center/edit", {
      state: {
        carId: selectedCar.carId,
        carImage: selectedCar.carImgURL,
        carModel: selectedCar.carName,
        carNumber: selectedCar.carNum,
        maxPassenger: String(selectedCar.capacity),
        isLowFloor: selectedCar.isLowFloor,
      },
    });
  };

  return {
    navigateToRegisterCar,
    navigateToEditCar,
  };
};
