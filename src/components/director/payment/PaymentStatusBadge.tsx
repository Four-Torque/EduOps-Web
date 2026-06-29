import { PAYMENT_STATUS_LABEL, PAYMENT_STATUS_STYLE } from "@/constants/director/payment.constants";
import type { PaymentApprovalStatus } from "@/types/director/pament.types";

interface PaymentStatusBadgeProps {
  status: PaymentApprovalStatus;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  readonly?: boolean;
}

export function PaymentStatusBadge({ status, onClick, readonly }: PaymentStatusBadgeProps) {
  const base = "inline-block text-[10.5px] font-medium px-3 py-1 rounded transition-colors";

  if (readonly) {
    return (
      <span className={`${base} ${PAYMENT_STATUS_STYLE[status]}`}>
        {PAYMENT_STATUS_LABEL[status]}
      </span>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${PAYMENT_STATUS_STYLE[status]} cursor-pointer`}>
      {PAYMENT_STATUS_LABEL[status]}
    </button>
  );
}