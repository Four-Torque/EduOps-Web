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
      <div className=" gap-2.5">
        <div className="gap-1.5">
          <p className="text-[12.5px] font-medium text-slate-900">{item.sender?.name}</p>
          {!item.isRead && (
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
          )}
        </div>
      </div>
    ),
  },
  {
    key: "title",
    label: "제목",
    type: "text",
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