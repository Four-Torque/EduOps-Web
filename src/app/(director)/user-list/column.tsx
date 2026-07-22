import {
  USER_ROLES,
  USER_ACCOUNT_STATUS,
  USER_EMPLOYMENT_STATUS,
} from "@/features/user/constants";
import { ColumnProps } from "@/shared/components/Table";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { formatDate } from "@/shared/lib/utils";
import { EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";

interface UserColumnProps {
  onEdit: (id: string) => void;
  onDeactivate: (ids: string[]) => void;
  onApprove: (id: string) => void;
}

export const getUserColumns = ({
  onEdit,
  onDeactivate,
  onApprove,
}: UserColumnProps): ColumnProps[] => [
  {
    key: "name",
    label: "성함",
    render: (item) => <p className="text-center">{item.name}</p>,
  },
  {
    key: "phone",
    label: "전화번호",
    render: (item) => <p className="text-center">{item.phone}</p>,
  },
  {
    key: "role",
    label: "역할",
    render: (item) => (
      <div className="flex justify-center">
        <Badge variant={item.role}>{USER_ROLES[item.role]}</Badge>
      </div>
    ),
  },
  {
    key: "status",
    label: "상태",
    render: (item) => (
      <div className="flex justify-center">
        <Badge variant={item.status}>{USER_ACCOUNT_STATUS[item.status]}</Badge>
      </div>
    ),
  },
  {
    key: "employmentStatus",
    label: "재직 상태",
    render: (item) => (
      <div className="flex justify-center">
        <Badge variant={item.employmentStatus}>
          {USER_EMPLOYMENT_STATUS[item.employmentStatus]}
        </Badge>
      </div>
    ),
  },
  {
    key: "joinedAt",
    label: "입사일",
    render: (item) => (
      <p className="text-center">{formatDate(item.joinedAt)}</p>
    ),
  },
  {
    key: "actions",
    label: "",
    render: (item) => {
      return item.isApproved ? (
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
              onClick={() => onDeactivate([item.id])}
            >
              <Trash2Icon className="size-4" />
              비활성화
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="default" onClick={() => onApprove(item.id)}>
          승인
        </Button>
      );
    },
  },
];
