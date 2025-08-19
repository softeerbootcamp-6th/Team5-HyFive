export type DateFilterValue = "YESTERDAY" | "TODAY" | "WEEK" | "MONTH";

export const DATE_FILTER_OPTIONS: { value: DateFilterValue; label: string }[] =
  [
    { value: "YESTERDAY", label: "어제" },
    { value: "TODAY", label: "오늘" },
    { value: "WEEK", label: "이번주" },
    { value: "MONTH", label: "이번달" },
  ];
