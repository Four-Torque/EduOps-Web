"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { PaymentStatusBadge }   from "./PaymentStatusBadge";
import { PaymentStatusPopover } from "./PaymentStatusPopover";
import { PaymentFilterTabs }    from "./PaymentFilterTabs";
import { PAYMENT_TABLE_COLUMNS } from "../../../constants/payment.constants";
import { usePaymentStore }       from "../../../store/payment.store";
import { usePaymentUsers, useUpdatePaymentUserStatus, useDeletePaymentUsers } from "../../../hooks/usePaymentUsers";
import type { PaymentApprovalStatus, PaymentUser } from "../../../types/payment.types";

interface PopoverState {
  userId: number;
  rect: DOMRect;
}

export function PaymentUserTable() {
  const {
    date, tab, selectedIds,
    setDate, setTab,
    toggleSelect, toggleSelectAll,
  } = usePaymentStore();

  const { data, isLoading }        = usePaymentUsers();
  const { mutate: updateStatus }   = useUpdatePaymentUserStatus();
  const { mutate: deleteUsers }    = useDeletePaymentUsers();

  const [popover, setPopover] = useState<PopoverState | null>(null);

  const items      = data?.items      ?? [];
  const totalItems = data?.totalItems ?? 0;

  const allChecked = items.length > 0 && items.every((u) => selectedIds.includes(u.id));

  const handleStatusSelect = (status: PaymentApprovalStatus) => {
    if (!popover) return;
    updateStatus({ userId: popover.userId, status });
  };

  return (
    <div>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[18px] font-bold text-slate-900">사용자 목록</h1>
        <button
          onClick={() => deleteUsers(selectedIds)}
          disabled={selectedIds.length === 0}
          className="text-[11.5px] font-medium text-slate-500 border border-slate-300 bg-white px-3 py-1.5 rounded hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          선택 삭제
        </button>
      </div>

      <div className="border border-slate-200 rounded">
        {/* 날짜 필터 */}
        <div className="px-4 py-3 border-b border-slate-200">
          <div className="flex items-center gap-2 w-fit border border-slate-300 rounded px-3 py-1.5 bg-white cursor-pointer hover:bg-slate-50 transition-colors">
            <span className="text-[12.5px] text-slate-700">{date}</span>
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* 탭 */}
        <PaymentFilterTabs active={tab} onChange={setTab} />

        {/* 테이블 */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-[#f5f6f8]">
              <th className="px-3.5 py-[9px] w-10">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={() => toggleSelectAll(items.map((u) => u.id))}
                  className="w-3.5 h-3.5 accent-[#0069A8]"
                />
              </th>
              {PAYMENT_TABLE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="px-3.5 py-[9px] text-[11.5px] font-semibold text-slate-500 text-left"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-3.5 py-8 text-center text-[12px] text-slate-400">
                  불러오는 중...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3.5 py-8 text-center text-[12px] text-slate-400">
                  해당 조건의 사용자가 없습니다.
                </td>
              </tr>
            ) : (
              items.map((user: PaymentUser) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-100 last:border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-3.5 py-2.5 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(user.id)}
                      onChange={() => toggleSelect(user.id)}
                      className="w-3.5 h-3.5 accent-[#0069A8]"
                    />
                  </td>
                  <td className="px-3.5 py-2.5 text-[12px] text-slate-500">{user.id}</td>
                  <td className="px-3.5 py-2.5 text-[12.5px] font-medium text-slate-800">{user.name}</td>
                  <td className="px-3.5 py-2.5 text-[12.5px] text-slate-600">{user.phone}</td>
                  <td className="px-3.5 py-2.5 text-[12px] text-slate-400">{user.requestedAt}</td>
                  <td className="px-3.5 py-2.5 text-[12.5px] text-slate-700">{user.role}</td>
                  <td className="px-3.5 py-2.5">
                    <PaymentStatusBadge
                      status={user.status}
                      onClick={(e) => {
                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        setPopover((prev) =>
                          prev?.userId === user.id ? null : { userId: user.id, rect },
                        );
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* 하단 총 건수 */}
        {!isLoading && totalItems > 0 && (
          <div className="px-3.5 py-2.5 border-t border-slate-100">
            <p className="text-[11px] text-slate-400">총 {totalItems}명</p>
          </div>
        )}
      </div>

      {/* 팝오버 */}
      {popover && (
        <PaymentStatusPopover
          anchorRect={popover.rect}
          onSelect={handleStatusSelect}
          onClose={() => setPopover(null)}
        />
      )}
    </div>
  );
}