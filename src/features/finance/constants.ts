export const STATUS_LABELS: Record<string, string> = {
  PAID: "납부완료",
  UNPAID: "미납",
  REFUNDED: "환불",
  COMPLETED: "지급완료",
  PENDING: "대기",
};

export const INCOME_STATUS_OPTIONS = [
  { label: "전체 상태", value: "all" },
  { label: "납부완료", value: "PAID" },
  { label: "미납", value: "UNPAID" },
  { label: "환불", value: "REFUNDED" },
];

export const EXPENSE_STATUS_OPTIONS = [
  { label: "전체 상태", value: "all" },
  { label: "지급완료", value: "COMPLETED" },
  { label: "대기", value: "PENDING" },
];

export const ALL_STATUS_OPTIONS = [
  { label: "전체 상태", value: "all" },
  { label: "완료 (납부/지급)", value: "PAID" },
  { label: "대기/미납", value: "UNPAID" },
  { label: "환불", value: "REFUNDED" },
];
