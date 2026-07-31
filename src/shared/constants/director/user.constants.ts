import { UserApprovalStatus, UserTabFilter } from "@/features/user/type";

export const USER_TABS: { label: string; value: UserTabFilter }[] = [
  { label: "전체", value: "all" },
  { label: "승인 대기", value: "pending" },
];

export const USER_STATUS_LABEL: Record<UserApprovalStatus, string> = {
  pending: "대기",
};

export const USER_STATUS_STYLE: Record<UserApprovalStatus, string> = {
  pending: "text-white bg-emerald-500 hover:bg-emerald-600",
};
