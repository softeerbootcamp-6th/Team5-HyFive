// 예약자 상태 필터링 타입
export type UserFilterValue = "ALL" | "NEW" | "SUCCESS" | "FAIL" | "FIXED";

export const USER_STATUS_FILTER_OPTIONS: {
  value: UserFilterValue;
  label: string;
}[] = [
  { value: "ALL", label: "전체" },
  { value: "NEW", label: "신규 예약" },
  { value: "SUCCESS", label: "예약 성공" },
  { value: "FAIL", label: "예약 실패" },
  { value: "FIXED", label: "경로 확정" },
];

// 표 내부 상태에 따른 Tag 색상을 위한 메타데이터
export const USER_STATUS_META: Record<
  Exclude<UserFilterValue, "ALL">,
  { label: string; tagType: "orange" | "blue" | "red" | "green" }
> = {
  NEW: { label: "신규 예약", tagType: "orange" },
  SUCCESS: { label: "예약 성공", tagType: "blue" },
  FAIL: { label: "예약 실패", tagType: "red" },
  FIXED: { label: "경로 확정", tagType: "green" },
};

// 경로 상태 필터링 타입
export type RouteFilterValue = "ALL" | "WAITING" | "RUNNING" | "FINISHED";

export const ROUTE_STATUS_FILTER_OPTIONS: {
  value: RouteFilterValue;
  label: string;
}[] = [
  { value: "ALL", label: "전체" },
  { value: "WAITING", label: "운행 대기" },
  { value: "RUNNING", label: "운행 중" },
  { value: "FINISHED", label: "운행 완료" },
];

export const ROUTE_STATUS_META: Record<
  Exclude<RouteFilterValue, "ALL">,
  { label: string; tagType: "green" | "blue" | "gray" }
> = {
  WAITING: { label: "운행 대기", tagType: "gray" },
  RUNNING: { label: "운행 중", tagType: "blue" },
  FINISHED: { label: "운행 완료", tagType: "green" },
};
