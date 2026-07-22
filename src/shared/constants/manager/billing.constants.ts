import type {
  BillingTransaction,
  BillingStats,
  MonthlyRevenue,
  BillingTabFilter,
  BillingCategoryFilter,
} from "@/features/payment/type";

export const BILLING_PAGE_SIZE = 10;

export const BILLING_TABS: { label: string; value: BillingTabFilter }[] = [
  { label: "전체", value: "all" },
  { label: "완료", value: "완료" },
  { label: "미완료", value: "미완료" },
  { label: "연체", value: "연체" },
];

export const BILLING_CATEGORY_OPTIONS: {
  label: string;
  value: BillingCategoryFilter;
}[] = [{ label: "전체", value: "all" }];

export const BILLING_STATUS_STYLE: Record<string, string> = {
  완료: "text-emerald-700 bg-emerald-50",
  미완료: "text-red-600 bg-red-50",
  대기: "text-slate-500 bg-slate-100",
  연체: "text-orange-600 bg-orange-50",
};

export const MOCK_BILLING_STATS: BillingStats = {
  totalRevenue: 142500,
  revenueGrowthRate: 12,
  paidRate: 82,
  paidCount: 345,
  unpaidCount: 75,
};

export const MOCK_MONTHLY_REVENUE: MonthlyRevenue[] = [
  { month: "Jan", amount: 80000 },
  { month: "Feb", amount: 95000 },
  { month: "Mar", amount: 110000 },
  { month: "Apr", amount: 105000 },
  { month: "May", amount: 142500 },
  { month: "Jun", amount: 0 },
];

export const MOCK_BILLING_TRANSACTIONS: BillingTransaction[] = [
  {
    id: "INV-2024-0891",
    studentName: "Elena Johnson",
    studentCode: "ID: 994021",
    avatarInitial: "EJ",
    description: "Fall Tuition - Level 3",
    amount: 1250000,
    date: "Oct 24, 2024",
    status: "완료",
  },
  {
    id: "INV-2024-0892",
    studentName: "Marcus Chen",
    studentCode: "ID: 994033",
    avatarInitial: "MC",
    description: "Material Fee - Art Supplies",
    amount: 65000,
    date: "Oct 23, 2024",
    status: "미완료",
  },
  {
    id: "INV-2024-0885",
    studentName: "Sarah Rahman",
    studentCode: "ID: 993105",
    avatarInitial: "SR",
    description: "Fall Tuition - Level 2",
    amount: 1100000,
    date: "Oct 20, 2024",
    status: "대기",
  },
  {
    id: "INV-2024-0870",
    studentName: "David Torres",
    studentCode: "ID: 992044",
    avatarInitial: "DT",
    description: "Library Fine",
    amount: 15000,
    date: "Oct 15, 2024",
    status: "연체",
  },
  {
    id: "INV-2024-0870",
    studentName: "David Torres",
    studentCode: "ID: 992044",
    avatarInitial: "DT",
    description: "Library Fine",
    amount: 15000,
    date: "Oct 15, 2024",
    status: "연체",
  },
  {
    id: "INV-2024-0870",
    studentName: "David Torres",
    studentCode: "ID: 992044",
    avatarInitial: "DT",
    description: "Library Fine",
    amount: 15000,
    date: "Oct 15, 2024",
    status: "연체",
  },
];
