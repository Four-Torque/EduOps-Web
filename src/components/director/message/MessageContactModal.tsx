"use client";

import { useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import { MOCK_CONTACTS, ROLE_LABEL } from "@/constants/director/message.constants";
import { useMessageStore } from "@/store/director/message.store";
import type { MessageContact } from "@/types/director/message.types";

export function MessageContactModal() {
  const { closeNewMessageModal, createChatRoom } = useMessageStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNewMessageModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeNewMessageModal]);

  const teachers = MOCK_CONTACTS.filter((c) => c.role === "teacher");
  const managers = MOCK_CONTACTS.filter((c) => c.role === "manager");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div ref={ref} className="bg-white rounded-lg shadow-xl w-[360px] overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <h2 className="text-[13px] font-semibold text-slate-800">새 메시지</h2>
          <button onClick={closeNewMessageModal} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 검색 */}
        <div className="px-4 py-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-50 rounded-md">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              placeholder="이름 검색..."
              className="flex-1 text-[12.5px] bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* 연락처 목록 */}
        <div className="overflow-y-auto max-h-[320px]">
          <ContactGroup label="강사" contacts={teachers} onSelect={createChatRoom} />
          <ContactGroup label="관리자" contacts={managers} onSelect={createChatRoom} />
        </div>
      </div>
    </div>
  );
}

function ContactGroup({
  label,
  contacts,
  onSelect,
}: {
  label: string;
  contacts: MessageContact[];
  onSelect: (id: number) => void;
}) {
  return (
    <div>
      <p className="px-4 py-2 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wide bg-slate-50">
        {label}
      </p>
      {contacts.map((contact) => (
        <button
          key={contact.id}
          onClick={() => onSelect(contact.id)}
          className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-full bg-[#0069A8] text-white text-[12px] font-semibold flex items-center justify-center shrink-0">
            {contact.avatarInitial}
          </div>
          <div>
            <p className="text-[12.5px] font-medium text-slate-800">{contact.name}</p>
            <p className="text-[11px] text-slate-400">{contact.department}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
