"use client";

import { Search, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/common/Table";
import type { ColumnProps } from "@/components/common/Table";
import { AttendanceDot }        from "./AttendanceDot";
import { AttendanceStatsCards } from "./AttendanceStatsCards";
import { AttendanceFilterBar }  from "./AttendanceFilterBar";
import { MOCK_ATTENDANCE_STATS, DAYS } from "@/constants/manager/attendance.constants";
import { useAttendanceStore }   from "@/store/manager/attendance.store";
import { useAttendance }        from "@/hooks/manager/attendance.hooks";
import type { AttendanceEmployee } from "@/types/manager/attendance.types";

const COLUMNS: ColumnProps[] = [
  {
    key: "employee",
    label: "직원",
    render: (item: AttendanceEmployee) => (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 text-[11px] font-semibold flex items-center justify-center shrink-0">
          {item.avatarInitial}
        </div>
        <div className="text-left">
          <p className="text-[12.5px] font-medium text-slate-900">{item.name}</p>
          <p className="text-[10.5px] text-slate-400">{item.employeeCode}</p>
        </div>
      </div>
    ),
  },
  {
    key: "department",
    label: "부서",
  },
  ...DAYS.map((day) => ({
    key: day,
    label: day,
    render: (item: AttendanceEmployee) => {
      const record = item.weeklyAttendance.find((a) => a.day === day);
      return record ? <AttendanceDot status={record.status} /> : null;
    },
  })),
  {
    key: "actions",
    label: "액션",
    render: () => (
      <button className="text-slate-400 hover:text-slate-600 transition-colors">
        <MoreVertical className="w-4 h-4" />
      </button>
    ),
  },
];

export function AttendanceTable() {
  const { filter, setSearch } = useAttendanceStore();
  const { data, isLoading }   = useAttendance();

  // Table 컴포넌트 data 형태에 맞게 변환
  const tableData = {
    data:       data?.items      ?? [],
    total:      data?.totalItems ?? 0,
    totalPages: data?.totalPages ?? 1,
  };

  return (
    <div>
      {/* 헤더 */}
      <div className=" mb-4">
        <div className="relative w-[200px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <Input
            value={filter.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="이름으로 검색"
            className="pl-8 text-[12.5px]"
          />
        </div>
      </div>

      {/* 필터바 */}
      <AttendanceFilterBar />

      {/* 통계 카드 */}
      <AttendanceStatsCards stats={MOCK_ATTENDANCE_STATS} />

      {/* 테이블 */}
      <Table
        columns={COLUMNS}
        data={tableData}
        isLoading={isLoading}
        rowKey="id"
        showCheckbox={false}
        statusReadonly={true}
      />

      {/* 범례 */}
      <div className="flex items-center gap-4 mt-4 px-1">
        <p className="text-[11.5px] font-medium text-slate-500">범례:</p>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
          <span className="text-[11.5px] text-slate-500">출근</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
          <span className="text-[11.5px] text-slate-500">지각 / 기타</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="text-[11.5px] text-slate-500">결근</span>
        </div>
      </div>
    </div>
  );
}