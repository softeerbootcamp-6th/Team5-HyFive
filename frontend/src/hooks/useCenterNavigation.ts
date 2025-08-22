import type { CarType } from "@/features/car/Car.type";
import { useNavigate } from "react-router";

export const useCarNavigation = () => {
  const navigate = useNavigate();

  const navigateToRegisterCar = () => {
    void navigate("/center/register");
  };

  const navigateToEditCar = (carInfo: CarType) => {
    void navigate("/center/edit", {
      state: {
        carId: carInfo.carId,
        carImage: carInfo.carImgURL,
        carModel: carInfo.carName,
        carNumber: carInfo.carNum,
        maxPassenger: String(carInfo.capacity),
        isLowFloor: carInfo.isLowFloor,
      },
    });
  };

  return {
    navigateToRegisterCar,
    navigateToEditCar,
  };
};
