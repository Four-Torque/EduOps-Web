import { BILLING_STATUS_STYLE } from "@/constants/manager/billing.constants";
import type { BillingStatus } from "@/types/manager/billing.types";

interface BillingStatusBadgeProps {
  status: BillingStatus;
}

export function BillingStatusBadge({ status }: BillingStatusBadgeProps) {
  return (
    <span className={`inline-block text-[10.5px] font-medium px-2.5 py-0.5 rounded-full ${BILLING_STATUS_STYLE[status] ?? "text-slate-500 bg-slate-100"}`}>
      {status}
    </span>
  );
}
