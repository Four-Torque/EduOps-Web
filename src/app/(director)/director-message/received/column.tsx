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
    className: "w-[15%]",
    render: (item: Message) => (
      <div className=" gap-2.5">
        <div className="gap-1.5">
          <p className="text-[12.5px] text-center font-medium text-slate-900">
            {item.sender?.name}
          </p>
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
    className: "w-[10%]",
    render: (item: Message) => (
      <p className="text-[11.5px] text-center w-full text-slate-400">
        {item.createdAt
          ? formatDistanceToNow(new Date(item.createdAt), {
              addSuffix: true,
              locale: ko,
            })
          : "-"}
      </p>
    ),
  },
  {
    key: "actions",
    label: "보기",
    className: "w-[10%]",
    render: (item: Message) => (
      <div className="flex justify-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          className="text-[11.5px] text-slate-500"
          onClick={() =>
            useMessageStore.getState().openViewModal(item, "RECEIVED")
          }
        >
          보기
        </Button>
      </div>
    ),
  },
];
