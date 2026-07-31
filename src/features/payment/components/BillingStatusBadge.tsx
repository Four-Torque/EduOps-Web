import { BillingStatus } from "@/features/payment/type";
import { BILLING_STATUS_STYLE } from "@/shared/constants/manager/billing.constants";

interface BillingStatusBadgeProps {
  status: BillingStatus;
}

export function BillingStatusBadge({ status }: BillingStatusBadgeProps) {
  return (
    <span
      className={`inline-flex w-16 items-center justify-center text-[10.5px] font-medium px-2.5 py-0.5 rounded-full ${BILLING_STATUS_STYLE[status] ?? "text-slate-500 bg-slate-100"}`}
    >
      {status}
    </span>
  );
}
