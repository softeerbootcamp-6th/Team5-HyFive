export type CarType = {
  carId: number;
  carName: string;
  carNum: string;
  capacity: number;
  isLowFloor: boolean;
  carImgURL: string;
  isDriving: boolean;
};

export type BackendCarType = {
  id: number;
  modelName: string;
  carNumber: string;
  capacity: number;
  lowFloor: boolean;
  carImage: string;
  driving: boolean;
};

export const mapBackendCarToCarType = (backendCar: BackendCarType): CarType => {
  return {
    carId: backendCar.id,
    carName: backendCar.modelName,
    carNum: backendCar.carNumber,
    capacity: backendCar.capacity,
    isLowFloor: backendCar.lowFloor,
    carImgURL: backendCar.carImage,
    isDriving: backendCar.driving,
  };
};

export const mapBackendCarListToCarList = (
  backendCarList: BackendCarType[],
): CarType[] => {
  return backendCarList.map(mapBackendCarToCarType);
};
