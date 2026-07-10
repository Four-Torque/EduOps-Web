import type { StudentStatus } from "../type";

const STATUS_LABEL: Record<string, string> = {
  active:   "Active",
  inactive: "Inactive",
};

const STATUS_STYLE: Record<string, string> = {
  active:   "text-emerald-700 bg-emerald-50",
  inactive: "text-slate-500 bg-slate-100",
};

interface StudentStatusBadgeProps {
  status: StudentStatus;
}

export function StudentStatusBadge({ status }: StudentStatusBadgeProps) {
  return (
    <span
      className={`inline-block text-[10.5px] font-medium px-2.5 py-1 rounded-full ${STATUS_STYLE[status] ?? "text-slate-500 bg-slate-100"}`}
    >
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}