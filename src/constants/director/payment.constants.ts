import type {
  PaymentTabFilter,
  PaymentApprovalStatus,
  PaymentUser,
} from "../types/payment.types";

export const PAYMENT_TABS: { label: string; value: PaymentTabFilter }[] = [
  { label: "전체",     value: "all"       },
  { label: "승인 대기", value: "pending"   },
  { label: "승인 완료", value: "approved"  },
  { label: "승인 취소", value: "cancelled" },
];

export const PAYMENT_STATUS_LABEL: Record<PaymentApprovalStatus, string> = {
  pending:   "대기",
  approved:  "승인완료",
  cancelled: "승인취소",
};

export const PAYMENT_STATUS_STYLE: Record<PaymentApprovalStatus, string> = {
  pending:   "text-white bg-emerald-500 hover:bg-emerald-600",
  approved:  "text-white bg-[#0069A8] hover:bg-[#005a8e]",
  cancelled: "text-white bg-slate-400 hover:bg-slate-500",
};

export const PAYMENT_TABLE_COLUMNS = [
  { key: "id",          label: "번호"          },
  { key: "name",        label: "사용자"        },
  { key: "phone",       label: "연락처"        },
  { key: "requestedAt", label: "승인 신청 날짜" },
  { key: "role",        label: "권한"          },
  { key: "status",      label: "상태"          },
] as const;

export const MOCK_PAYMENT_USERS: PaymentUser[] = [
  { id: 6, name: "김길동", phone: "010-1234-5678", requestedAt: "07-20 14:00", role: "선생님", status: "pending"   },
  { id: 5, name: "김길동", phone: "010-1234-5678", requestedAt: "07/19 15:00", role: "선생님", status: "approved"  },
  { id: 4, name: "김길동", phone: "010-1234-5678", requestedAt: "07/19 15:30", role: "관리자", status: "pending"   },
  { id: 3, name: "김길동", phone: "010-1234-5678", requestedAt: "07/20 15:00", role: "관리자", status: "approved"  },
  { id: 2, name: "김길동", phone: "010-1234-5678", requestedAt: "07/20 16:00", role: "관리자", status: "approved"  },
  { id: 1, name: "김길동", phone: "010-1234-5678", requestedAt: "07/29 12:00", role: "선생님", status: "approved"  },
];