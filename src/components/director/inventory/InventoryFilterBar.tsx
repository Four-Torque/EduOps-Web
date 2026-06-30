"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INVENTORY_STATUS_OPTIONS } from "@/constants/director/inventory.constants";
import type { InventoryTabFilter } from "@/types/director/inventory.types";

interface InventoryFilterBarProps {
  statusFilter: InventoryTabFilter;
  onStatusFilterChange: (status: InventoryTabFilter) => void;
}

export function InventoryFilterBar({ statusFilter, onStatusFilterChange }: InventoryFilterBarProps) {
  return (
    <div className="px-4 py-3 mb-6 border border-slate-200 rounded bg-white">
      <Select
        value={statusFilter}
        onValueChange={(value) => onStatusFilterChange(value as InventoryTabFilter)}
      >
        <SelectTrigger className="w-[160px] text-[12.5px]" size="default">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {INVENTORY_STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value} className="text-[12.5px]">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
