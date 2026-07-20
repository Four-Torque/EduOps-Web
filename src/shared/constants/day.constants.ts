// 요일(dayOfWeek) 0(일)~6(토) 공통 라벨. 백엔드 Schedule 응답 기준과 동일.
export const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"] as const;

export const DAY_OF_WEEK_OPTIONS = [
  { value: "0", label: "일요일" },
  { value: "1", label: "월요일" },
  { value: "2", label: "화요일" },
  { value: "3", label: "수요일" },
  { value: "4", label: "목요일" },
  { value: "5", label: "금요일" },
  { value: "6", label: "토요일" },
] as const;
