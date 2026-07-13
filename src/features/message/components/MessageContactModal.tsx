"use client";

import { useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import type { MessageContact } from "@/features/message/type";

interface ContactGroup {
  label: string;
  contacts: MessageContact[];
}

interface MessageContactModalProps {
  groups: ContactGroup[];
  onSelect: (contact: MessageContact) => void;
  onClose: () => void;
}

export function MessageContactModal({
  groups,
  onSelect,
  onClose,
}: MessageContactModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        ref={ref}
        className="bg-white rounded-lg shadow-xl w-[360px] overflow-hidden"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <h2 className="text-[13px] font-semibold text-slate-800">
            새 메시지
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 검색 */}
        <div className="px-4 py-2.5 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <Input placeholder="이름 검색..." className="pl-8 text-[12.5px]" />
          </div>
        </div>

        {/* 연락처 그룹 */}
        <div className="overflow-y-auto max-h-[320px]">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="px-4 py-2 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wide bg-slate-50">
                {group.label}
              </p>
              {group.contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => onSelect(contact)}
                  className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0069A8] text-white text-[12px] font-semibold flex items-center justify-center shrink-0">
                    {contact.avatarInitial}
                  </div>
                  <div>
                    <p className="text-[12.5px] font-medium text-slate-800">
                      {contact.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {contact.department}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
