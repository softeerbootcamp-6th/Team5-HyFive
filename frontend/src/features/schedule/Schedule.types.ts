export type ScheduleType = "waiting" | "inProgress" | "completed";

export type ScheduleStatus = "WAITING" | "RUNNING" | "FINISHED";

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

export type ScheduleAPIData = {
  pathId: number;
  carNumber: string;
  startTime: string;
  endTime: string;
  startAddr: string;
  endAddr: string;
  centerName: string;
  driveStatus: ScheduleStatus;
  userCount: number;
};
