"use client";

import { Search, Calendar, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface RevenueFilterBarProps {
  search: string;
  status: string;
  dateRange: string;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: string) => void;
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
  onExcelExport,
}: RevenueFilterBarProps) {
  return (
    <div className="flex items-center gap-2.5 mb-1.5">
      {/* 검색 */}
      <div className="flex-1">
        <Input
          leftIcon={<Search className="w-3 h-3" />}
          placeholder="학생명 또는 항목 검색..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* 납부 상태 */}
      <span className="text-[12px] text-slate-500 whitespace-nowrap">
        납부:
      </span>
      <Select
        value={status}
        options={STATUS_OPTIONS}
        onChange={(e) => onStatusChange(e.target.value)}
      />

      {/* 기간 */}
      <span className="text-[12px] text-slate-500 whitespace-nowrap">
        기간:
      </span>
      <div className="flex items-center gap-1.5 h-9 px-3 border border-slate-300 rounded-md bg-white cursor-pointer text-[12.5px] text-slate-700 whitespace-nowrap hover:bg-slate-50 transition-colors">
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
