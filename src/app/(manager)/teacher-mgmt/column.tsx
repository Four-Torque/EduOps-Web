import { ColumnProps } from "@/shared/components/Table";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { EyeIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import type { TeacherStatus } from "@/features/user/type";

const STATUS_LABEL: Record<TeacherStatus, string> = {
  WORKING: "재직",
  ON_LEAVE: "휴직",
  RESIGNED: "퇴사",
};

const STATUS_STYLE: Record<TeacherStatus, string> = {
  WORKING: "bg-[#0069A8]/10 text-[#0069A8]",
  ON_LEAVE: "bg-amber-50 text-amber-600",
  RESIGNED: "bg-slate-100 text-slate-400",
};

interface TeacherColumnProps {
  onView: (id: string) => void;
  onDelete: (ids: string[]) => void;
}

export const getTeacherColumns = ({
  onView,
  onDelete,
}: TeacherColumnProps): ColumnProps[] => [
  {
    key: "name",
    label: "강사",
    render: (item) => (
      <button
        onClick={() => onView(item.id)}
        className="cursor-pointer font-medium text-[#0069A8] hover:underline"
      >
        {item.name}
      </button>
    ),
  },
  { key: "email", label: "이메일", type: "text" },
  { key: "phone", label: "연락처", type: "text" },
  {
    key: "classCount",
    label: "담당 강좌",
    render: (item) => `${item.classCount}개`,
  },
  {
    key: "studentCount",
    label: "담당 원생",
    render: (item) => `${item.studentCount}명`,
  },
  { key: "hireDate", label: "근무 시작일", type: "date" },
  {
    key: "status",
    label: "상태",
    render: (item) => (
      <span
        className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[item.status as TeacherStatus]}`}
      >
        {STATUS_LABEL[item.status as TeacherStatus]}
      </span>
    ),
  },
  {
    key: "actions",
    label: "",
    render: (item) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-xs"
            className="focus-visible:border-none focus-visible:ring-0 border-none"
          >
            <MoreHorizontalIcon className="cursor-pointer size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-32">
          <DropdownMenuItem
            className="text-muted-foreground"
            onClick={() => onView(item.id)}
          >
            <EyeIcon className="size-4" />
            상세보기
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDelete([item.id])}
          >
            <Trash2Icon className="size-4" />
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
