export type UserFilterValue = "ALL" | "NEW" | "SUCCESS" | "FAIL" | "FIXED";

// TODO 재민 - API 명세와 key 맞추기
export type RouteFilterValue = "ALL" | "WAITING" | "INPROGRESS" | "COMPLETED";

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

// TODO 재민 - API 명세와 key 맞추기
export const ROUTE_STATUS_FILTER_OPTIONS: {
  value: RouteFilterValue;
  label: string;
}[] = [
  { value: "ALL", label: "전체" },
  { value: "WAITING", label: "운행 대기" },
  { value: "INPROGRESS", label: "운행 중" },
  { value: "COMPLETED", label: "운행 완료" },
];
