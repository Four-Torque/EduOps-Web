"use client";

import { useEffect, useRef } from "react";
import type { InventoryPaymentStatus } from "@/types/director/inventory.types";

interface PopoverAction {
  label: string;
  status: InventoryPaymentStatus;
  className: string;
}

const POPOVER_ACTIONS: PopoverAction[] = [
  {
    label: "승인",
    status: "ACCEPTED",
    className: "text-white bg-[#0069A8] hover:bg-[#005a8e]",
  },
  {
    label: "반려",
    status: "REJECTED",
    className: "text-slate-600 bg-slate-100 hover:bg-slate-200",
  },
];

interface InventoryStatusPopoverProps {
  anchorRect: DOMRect;
  onSelect: (status: InventoryPaymentStatus) => void;
  onClose: () => void;
}

export function InventoryStatusPopover({
  anchorRect,
  onSelect,
  onClose,
}: InventoryStatusPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="fixed z-50 bg-white border border-slate-200 rounded shadow-lg p-2.5 flex flex-col gap-1.5"
      style={{
        top: anchorRect.bottom + 6,
        left: anchorRect.left,
        minWidth: 80,
      }}
    >
      {POPOVER_ACTIONS.map((action) => (
        <button
          key={action.status}
          onClick={() => {
            onSelect(action.status as InventoryPaymentStatus);
            onClose();
          }}
          className={`cursor-pointer text-[11.5px] font-medium px-3 py-1.5 rounded transition-colors ${action.className}`}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
