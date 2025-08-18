export interface RouteType {
  routeId: number;
  centerName: string;
  carNumber: string;
  routeStartTime: string;
  routeEndTime: string;
  routeStartLocation: string;
  routeEndLocation: string;
  totalUserCount: number;
  status: "waiting" | "inProgress" | "completed";
}

export type RouteStatus = "탑승" | "하차" | "대기";

export interface PassengerRoute {
  id: number;
  name: string;
  status: RouteStatus;
}
