"use client";

import { useMemo } from "react";
import { Download, Upload } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  MONTH_OPTIONS,
  DEPARTMENT_OPTIONS,
} from "@/shared/constants/manager/attendance.constants";
import { useAttendanceStore } from "@/features/attendance/store";
import { DepartmentType } from "@/features/attendance/type";

function getWeeksOfMonth(monthStr: string) {
  const match = monthStr.match(/(\d+)월\s+(\d+)년/);
  if (!match) return [];
  const monthNum = parseInt(match[1], 10) - 1;
  const yearNum = parseInt(match[2], 10);

  const weeks: { weekStart: string; label: string }[] = [];
  const d = new Date(yearNum, monthNum, 1);
  const day = d.getDay();
  const diff = day === 0 ? 1 : day === 1 ? 0 : 8 - day;
  d.setDate(d.getDate() + diff);

  let weekIdx = 1;
  while (d.getMonth() === monthNum) {
    const mon = new Date(d);
    const fri = new Date(d);
    fri.setDate(d.getDate() + 4);

    const format = (date: Date) =>
      `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
        date.getDate(),
      ).padStart(2, "0")}`;

    const weekStartStr = `${mon.getFullYear()}-${String(
      mon.getMonth() + 1,
    ).padStart(2, "0")}-${String(mon.getDate()).padStart(2, "0")}`;

    weeks.push({
      weekStart: weekStartStr,
      label: `${weekIdx}주차 (${format(mon)} ~ ${format(fri)})`,
    });

    d.setDate(d.getDate() + 7);
    weekIdx++;
  }
  return weeks;
}

interface AttendanceFilterBarProps {
  onExport: () => void;
}

export function AttendanceFilterBar({ onExport }: AttendanceFilterBarProps) {
  const { filter, setMonth, setWeekStart, setDepartment, onRecordOpen } =
    useAttendanceStore();

  const weeks = useMemo(() => getWeeksOfMonth(filter.month), [filter.month]);

  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center gap-2">
        <span className="text-[12px] text-slate-500 whitespace-nowrap">
          월별 선택:
        </span>
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

      {weeks.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-slate-500 whitespace-nowrap">
            주차 선택:
          </span>
          <Select value={filter.weekStart} onValueChange={setWeekStart}>
            <SelectTrigger className="w-[180px] text-[12.5px]" size="default">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              {weeks.map((w) => (
                <SelectItem
                  key={w.weekStart}
                  value={w.weekStart}
                  className="text-[12.5px]"
                >
                  {w.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className="text-[12px] text-slate-500 whitespace-nowrap">
          부서:
        </span>
        <Select
          value={filter.department}
          onValueChange={(v) => setDepartment(v as DepartmentType)}
        >
          <SelectTrigger className="w-[160px] text-[12.5px]" size="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DEPARTMENT_OPTIONS.map((opt) => (
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
      </div>

      <div className="flex-1" />

      <Button variant="outline" size="sm" onClick={onExport}>
        <Download className="w-3.5 h-3.5" />
        내보내기
      </Button>
      <Button variant="primary" size="sm" onClick={onRecordOpen}>
        <Upload className="w-3.5 h-3.5" />
        기록
      </Button>
    </div>
  );
}
