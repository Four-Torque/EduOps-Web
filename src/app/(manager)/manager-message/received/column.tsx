import type { ColumnProps } from "@/shared/components/Table";
import type { Message } from "@/features/message/type";
import { Button } from "@/shared/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useMessageStore } from "@/features/message/store";

export const getReceivedColumns = (): ColumnProps[] => [
  {
    key: "sender",
    label: "보낸 사람",
    render: (item: Message) => (
      <p className="text-[12.5px] font-medium text-slate-900">{item.sender?.name}</p>
    ),
  },
  {
    key: "title",
    label: "제목",
    render: (item: Message) => (
      <div className="flex items-center gap-2">
        {!item.isRead && (
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 animate-pulse" />
        )}
        <span
          className={`text-[12.5px] truncate ${
            !item.isRead ? "font-semibold text-slate-900" : "text-slate-600"
          }`}
        >
          {item.title}
        </span>
      </div>
    ),
  },
  {
    key: "createdAt",
    label: "날짜",
    render: (item: Message) => (
      <span className="text-[11.5px] text-slate-400">
        {item.createdAt
          ? formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: ko })
          : "-"}
      </span>
    ),
  },
  {
    key: "actions",
    label: "보기",
    render: (item: Message) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => useMessageStore.getState().openViewModal(item, "RECEIVED")}
      >
        보기
      </Button>
    ),
  },
];