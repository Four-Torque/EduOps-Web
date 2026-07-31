"use client";

import type { ColumnProps } from "@/shared/components/Table";
import { AttendanceDot } from "@/features/attendance/components/AttendanceDot";
import { AttendanceEmployee } from "@/features/attendance/type";
import { DAYS } from "@/shared/constants/manager/attendance.constants";
import { DAY_LABELS } from "@/shared/constants/day.constants";
import { Button } from "@/shared/components/ui/button";

interface ColumnOptions {
  onCheckIn: (id: string) => void;
  onCheckOut: (id: string) => void;
}

export function getAttendanceColumns({
  onCheckIn,
  onCheckOut,
}: ColumnOptions): ColumnProps[] {
  const todayLabel = DAY_LABELS[new Date().getDay()];

  return [
    {
      key: "employee",
      label: "직원",
      render: (item: AttendanceEmployee) => (
        <div className="w-full flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 text-[11px] font-semibold flex items-center justify-center shrink-0">
            {item.avatarInitial}
          </div>
          <div className="text-left">
            <p className="text-[12.5px] font-medium text-slate-900">
              {item.name}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "department",
      label: "부서",
      render: (item: AttendanceEmployee) => (
        <p className="w-full text-[12px] text-center">{item.department}</p>
      ),
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
      label: "출석 체크",
      render: (item: AttendanceEmployee) => {
        const activeRecord = item.weeklyAttendance.find(
          (a) => a.status !== "pending" && !a.checkedOut,
        );

        if (activeRecord) {
          return (
            <div className="flex items-center justify-center">
              <Button
                variant="destructive"
                size="xs"
                onClick={() => onCheckOut(String(item.id))}
                className="text-[11px] h-7 px-3.5 font-medium w-[75px]"
              >
                퇴근
              </Button>
            </div>
          );
        }

        const todayRecord = item.weeklyAttendance.find(
          (a) => a.day === todayLabel,
        );
        const isTodayCheckedIn = todayRecord && todayRecord.status !== "pending";

        if (!isTodayCheckedIn) {
          return (
            <div className="flex items-center justify-center">
              <Button
                variant="primary"
                size="xs"
                onClick={() => onCheckIn(String(item.id))}
                className="text-[11px] h-7 px-3.5 font-medium w-[75px]"
              >
                출근
              </Button>
            </div>
          );
        }

        return (
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              size="xs"
              disabled
              className="text-[11px] h-7 px-2 font-medium w-[75px] bg-slate-50 text-slate-400 border-slate-200"
            >
              퇴근 완료
            </Button>
          </div>
        );
      },

    },
  ];
}
