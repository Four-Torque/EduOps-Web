"use client";

import { useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { AttendanceStatsCards } from "./AttendanceStatsCards";
import { AttendanceFilterBar } from "./AttendanceFilterBar";
import { useAttendanceStore } from "@/features/attendance/store";
import { Table } from "@/shared/components/Table";
import { useAttendance, useStaffCheckIn, useStaffCheckOut } from "../query";
import { getAttendanceColumns } from "@/app/(manager)/attendance/column";
import { exportToCsv } from "@/shared/lib/export";
import { AttendanceEmployee } from "../type";
import { useSearchParams } from "next/navigation";

export function AttendanceTable() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const { filter, setSearch } = useAttendanceStore();
  const { data, isLoading } = useAttendance({ ...filter, page, limit });

  const { mutate: checkIn } = useStaffCheckIn();
  const { mutate: checkOut } = useStaffCheckOut();

  const columns = useMemo(() => {
    return getAttendanceColumns({
      onCheckIn: (userId) => checkIn({ userId, checkInTime: new Date() }),
      onCheckOut: (userId) => checkOut({ userId, checkOutTime: new Date() }),
    });
  }, [checkIn, checkOut]);

  const handleExport = () => {
    if (!data?.items || data.items.length === 0) return;

    const headers = [
      "이름",
      "부서",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
    ];

    const formatTime = (timeStr?: string | null) => {
      if (!timeStr) return "-";
      try {
        const date = new Date(timeStr);
        if (isNaN(date.getTime())) return "-";
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
      } catch {
        return "-";
      }
    };

    const getDayAttendanceString = (
      item: AttendanceEmployee,
      dayLabel: "월" | "화" | "수" | "목" | "금",
    ) => {
      const record = item.weeklyAttendance.find((a) => a.day === dayLabel);
      if (!record || record.status === "pending") return "-";
      if (record.status === "absent") return "결근";

      const statusText = record.status === "late" ? "지각" : "출근";
      const checkIn = formatTime(record.checkInTime);
      const checkOut = formatTime(record.checkOutTime);

      return `${statusText}(${checkIn}) / 퇴근(${checkOut})`;
    };

    const rows = data.items.map((item) => {
      return [
        item.name,
        item.department,
        getDayAttendanceString(item, "월"),
        getDayAttendanceString(item, "화"),
        getDayAttendanceString(item, "수"),
        getDayAttendanceString(item, "목"),
        getDayAttendanceString(item, "금"),
      ];
    });

    exportToCsv(
      `직원근태현황_${filter.month}_${filter.weekStart}.csv`,
      headers,
      rows,
    );
  };

  const tableData = {
    data: data?.items ?? [],
    total: data?.totalItems ?? data?.items?.length ?? 0,
    totalPages:
      data?.totalPages ??
      Math.max(
        1,
        Math.ceil(
          (data?.totalItems ?? data?.items?.length ?? 0) / (limit || 10),
        ),
      ),
  };

  return (
    <div>
      {/* 헤더 */}
      <div className=" mb-4">
        <div className="relative w-50">
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
      <AttendanceFilterBar onExport={handleExport} />

      {/* 통계 카드 */}
      <AttendanceStatsCards
        stats={
          data?.stats ?? {
            totalEmployees: 0,
            presentToday: 0,
            absentToday: 0,
            lateOrEtc: 0,
          }
        }
      />

      {/* 테이블 */}
      <Table
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        rowKey="id"
        showCheckbox={false}
        statusReadonly={true}
        currentPage={page}
      />

      {/* 범례 */}
      <div className="flex items-center gap-4 mt-4 px-1">
        <p className="text-[11.5px] font-medium text-slate-500">범례:</p>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
          <span className="text-[11.5px] text-slate-500">출근</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
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
