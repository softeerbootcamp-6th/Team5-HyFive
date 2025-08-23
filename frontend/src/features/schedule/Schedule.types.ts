import type {
  HighlightType,
  MarkerPath,
  PolylinePath,
} from "@/features/map/Map.types";

export type ScheduleType = "waiting" | "inProgress" | "completed";

export type ScheduleStatus = "WAITING" | "RUNNING" | "FINISHED";

// 전체 운행 경로 데이터
export interface ScheduleData {
  routeId: number;
  totalUserCount: number;
  routeStartTime: string;
  routeEndTime: string;
  routeStartLocation: string;
  routeEndLocation: string;
  centerName: string;
  carNumber: string;
}

export interface ScheduleAPIResposne {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    items: ScheduleAPIData[];
    hasNext: boolean;
    cursor: {
      lastId: number;
      lastStartTime: string;
      lastEndTime: string;
    } | null;
  };
}

export interface ScheduleAPIData {
  pathId: number;
  carNumber: string;
  startTime: string;
  endTime: string;
  startAddr: string;
  endAddr: string;
  centerName: string;
  driveStatus: ScheduleStatus;
  userCount: number;
}

// 개별 운행 경로 탑승자 데이터
export interface PassengerData {
  name: string;
  phone: string;
  isExistWalkingDevice: boolean;
  boardingTime: string;
  getOffTime: string;
}

export interface PassengerAPIResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: PassengerAPIData[];
}

export interface PassengerAPIData {
  name: string;
  phoneNumber: string;
  walker: boolean;
  onTime: string;
  offTime: string;
}

// 개별 운행 경로 데이터
export interface NodeData {
  polyline: PolylinePath[];
  marker: MarkerPath[];
  highlight: HighlightType[];
}

export interface NodeAPIReponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: NodeData;
}
