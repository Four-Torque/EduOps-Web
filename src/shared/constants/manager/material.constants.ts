import { MaterialTabFilter } from "@/features/asset/type";

export const REQUEST_STATUS_OPTIONS: {
  label: string;
  value: MaterialTabFilter;
}[] = [
  { label: "전체", value: "all" },
  { label: "결제완료", value: "ACCEPTED" },
  { label: "결제대기", value: "PENDING" },
  { label: "결제거절", value: "REJECTED" },
];

export const REQUEST_STATUS_LABEL: Record<string, string> = {
  PENDING: "결제 대기",
  ACCEPTED: "결제완료",
  REJECTED: "결제거절",
};

export const REQUEST_STATUS_STYLE: Record<
  keyof typeof REQUEST_STATUS_LABEL,
  string
> = {
  PENDING: "text-white bg-[#6B7280] hover:bg-[#4B5563]",
  ACCEPTED: "text-white bg-[#E07B39] hover:bg-[#c96a2e]",
  REJECTED: "text-white bg-[#EF4444] hover:bg-[#DC2626]",
};
