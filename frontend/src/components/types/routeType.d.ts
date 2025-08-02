export interface RouteType {
  routeId: number;
  centerName: string;
  carNumber: string;
  routeStartTime: string;
  routeEndTime: string;
  routeStartLocation: string;
  routeEndLocation: string;
  totalUserCount: number;
  status: "end" | "progress" | "waiting";
}
