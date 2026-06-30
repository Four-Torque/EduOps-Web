"use client";

import { useState } from "react";
import { InventoryStatusBadge }   from "./InventoryStatusBadge";
import { InventoryStatusPopover } from "./InventoryStatusPopover";
import { InventoryFilterBar }     from "./InventoryFilterBar";
import { Pagination }             from "@/components/common/Pagination";
import { INVENTORY_TABLE_COLUMNS }                                                     from "@/constants/director/inventory.constants";
import { useInventoryStore }                                                            from "@/store/director/inventory.store";
import { useInventoryItems, useUpdateInventoryStatus, useDeleteInventoryItems }         from "@/hooks/director/inventory.hooks";
import type { InventoryItem, InventoryPaymentStatus }                                   from "@/types/director/inventory.types";

interface PopoverState {
  itemId: number;
  rect: DOMRect;
}

export function InventoryTable() {
  const {
    statusFilter, page, selectedIds,
    setStatusFilter, setPage,
    toggleSelect, toggleSelectAll,
  } = useInventoryStore();

  const { data, isLoading }      = useInventoryItems();
  const { mutate: updateStatus } = useUpdateInventoryStatus();
  const { mutate: deleteItems }  = useDeleteInventoryItems();

  const [popover, setPopover] = useState<PopoverState | null>(null);

  const items      = (data?.items      ?? []) as InventoryItem[];
  const totalItems = data?.totalItems ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const allChecked = items.length > 0 && items.every((item: InventoryItem) => selectedIds.includes(item.id));

  const handleStatusSelect = (status: InventoryPaymentStatus) => {
    if (!popover) return;
    updateStatus({ id: popover.itemId, status });
  };

  return (
    <div>
      <h1 className="text-[18px] font-bold text-slate-900 mb-4">장비 관리</h1>

      {/* 필터 */}
      <InventoryFilterBar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* 리스트 헤더 */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[15px] font-bold text-slate-900">자재물 리스트</h2>
        <button
          onClick={() => deleteItems(selectedIds)}
          disabled={selectedIds.length === 0}
          className="text-[11.5px] font-medium text-slate-500 border border-slate-300 bg-white px-3 py-1.5 rounded hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          선택 삭제
        </button>
      </div>

      {/* 테이블 */}
      <div className="border border-slate-200 rounded">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-[#f5f6f8]">
              <th className="px-3.5 py-[9px] w-10">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={() => toggleSelectAll(items.map((item: InventoryItem) => item.id))}
                  className="w-3.5 h-3.5 accent-[#0069A8]"
                />
              </th>
              {INVENTORY_TABLE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="px-3.5 py-[9px] text-[11.5px] font-semibold text-slate-500 text-center"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="px-3.5 py-8 text-center text-[12px] text-slate-400">
                  불러오는 중...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-3.5 py-8 text-center text-[12px] text-slate-400">
                  해당 조건의 자재물이 없습니다.
                </td>
              </tr>
            ) : (
              items.map((item: InventoryItem) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 last:border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-3.5 py-2.5 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="w-3.5 h-3.5 accent-[#0069A8]"
                    />
                  </td>
                  <td className="px-3.5 py-2.5 text-[12.5px] text-center text-slate-800">{item.name}</td>
                  <td className="px-3.5 py-2.5 text-[12.5px] text-center text-slate-600">{item.category}</td>
                  <td className="px-3.5 py-2.5 text-[12.5px] text-center text-slate-600">{item.quantity}</td>
                  <td className="px-3.5 py-2.5 text-[12.5px] text-center text-slate-600">{item.supplier}</td>
                  <td className="px-3.5 py-2.5 text-[12.5px] text-center text-slate-600">{item.amount.toLocaleString()}</td>
                  <td className="px-3.5 py-2.5 text-[12.5px] text-center text-slate-600">{item.stock}</td>
                  <td className="px-3.5 py-2.5 text-[12.5px] text-center text-slate-600">{item.requester}</td>
                  <td className="px-3.5 py-2.5 text-center">
                    <InventoryStatusBadge
                      status={item.status}
                      onClick={(e) => {
                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        setPopover((prev) =>
                          prev?.itemId === item.id ? null : { itemId: item.id, rect },
                        );
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        {!isLoading && totalItems > 0 && (
          <div className="flex items-center justify-between px-3.5 py-2.5 border-t border-slate-100">
            <p className="text-[11px] text-slate-400">총 {totalItems}건</p>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      {popover && (
        <InventoryStatusPopover
          anchorRect={popover.rect}
          onSelect={handleStatusSelect}
          onClose={() => setPopover(null)}
        />
      )}
    </div>
  );
}