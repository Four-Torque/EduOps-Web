import type { ColumnProps } from "@/shared/components/Table";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import type { Student } from "@/features/student/type";
import { StudentStatusBadge } from "@/features/student/components/StudentStatusBadge";

interface StudentColumnProps {
  onEdit: (id: string) => void;
  onDelete: (ids: string[]) => void;
}

export const getStudentColumns = ({
  onEdit,
  onDelete,
}: StudentColumnProps): ColumnProps[] => {
  return [
    {
      key: "studentInfo",
      label: "학생 정보",
      className: "text-left",
      render: (item: Student) => (
        <div className="flex items-center gap-2.5">
          <div className="text-left">
            <p className="text-[12.5px] font-medium text-slate-900">
              {item.name}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "birthDate",
      label: "생년월일",
      render: (item: Student) => (
        <p className="text-[12px] text-slate-600 text-center">
          {item.birthDate}
        </p>
      ),
    },
    {
      key: "address",
      label: "주소",
    },
    {
      key: "Phonenumber",
      label: "비상 연락처",
      render: (item: Student) => (
        <p className="text-[12px] text-slate-600 text-center">
          {" "}
          {item.Phonenumber}
        </p>
      ),
    },
    {
      key: "status",
      label: "상태",
      render: (item: Student) => (
        <div className="flex justify-center">
          <StudentStatusBadge status={item.status} />
        </div>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "text-center",
      render: (item: Student) => (
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
              onClick={() => onEdit(item.id)}
            >
              <EditIcon className="size-4" />
              편집
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
};
