import {
  REQUEST_STATUS_LABEL,
  REQUEST_STATUS_STYLE,
} from "@/shared/constants/manager/material.constants";
import { MaterialPaymentStatus } from "@/types/manager/material.types";

interface TableStatusBadgeProps {
  status: MaterialPaymentStatus;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  readonly?: boolean;
}

export function TableStatusBadge({
  status,
  onClick,
  readonly,
}: TableStatusBadgeProps) {
  const base =
    "inline-block text-[10.5px] font-medium px-3 py-1 rounded transition-colors";

  if (readonly) {
    return (
      <span className={`${base} ${REQUEST_STATUS_STYLE[status]}`}>
        {REQUEST_STATUS_LABEL[status]}
      </span>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${base} ${REQUEST_STATUS_STYLE[status]} cursor-pointer`}
    >
      {REQUEST_STATUS_LABEL[status]}
    </button>
  );
}
