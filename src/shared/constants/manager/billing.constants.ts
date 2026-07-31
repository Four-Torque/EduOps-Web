import type {
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
