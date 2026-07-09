"use client";

import { Search, Calendar, Download } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";

interface RevenueFilterBarProps {
  search: string;
  status: string;
  dateRange: string;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onDateRangeChange: (dateRange: string) => void;
  onExcelExport: () => void;
}

const STATUS_OPTIONS = [
  { label: "전체", value: "all" },
  { label: "납부완료", value: "paid" },
  { label: "미납", value: "unpaid" },
];

export function RevenueFilterBar({
  search,
  status,
  dateRange,
  onSearchChange,
  onStatusChange,
  onDateRangeChange,
  onExcelExport,
}: RevenueFilterBarProps) {
  return (
    <div className="flex items-center gap-2.5 mb-1.5">
      {/* 검색 — Input은 leftIcon prop 없으므로 wrapper로 처리 */}
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
        <Input
          className="pl-7 text-[12.5px]"
          placeholder="학생명 또는 항목 검색..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* 납부 상태 — Radix Select 방식 */}
      <span className="text-[12px] text-slate-500 whitespace-nowrap">
        납부:
      </span>
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="h-9 text-[12.5px]" size="default">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="text-[12.5px]"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 기간 */}
      <span className="text-[12px] text-slate-500 whitespace-nowrap">
        기간:
      </span>
      <div
        onClick={() => onDateRangeChange(dateRange)}
        className="flex items-center gap-1.5 h-9 px-3 border border-slate-300 rounded-md bg-white cursor-pointer text-[12.5px] text-slate-700 whitespace-nowrap hover:bg-slate-50 transition-colors"
      >
        <Calendar className="w-3.5 h-3.5 text-slate-400" />
        {dateRange}
      </div>

      {/* 엑셀 */}
      <Button variant="primary" size="sm" onClick={onExcelExport}>
        <Download className="w-3.5 h-3.5" />
        엑셀
      </Button>
    </div>
  );
}
