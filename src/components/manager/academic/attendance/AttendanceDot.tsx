import type { AttendanceStatus } from "@/types/manager/attendance.types";

interface AttendanceDotProps {
  status: AttendanceStatus;
}

const DOT_STYLE: Record<AttendanceStatus, string> = {
  present: "bg-slate-800",
  late:    "bg-red-500",
  absent:  "bg-red-500",
};

export function AttendanceDot({ status }: AttendanceDotProps) {
  return (
    <div className={`w-2.5 h-2.5 rounded-full mx-auto ${DOT_STYLE[status]}`} />
  );
}
