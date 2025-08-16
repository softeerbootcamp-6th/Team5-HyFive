export type UserFilterValue = "ALL" | "NEW" | "SUCCESS" | "FAIL" | "FIXED";

export type RouteFilterValue = "ALL" | "COMPLETED" | "PENDING";

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
