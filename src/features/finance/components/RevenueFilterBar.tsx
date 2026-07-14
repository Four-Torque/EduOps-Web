"use client";

import { Search, Calendar } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  INCOME_STATUS_OPTIONS,
  EXPENSE_STATUS_OPTIONS,
  ALL_STATUS_OPTIONS,
} from "../constants";
import ExcelExportButton from "./ExcelExportButton";
import { useFinanceStore } from "../store";
import { RevenueStatus } from "../type";

interface RevenueFilterBarProps {
  search: string;
  status: string;
  type: "all" | "INCOME" | "EXPENSE";
  dateRange: string;
  onDateRangeChange: (dateRange: string) => void;
}

export function RevenueFilterBar({
  search,
  status,
  type,
  dateRange,
  onDateRangeChange,
}: RevenueFilterBarProps) {
  const { setSearch, setStatus, setType } = useFinanceStore();
  const statusOptions =
    type === "INCOME"
      ? INCOME_STATUS_OPTIONS
      : type === "EXPENSE"
        ? EXPENSE_STATUS_OPTIONS
        : ALL_STATUS_OPTIONS;

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
        <Input
          className="pl-7 text-[12.5px]"
          placeholder="학생명/사원명 또는 항목 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <span className="text-[12px] text-slate-500 whitespace-nowrap">
        구분:
      </span>
      <Select
        value={type}
        onValueChange={(v) => {
          setType(v as "all" | "INCOME" | "EXPENSE");
        }}
      >
        <SelectTrigger className="h-9 text-[12.5px] w-24" size="default">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="text-[12.5px]">
            전체
          </SelectItem>
          <SelectItem value="INCOME" className="text-[12.5px]">
            수입
          </SelectItem>
          <SelectItem value="EXPENSE" className="text-[12.5px]">
            지출
          </SelectItem>
        </SelectContent>
      </Select>

      <span className="text-[12px] text-slate-500 whitespace-nowrap">
        상태:
      </span>
      <Select
        value={status}
        onValueChange={(v) => {
          setStatus(v as "all" | RevenueStatus);
        }}
      >
        <SelectTrigger className="h-9 text-[12.5px]" size="default">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((opt) => (
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

      <ExcelExportButton />
    </div>
  );
}
