"use client";

import { useEffect, useRef } from "react";
import type { PaymentApprovalStatus } from "@/types/director/pament.types";

interface PopoverAction {
  label: string;
  status: PaymentApprovalStatus;
  className: string;
}

const POPOVER_ACTIONS: PopoverAction[] = [
  {
    label: "승인완료",
    status: "approved",
    className: "text-white bg-[#0069A8] hover:bg-[#005a8e]",
  },
  {
    label: "취소",
    status: "cancelled",
    className: "text-slate-600 bg-slate-100 hover:bg-slate-200",
  },
];

interface PaymentStatusPopoverProps {
  anchorRect: DOMRect;
  onSelect: (status: PaymentApprovalStatus) => void;
  onClose: () => void;
}

export function PaymentStatusPopover({ anchorRect, onSelect, onClose }: PaymentStatusPopoverProps) {
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
      style={{ top: anchorRect.bottom + 6, left: anchorRect.left, minWidth: 96 }}
    >
      {POPOVER_ACTIONS.map((action) => (
        <button
          key={action.status}
          onClick={() => { onSelect(action.status); onClose(); }}
          className={`text-[11.5px] font-medium px-3 py-1.5 rounded transition-colors ${action.className}`}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}