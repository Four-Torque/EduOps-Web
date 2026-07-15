import { CategoryLabel } from "./type";

export const STATUS_LABELS: Record<string, string> = {
  PAID: "납부완료",
  UNPAID: "미납",
  REFUNDED: "환불",
  COMPLETED: "지급완료",
  PENDING: "대기",
};

export const CATEGORY_LABELS: Record<string, CategoryLabel> = {
  ASSET: {
    name: "자재",
    color: "#4CAF50",
    icon: "🛠️",
  },
  ENROLLMENT_FEE: {
    name: "수강료",
    color: "#2196F3",
    icon: "💰",
  },
  SALARY: {
    name: "급여",
    color: "#FF9800",
    icon: "💵",
  },
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
