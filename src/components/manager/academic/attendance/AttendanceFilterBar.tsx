"use client";

import { Search, Download, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTH_OPTIONS, DEPARTMENT_OPTIONS } from "@/constants/manager/attendance.constants";
import { useAttendanceStore } from "@/store/manager/attendance.store";
import type { DepartmentType } from "@/types/manager/attendance.types";

export function AttendanceFilterBar() {
  const { filter, setMonth, setDepartment, setSearch } = useAttendanceStore();

  return (
    <div className="flex items-center gap-3 mb-6">
      {/* 월별 선택 */}
      <div className="flex items-center gap-2">
        <span className="text-[12px] text-slate-500 whitespace-nowrap">월별 선택:</span>
        <Select value={filter.month} onValueChange={setMonth}>
          <SelectTrigger className="w-[140px] text-[12.5px]" size="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MONTH_OPTIONS.map((month) => (
              <SelectItem key={month} value={month} className="text-[12.5px]">
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 부서 선택 */}
      <div className="flex items-center gap-2">
        <span className="text-[12px] text-slate-500 whitespace-nowrap">부서:</span>
        <Select
          value={filter.department}
          onValueChange={(v) => setDepartment(v as DepartmentType)}
        >
          <SelectTrigger className="w-[160px] text-[12.5px]" size="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DEPARTMENT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-[12.5px]">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1" />

      {/* 내보내기 / 기록 */}
      <Button variant="outline" size="sm">
        <Download className="w-3.5 h-3.5" />
        내보내기
      </Button>
      <Button variant="primary" size="sm">
        <Upload className="w-3.5 h-3.5" />
        기록
      </Button>
    </div>
  );
}
