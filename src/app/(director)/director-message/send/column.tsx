import type { ColumnProps } from "@/shared/components/Table";
import type { Message } from "@/features/message/type";
import { Button } from "@/shared/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useMessageStore } from "@/features/message/store";

export const getSentColumns = (): ColumnProps[] => [
  {
    key: "receiver",
    label: "받는 사람",
    className: "w-[15%]",
    render: (item: Message) => (
      <div className="gap-2.5">
        <p className="text-[12.5px] font-medium text-slate-900 text-center">
          {item.receiver?.name}
        </p>
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
      <p className="text-[11.5px] text-slate-400 text-center">
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
          onClick={() => useMessageStore.getState().openViewModal(item, "SENT")}
        >
          보기
        </Button>
      </div>
    ),
  },
];
