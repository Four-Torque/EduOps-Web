import { ColumnProps } from "@/shared/components/Table";
import type { AssetApplication } from "@/features/asset/type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";

interface StatusStyle {
  label: string;
  color: string;
  background: string;
}

const STATUS_STYLE: Record<string, string> = {
  PENDING: "text-slate-500 bg-slate-100",
  ACCEPTED: "text-emerald-700 bg-emerald-50",
  REJECTED: "text-red-600 bg-red-50",
};

const STATUS_LABEL: Record<string, string> = {
  PENDING: "대기",
  ACCEPTED: "승인",
  REJECTED: "반려",
};

export const getAssetApplicationsColumns = (
  onEditStatus?: (id: string, status: string) => void,
): ColumnProps[] => [
  {
    key: "assetName",
    label: "품목",
    render: (item: AssetApplication) => (
      <p className="w-full text-[12px] text-center">{item.assetName}</p>
    ),
  },
  {
    key: "categoryName",
    label: "분류",
    render: (item: AssetApplication) => (
      <p className="w-full text-[12px] text-center">{item.categoryName}</p>
    ),
  },
  {
    key: "quantity",
    label: "수량",
    render: (item: AssetApplication) => (
      <p className="w-full text-[12px] text-center">{item.quantity}</p>
    ),
  },
  {
    key: "stock",
    label: "재고",
    render: (item: AssetApplication) => (
      <p className="w-full text-[12px] text-center">{item.stock}</p>
    ),
  },
  {
    key: "price",
    label: "금액",
    render: (item: AssetApplication) => {
      return (
        <p className="w-full text-[12px] text-right">{`${item.price.toLocaleString()}원`}</p>
      );
    },
  },
  {
    key: "vendorName",
    label: "구매처",
    render: (item: AssetApplication) => (
      <p className="w-full text-[12px] text-center">{item.vendorName}</p>
    ),
  },
  {
    key: "userName",
    label: "신청자",
    render: (item: AssetApplication) => (
      <p className="w-full text-[12px] text-center">{item.userName}</p>
    ),
  },
  {
    key: "status",
    label: "상태",
    render: (item: AssetApplication) => {
      const STATUS_STYLE: Record<string, StatusStyle> = {
        PENDING: {
          label: "대기",
          color: "text-slate-500",
          background: "bg-slate-100",
        },
        ACCEPTED: {
          label: "승인",
          color: "text-emerald-700",
          background: "bg-emerald-50",
        },
        REJECTED: {
          label: "반려",
          color: "text-red-600",
          background: "bg-red-50",
        },
      };

      return (
        <>
          {item.status === "PENDING" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span
                  className={cn(
                    "inline-block text-[10.5px] font-medium px-2.5 py-0.5 rounded-full text-center cursor-pointer w-full",
                    STATUS_STYLE[item.status]?.color ?? "text-slate-500",
                    STATUS_STYLE[item.status]?.background ?? "bg-slate-100",
                  )}
                >
                  {STATUS_STYLE[item.status]?.label ?? item.status}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-20">
                <DropdownMenuItem
                  onClick={() => onEditStatus?.(item.id, "ACCEPTED")}
                  className="text-[12px] cursor-pointer text-slate-700"
                >
                  승인
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onEditStatus?.(item.id, "REJECTED")}
                  className="text-[12px] cursor-pointer text-red-600 focus:text-red-600"
                >
                  반려
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <span
              className={cn(
                "inline-block text-[10.5px] font-medium px-2.5 py-0.5 rounded-full text-center w-full",
                STATUS_STYLE[item.status]?.color ?? "text-slate-500",
                STATUS_STYLE[item.status]?.background ?? "bg-slate-100",
              )}
            >
              {STATUS_STYLE[item.status]?.label ?? item.status}
            </span>
          )}
        </>
      );
    },
  },
];
