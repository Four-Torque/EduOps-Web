"use client";

import { useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { useMessageStore } from "@/features/message/store";
import { useGroupedContacts } from "@/features/message/query";
import type {
  MessageContact,
  MessageContactGroup,
} from "@/features/message/type";
import { USER_ROLES } from "@/features/user/constants";

export function MessageContactModal() {
  const ref = useRef<HTMLDivElement>(null);
  const {
    isContactModalOpen,
    searchQuery,
    setSearchQuery,
    closeContactModal,
    openComposeModal,
  } = useMessageStore();

  const { data: groups = [], isLoading } = useGroupedContacts();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContactModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeContactModal]);

  if (!isContactModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={closeContactModal}
    >
      <div
        ref={ref}
        className="bg-white rounded-lg shadow-xl w-[360px] overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <h2 className="text-[13px] font-semibold text-slate-800">
            받는 사람 선택
          </h2>
          <button
            onClick={closeContactModal}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-4 py-2.5 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="이름 검색..."
              className="pl-8 text-[12.5px]"
            />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[320px]">
          {isLoading ? (
            <p className="text-[12px] text-slate-400 text-center py-6">
              불러오는 중...
            </p>
          ) : groups.length === 0 ? (
            <p className="text-[12px] text-slate-400 text-center py-6">
              검색 결과가 없습니다.
            </p>
          ) : (
            groups.map((group: MessageContactGroup) => (
              <div key={group.role}>
                <p className="px-4 py-2 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wide bg-slate-50">
                  {USER_ROLES[group.role]}
                </p>
                {group.contacts.map((contact: MessageContact) => (
                  <button
                    key={contact.id}
                    onClick={() => openComposeModal(contact)}
                    className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0069A8] text-white text-[12px] font-semibold flex items-center justify-center shrink-0">
                      {contact.name?.slice(0, 1)}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
