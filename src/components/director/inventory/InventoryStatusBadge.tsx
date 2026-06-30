import { INVENTORY_STATUS_LABEL, INVENTORY_STATUS_STYLE } from "@/constants/director/inventory.constants";
import type { InventoryPaymentStatus } from "@/types/director/inventory.types";

interface InventoryStatusBadgeProps {
  status: InventoryPaymentStatus;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  readonly?: boolean;
}

export function InventoryStatusBadge({ status, onClick, readonly }: InventoryStatusBadgeProps) {
  const base = "inline-block text-[10.5px] font-medium px-3 py-1 rounded transition-colors";

  if (readonly) {
    return (
      <span className={`${base} ${INVENTORY_STATUS_STYLE[status]}`}>
        {INVENTORY_STATUS_LABEL[status]}
      </span>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${INVENTORY_STATUS_STYLE[status]} cursor-pointer`}>
      {INVENTORY_STATUS_LABEL[status]}
    </button>
  );
}
