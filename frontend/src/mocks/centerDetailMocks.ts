// /admin/centers/:id | /center 에서 사용되는 목데이터
import type { CenterOverviewType } from "@/features/CenterOverview/CenterOverview.type";
import type { CarType } from "@/features/Car/Car.type";
import CarImage from "@/assets/images/OriginalCarImg.png";

export const mockCenterData: CenterOverviewType = {
  centerName: "남동구 노인 이동 센터",
  centerTel: "032-742-9900",
  centerAddr: "인천시 남동구 구월1동",
  registeredCars: 4,
  estimatedRevenue: "₩ 182,000",
};

export const mockCarData: CarType[] = [
  {
    carId: 1,
    carName: "기아 레이",
    carNum: "12가 1234",
    capacity: 5,
    isLowFloor: true,
    carImgURL: CarImage,
    isDriving: true,
  },
  {
    carId: 2,
    carName: "스타리아",
    carNum: "429누 4136",
    capacity: 8,
    isLowFloor: true,
    carImgURL: CarImage,
    isDriving: true,
  },
  {
    carId: 3,
    carName: "스타리아",
    carNum: "32거 9327",
    capacity: 8,
    isLowFloor: true,
    carImgURL: CarImage,
    isDriving: true,
  },
  {
    carId: 4,
    carName: "스타렉스",
    carNum: "192우 4943",
    capacity: 8,
    isLowFloor: false,
    carImgURL: CarImage,
    isDriving: false,
  },
];
