"use client";

import { PAYMENT_TABS } from "@/constants/director/payment.constants";
import type { PaymentTabFilter } from "@/types/director/pament.types";

interface PaymentFilterTabsProps {
  active: PaymentTabFilter;
  onChange: (tab: PaymentTabFilter) => void;
}

export function PaymentFilterTabs({ active, onChange }: PaymentFilterTabsProps) {
  return (
    <div className="flex border-b border-slate-200">
      {PAYMENT_TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={[
            "px-5 py-2.5 text-[12.5px] font-medium transition-colors",
            active === tab.value
              ? "bg-slate-800 text-white"
              : "bg-white text-slate-500 hover:bg-slate-50",
          ].join(" ")}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}