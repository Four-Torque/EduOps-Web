import { ColumnProps } from "@/shared/components/Table";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";

interface VendorColumnProps {
  onEdit: (id: string) => void;
  onDelete: (ids: string[]) => void;
}

export const getVendorColumns = ({
  onEdit,
  onDelete,
}: VendorColumnProps): ColumnProps[] => [
  { key: "name", label: "업체명", type: "text" },
  { key: "email", label: "이메일", type: "text" },
  { key: "phone", label: "전화번호", type: "text" },
  { key: "createdAt", label: "최초 등록일", type: "date" },
  {
    key: "actions",
    label: "",
    render: (item) => {
      return (
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
      );
    },
  },
];
