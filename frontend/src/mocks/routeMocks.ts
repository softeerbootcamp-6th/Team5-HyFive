import type { RouteType } from "@/types/routeType.types";

export const routeDataList: RouteType[] = [
  {
    routeId: 1001,
    centerName: "강남노인복지센터",
    carNumber: "12가 3456",
    routeStartTime: "08:00",
    routeEndTime: "09:30",
    routeStartLocation: "강남구청",
    routeEndLocation: "서울의료원",
    totalUserCount: 4,
    status: "waiting",
  },
  {
    routeId: 1002,
    centerName: "분당노인복지센터",
    carNumber: "34나 6789",
    routeStartTime: "10:00",
    routeEndTime: "11:45",
    routeStartLocation: "분당구청",
    routeEndLocation: "분당서울대병원",
    totalUserCount: 5,
    status: "inProgress",
  },
  {
    routeId: 1003,
    centerName: "서초노인복지센터",
    carNumber: "56다 1122",
    routeStartTime: "13:00",
    routeEndTime: "14:30",
    routeStartLocation: "서초복지관",
    routeEndLocation: "강남성심병원",
    totalUserCount: 3,
    status: "completed",
  },
];
