"use client";

import { useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui.store";

interface TopbarProps {
  homePath: string;
}

export default function Topbar({ homePath }: TopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const tabs = useUIStore((s) => s.tabs);
  const removeTab = useUIStore((s) => s.removeTab);

  function handleClose(href: string) {
    removeTab(href);

    const remaining = tabs.filter((t) => t.href !== href);
    if (remaining.length === 0) {
      router.push(homePath);
      return;
    }

    if (pathname === href || pathname.startsWith(href)) {
      const idx = tabs.findIndex((t) => t.href === href);
      const next = remaining[idx - 1] ?? remaining[0];
      router.push(next.href);
    }
  }

  return (
    <div className="bg-white px-6 flex items-end shrink-0 relative" style={{ minHeight: 40 }}>
      <div className="absolute bottom-0 left-6 right-6 h-px bg-[#eee]" />

      {tabs.length === 0 ? (
        <div className="h-10" />
      ) : (
        <div className="flex items-end gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href || pathname.startsWith(tab.href);
            return (
              <div
                key={tab.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 h-9 text-[12px] border-b-2 cursor-pointer whitespace-nowrap transition-colors",
                  isActive
                    ? "border-[#0069A8] text-[#0069A8] font-medium"
                    : "border-transparent text-slate-400 hover:text-slate-600",
                )}
              >
                <span onClick={() => router.push(tab.href)}>{tab.label}</span>
                <button
                  onClick={() => handleClose(tab.href)}
                  className="flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={9} strokeWidth={2.5} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}