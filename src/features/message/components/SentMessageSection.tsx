"use client";

import { useEffect }           from "react";
import { useSession }          from "@/shared/hooks/useSession";
import { useMessageStore }     from "@/features/message/store";
import { useSentMessages }     from "@/features/message/query";
import { MessageContactModal } from "./MessageContactModal";
import { MessageModal }        from "./form/MessageModal";
import { Button }              from "@/shared/components/ui/button";
import { SquarePen }           from "lucide-react";

export function SentMessageSection() {
  const { data: user } = useSession();
  const { openContactModal, reset } = useMessageStore();
  const { data: messages = [], isLoading } = useSentMessages();

  useEffect(() => { reset(); }, [user?.id]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[18px] font-bold text-slate-900">보낸 쪽지</h1>
        <Button variant="primary" size="sm" onClick={openContactModal}>
          <SquarePen className="w-3.5 h-3.5" />
          새 쪽지
        </Button>
      </div>

      <div className="border border-slate-200 rounded overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#f5f6f8] border-b border-slate-200">
              <th className="px-4 py-2.5 text-[11.5px] font-semibold text-slate-500 text-left">받는 사람</th>
              <th className="px-4 py-2.5 text-[11.5px] font-semibold text-slate-500 text-left">내용</th>
              <th className="px-4 py-2.5 text-[11.5px] font-semibold text-slate-500 text-left w-[140px]">날짜</th>
              <th className="px-4 py-2.5 text-[11.5px] font-semibold text-slate-500 text-center w-[80px]">보기</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[12px] text-slate-400">
                  불러오는 중...
                </td>
              </tr>
            ) : messages.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[12px] text-slate-400">
                  보낸 쪽지가 없습니다.
                </td>
              </tr>
            ) : (
              messages.map((msg: any) => (
                <tr key={msg.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#0069A8] text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
                        {msg.receiver?.name?.slice(0, 1)}
                      </div>
                      <p className="text-[12.5px] font-medium text-slate-900">{msg.receiver?.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-slate-500 max-w-[300px] truncate">
                    {msg.content}
                  </td>
                  <td className="px-4 py-3 text-[11.5px] text-slate-400">
                    {msg.sentAt ? new Date(msg.sentAt).toLocaleString("ko-KR", {
                      month: "2-digit", day: "2-digit",
                      hour: "2-digit", minute: "2-digit",
                    }) : "-"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Button variant="outline" size="sm" onClick={() => useMessageStore.getState().openViewModal(msg)}>
                      보기
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <MessageContactModal />
      <MessageModal />
    </div>
  );
}