"use client";

import { USER_TABS } from "@/shared/constants/director/user.constants";
import { UserTabFilter } from "../type";

interface UserFilterTabsProps {
  active: UserTabFilter;
  onChange: (tab: UserTabFilter) => void;
}

export function UserFilterTabs({ active, onChange }: UserFilterTabsProps) {
  return (
    <div className="flex border-b border-slate-200">
      {USER_TABS.map((tab) => (
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
