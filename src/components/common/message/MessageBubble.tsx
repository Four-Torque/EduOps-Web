import type { ChatMessage } from "@/types/message/message.types";

interface MessageBubbleProps {
  message: ChatMessage;
  avatarInitial: string;
}

export function MessageBubble({ message, avatarInitial }: MessageBubbleProps) {
  return (
    <div className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}>
      {/* 상대방 아바타 */}
      {!message.isMine && (
        <div className="w-7 h-7 rounded-full bg-[#0069A8] text-white text-[11px] font-semibold flex items-center justify-center shrink-0 mr-2 mt-0.5">
          {avatarInitial}
        </div>
      )}

      <div className={`flex flex-col ${message.isMine ? "items-end" : "items-start"} max-w-[70%]`}>
        {/* 말풍선 */}
        <div
          className={[
            "px-3.5 py-2.5 text-[12.5px] leading-relaxed whitespace-pre-wrap",
            message.isMine
              ? "bg-slate-800 text-white rounded-2xl rounded-tr-sm"
              : "bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm",
          ].join(" ")}
        >
          {message.content}
        </div>
        {/* 시간 */}
        <p className="text-[10px] text-slate-400 mt-1">{message.sentAt}</p>
      </div>
    </div>
  );
}
