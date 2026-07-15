"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button }          from "@/shared/components/ui/button";
import { Input }           from "@/shared/components/ui/input";
import { useMessageStore } from "@/features/message/store";

export function MessageModal() {
  const {
    modalMode,
    selectedMessage,
    composeTarget,
    closeModal,
    openReplyModal,
  } = useMessageStore();

  const [content, setContent] = useState("");

  const isOpen = modalMode !== null;

  function handleSend() {
    if (!content.trim()) return;
    // TODO: API 연동
    setContent("");
    closeModal();
  }

  function handleClose() {
    setContent("");
    closeModal();
  }

  const title =
    modalMode === "view"    ? "쪽지 보기"   :
    modalMode === "reply"   ? "답장"        :
    modalMode === "compose" ? "새 쪽지"     : "";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* 보기 모드 */}
          {modalMode === "view" && selectedMessage && (
            <>
              {/* 보낸 사람 */}
              <div>
                <p className="text-[11.5px] font-medium text-slate-500 mb-1.5">보낸 사람</p>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded">
                  <div className="w-6 h-6 rounded-full bg-[#0069A8] text-white text-[10px] font-semibold flex items-center justify-center shrink-0">
                    {selectedMessage.sender.avatarInitial}
                  </div>
                  <p className="text-[12.5px] font-medium text-slate-800">
                    {selectedMessage.sender.name}
                  </p>
                </div>
              </div>

              {/* 내용 (readonly) */}
              <div>
                <p className="text-[11.5px] font-medium text-slate-500 mb-1.5">내용</p>
                <textarea
                  value={selectedMessage.content}
                  readOnly
                  rows={6}
                  className="w-full border border-slate-200 rounded px-3 py-2.5 text-[12.5px] text-slate-700 outline-none resize-none bg-slate-50 cursor-default"
                />
              </div>

              {/* 버튼 */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={handleClose}>닫기</Button>
                <Button variant="primary" size="sm" onClick={openReplyModal}>답장</Button>
              </div>
            </>
          )}

          {/* 답장 / 새 쪽지 모드 */}
          {(modalMode === "reply" || modalMode === "compose") && (
            <>
              {/* 받는 사람 */}
              <div>
                <p className="text-[11.5px] font-medium text-slate-500 mb-1.5">받는 사람</p>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded">
                  <div className="w-6 h-6 rounded-full bg-[#0069A8] text-white text-[10px] font-semibold flex items-center justify-center shrink-0">
                    {composeTarget?.avatarInitial}
                  </div>
                  <p className="text-[12.5px] font-medium text-slate-800">
                    {composeTarget?.name}
                  </p>
                </div>
              </div>

              {/* 내용 입력 */}
              <div>
                <p className="text-[11.5px] font-medium text-slate-500 mb-1.5">내용</p>
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
                <Button variant="outline" size="sm" onClick={handleClose}>취소</Button>
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
