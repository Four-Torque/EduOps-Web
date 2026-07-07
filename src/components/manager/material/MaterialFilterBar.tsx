"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REQUEST_STATUS_OPTIONS } from "@/constants/manager/material.constants";
import type { MaterialTabFilter } from "@/types/manager/material.types";

interface MaterialFilterBarProps {
  statusFilter: MaterialTabFilter;
  onStatusFilterChange: (status: MaterialTabFilter) => void;
}

export function MaterialFilterBar({
  statusFilter,
  onStatusFilterChange,
}: MaterialFilterBarProps) {
  return (
    <div className="px-4 py-3 mb-6 border border-slate-200 rounded bg-white">
      <Select
        value={statusFilter}
        onValueChange={(value) =>
          onStatusFilterChange(value as MaterialTabFilter)
        }
      >
        <SelectTrigger className="w-40 text-[12.5px]" size="default">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {REQUEST_STATUS_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-[12.5px]"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
