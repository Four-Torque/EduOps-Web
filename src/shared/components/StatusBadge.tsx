import {
  REQUEST_STATUS_LABEL,
  REQUEST_STATUS_STYLE,
} from "@/shared/constants/manager/material.constants";

interface StatusBadgeProps {
  status: keyof typeof REQUEST_STATUS_LABEL;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  readonly?: boolean;
}

export function StatusBadge({ status, onClick, readonly }: StatusBadgeProps) {
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
