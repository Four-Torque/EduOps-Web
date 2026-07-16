"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useMessageStore } from "@/features/message/store";
import { useMarkAsRead, useSendMessage } from "../../query";
import { useSession } from "@/shared/hooks/useSession";

export function MessageModal() {
  const {
    modalMode,
    selectedMessage,
    composeTarget,
    closeModal,
    openReplyModal,
    viewMode,
  } = useMessageStore();
  const { data: user } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { mutate: sendMessage } = useSendMessage();
  const { mutate: markAsRead } = useMarkAsRead();

  const isOpen = modalMode !== null;

  useEffect(() => {
    if (
      isOpen &&
      selectedMessage?.receiverId === user?.id &&
      !selectedMessage?.isRead
    ) {
      markAsRead(selectedMessage?.id);
    }
  }, [isOpen, selectedMessage, user?.id, markAsRead]);

  function handleSend() {
    if (!title.trim()) return;
    if (!content.trim()) return;
    if (!composeTarget?.id) return;
    sendMessage({ title, content, receiverId: composeTarget?.id });
    setTitle("");
    setContent("");
    closeModal();
  }

  function handleClose() {
    setTitle("");
    setContent("");
    closeModal();
  }

  const modalTitle =
    modalMode === "view"
      ? "쪽지 보기"
      : modalMode === "reply"
        ? "답장"
        : modalMode === "compose"
          ? "새 쪽지"
          : "";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* 보기 모드 */}
          {modalMode === "view" && selectedMessage && (
            <>
              {/* 보낸 사람 */}
              <div>
                <p className="text-[11.5px] font-medium text-slate-500 mb-1.5">
                  {viewMode === "RECEIVED" ? "보낸 사람" : "받는 사람"}
                </p>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded">
                  <div className="w-6 h-6 rounded-full bg-[#0069A8] text-white text-[10px] font-semibold flex items-center justify-center shrink-0">
                    {viewMode === "RECEIVED"
                      ? selectedMessage.sender?.name?.slice(0, 1)
                      : selectedMessage.receiver?.name?.slice(0, 1)}
                  </div>
                  <p className="text-[12.5px] font-medium text-slate-800">
                    {viewMode === "RECEIVED"
                      ? selectedMessage.sender?.name
                      : selectedMessage.receiver?.name}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[11.5px] font-medium text-slate-500 mb-1.5">
                  제목
                </p>
                <Input
                  value={selectedMessage.title}
                  readOnly
                  className="text-[12.5px] text-slate-700 placeholder:text-slate-400"
                />
              </div>

              {/* 내용 (readonly) */}
              <div>
                <p className="text-[11.5px] font-medium text-slate-500 mb-1.5">
                  내용
                </p>
                <textarea
                  value={selectedMessage.content}
                  readOnly
                  rows={6}
                  className="w-full border border-slate-200 rounded px-3 py-2.5 text-[12.5px] text-slate-700 outline-none resize-none bg-slate-50 cursor-default"
                />
              </div>

              {/* 버튼 */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={handleClose}>
                  닫기
                </Button>
                <Button variant="primary" size="sm" onClick={openReplyModal}>
                  답장
                </Button>
              </div>
            </>
          )}

          {/* 답장 / 새 쪽지 모드 */}
          {(modalMode === "reply" || modalMode === "compose") && (
            <>
              {/* 받는 사람 */}
              <div>
                <p className="text-[11.5px] font-medium text-slate-500 mb-1.5">
                  받는 사람
                </p>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded">
                  <div className="w-6 h-6 rounded-full bg-[#0069A8] text-white text-[10px] font-semibold flex items-center justify-center shrink-0">
                    {composeTarget?.name?.slice(0, 1)}
                  </div>
                  <p className="text-[12.5px] font-medium text-slate-800">
                    {composeTarget?.name}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[11.5px] font-medium text-slate-500 mb-1.5">
                  제목
                </p>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력해주세요..."
                  className="text-[12.5px] text-slate-700 placeholder:text-slate-400"
                />
              </div>

              {/* 내용 입력 */}
              <div>
                <p className="text-[11.5px] font-medium text-slate-500 mb-1.5">
                  내용
                </p>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="메시지를 입력해주세요..."
                  rows={6}
                  className="w-full border border-slate-200 rounded px-3 py-2.5 text-[12.5px] text-slate-700 placeholder:text-slate-400 outline-none resize-none focus:border-slate-400 transition-colors"
                />
              </div>

              {/* 버튼 */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={handleClose}>
                  취소
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSend}
                  disabled={!content.trim()}
                >
                  보내기
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
