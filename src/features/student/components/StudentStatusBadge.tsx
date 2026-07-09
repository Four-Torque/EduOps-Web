import { StudentStatus } from "../type";

const STATUS_LABEL: Record<StudentStatus, string> = {
  active: "Active",
  inactive: "Inactive",
};

const STATUS_STYLE: Record<StudentStatus, string> = {
  active: "text-emerald-700 bg-emerald-50",
  inactive: "text-slate-500 bg-slate-100",
};

interface StudentStatusBadgeProps {
  status: any;
}

export function StudentStatusBadge({ status }: StudentStatusBadgeProps) {
  return (
    <span
      className={`inline-block text-[10.5px] font-medium px-2.5 py-1 rounded-full `}
    >
      ㅗ
    </span>
  );
}
