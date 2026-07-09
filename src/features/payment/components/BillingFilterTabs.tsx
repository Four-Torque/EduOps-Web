"use client";

import { BillingTabFilter } from "@/features/finance/type";
import { BILLING_TABS } from "@/shared/constants/manager/billing.constants";

interface BillingFilterTabsProps {
  active: BillingTabFilter;
  onChange: (tab: BillingTabFilter) => void;
}

export function BillingFilterTabs({
  active,
  onChange,
}: BillingFilterTabsProps) {
  return (
    <div className="flex gap-1">
      {BILLING_TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={[
            "px-3 py-1.5 text-[12px] font-medium rounded transition-colors",
            active === tab.value
              ? "bg-slate-800 text-white"
              : "text-slate-500 hover:bg-slate-100",
          ].join(" ")}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
