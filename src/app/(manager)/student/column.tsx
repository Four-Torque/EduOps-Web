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
import { StudentStatusBadge }     from "@/features/student/components/StudentStatusBadge";
import { useStudentRegisterStore } from "@/features/student/store";

interface StudentColumnProps {
  onEdit: (id: string) => void;
  onDelete: (ids: string[]) => void;
}

export const getStudentColumns = ({
  onEdit,
  onDelete,
}: StudentColumnProps): ColumnProps[] => {
  const { openModal } = useStudentRegisterStore.getState();

  return [
    {
      key: "studentInfo",
      label: "학생 정보",
      className: "text-left",
      render: (item: Student) => (
        <div className="flex items-center gap-2.5">
          {/* <div className="w-8 h-8 rounded-full bg-[#0069A8] text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
            {item.avatarInitial}
          </div> */}
          <div className="text-left">
            <p className="text-[12.5px] font-medium text-slate-900">{item.name}</p>
          </div>
        </div>
      ),
    },
    {
      key: "birthDate",
      label: "생년월일",
      type: "date",
    },
    {
      key: "address",
      label: "주소",
    },
    {
      key: "Phonenumber",
      label: "비상 연락처",
      render: (item: Student) => (
        <p className="text-[12px] text-slate-600"> {item.Phonenumber}</p>
      ),
    },
    {
      key: "status",
      label: "상태",
      render: (item: Student) => <StudentStatusBadge status={item.status} />,
    },
    {
      key: "actions",
      label: "액션빔",
      className: "text-center",
      render: (item: Student) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() =>
              openModal(
                {
                  name:      item.name,
                  birthDate: item.birthDate,
                  phone:     item.Phonenumber,
                  status:    item.status,
                },
                item.id,
              )
            }
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <EditIcon className="w-3.5 h-3.5" />
          </button>
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
                variant="destructive"
                onClick={() => onDelete([item.id])}
              >
                <Trash2Icon className="size-4" />
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];
};