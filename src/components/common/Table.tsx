"use client";

import { useEffect, useState, MouseEvent } from "react";
import { InventoryStatusPopover } from "../director/inventory/InventoryStatusPopover";
import { StatusBadge } from "./StatusBadge";
import { Pagination } from "./Pagination";
import { useSearchParams } from "next/navigation";

interface PopoverState {
  itemId: string;
  rect: DOMRect;
}

interface ColumnProps {
  key: string;
  label: string;
  type?: "text" | "number" | "money";
  className?: string;
  render?: (
    item: any,
    helpers: { openPopover: (id: string, e: React.MouseEvent) => void },
  ) => React.ReactNode;
}

interface TableProps {
  columns: ColumnProps[];
  data?: any;
  isLoading?: boolean;
  rowKey?: string;
  showCheckbox?: boolean;
  onDelete?: (selectedIds: string[]) => void;
  onCreate?: () => void;
  deleteButtonLabel?: string;
  createButtonLabel?: string;
  onEditStatus?: (itemId: string, status: string) => void;
  statusReadonly?: boolean;
}

export function Table({
  columns,
  data,
  isLoading,
  rowKey = "id",
  showCheckbox = true,
  onDelete,
  onCreate,
  deleteButtonLabel = "선택 삭제",
  createButtonLabel = "+ 자재 요청",
  onEditStatus,
  statusReadonly = false,
}: TableProps) {
  const [popover, setPopover] = useState<PopoverState | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const items = data?.data ?? [];
  const totalItems = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const allChecked =
    items.length > 0 &&
    items.every((item: any) => selectedIds.includes(item[rowKey]));

  useEffect(() => {
    setSelectedIds([]);
  }, [items]);

  function openPopover(id: string, e: MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPopover((prev) => (prev?.itemId === id ? null : { itemId: id, rect }));
  }

  function handleStatusSelect(status: string) {
    if (!popover) return;
    if (onEditStatus) {
      onEditStatus(popover.itemId, status);
    }
    setPopover(null);
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  function toggleSelectAll() {
    if (allChecked) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item: any) => item[rowKey]));
    }
  }

  const totalColSpan = columns.length + (showCheckbox ? 1 : 0);

  return (
    <div>
      {(onDelete || onCreate) && (
        <div className="w-full flex justify-between items-center mb-2">
          <div>
            {onDelete && (
              <button
                onClick={() => onDelete(selectedIds)}
                disabled={selectedIds.length === 0}
                className="cursor-pointer text-[11.5px] font-medium text-slate-500 border border-slate-300 bg-white px-3 py-1.5 rounded hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:pointer-events-none"
              >
                {deleteButtonLabel}
              </button>
            )}
          </div>
          <div>
            {onCreate && (
              <button
                onClick={onCreate}
                className="cursor-pointer text-[11.5px] font-medium text-white border border-slate-300 bg-primary px-3 py-1.5 rounded hover:bg-primary/80 transition-colors"
              >
                {createButtonLabel}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="border border-slate-200 rounded overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-[#f5f6f8]">
              {showCheckbox && (
                <th className="px-3.5 py-2.25 w-10">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={() => toggleSelectAll()}
                    className="w-3.5 h-3.5 accent-primary cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-3.5 py-2.25 text-[11.5px] font-semibold text-slate-500 text-center ${col.className ?? ""}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={totalColSpan}
                  className="px-3.5 py-8 text-center text-[12px] text-slate-400"
                >
                  불러오는 중...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td
                  colSpan={totalColSpan}
                  className="px-3.5 py-8 text-center text-[12px] text-slate-400"
                >
                  데이터가 존재하지 않습니다.
                </td>
              </tr>
            ) : (
              items.map((item: any) => {
                const rowId = item[rowKey];
                return (
                  <tr
                    key={rowId}
                    className="border-b border-slate-100 last:border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    {showCheckbox && (
                      <td className="px-3.5 py-2.5 text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(rowId)}
                          onChange={() => toggleSelect(rowId)}
                          className="w-3.5 h-3.5 accent-primary cursor-pointer"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-3.5 py-2.5 text-[12.5px] text-center text-slate-600"
                      >
                        {(() => {
                          if (col.render) {
                            return col.render(item, { openPopover });
                          }
                          if (col.key === "status") {
                            return (
                              <StatusBadge
                                status={item.status}
                                readonly={statusReadonly}
                                onClick={(e) => openPopover(item.id, e)}
                              />
                            );
                          }
                          const rawValue = item[col.key];

                          if (
                            rawValue !== undefined &&
                            rawValue !== null &&
                            rawValue !== ""
                          ) {
                            const numericValue = Number(rawValue);
                            if (!isNaN(numericValue)) {
                              if (col.type === "money") {
                                return `₩${numericValue.toLocaleString()}`;
                              }
                              if (col.type === "number") {
                                return numericValue.toLocaleString();
                              }
                            }
                          }
                          return rawValue ?? "-";
                        })()}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {!isLoading && totalItems > 0 && (
          <div className="flex items-center justify-between px-3.5 py-2.5 border-t border-slate-100">
            <p className="text-[11px] text-slate-400">총 {totalItems}건</p>
            <Pagination currentPage={Number(page)} totalPages={totalPages} />
          </div>
        )}
      </div>

      {onEditStatus && popover && (
        <InventoryStatusPopover
          anchorRect={popover.rect}
          onSelect={handleStatusSelect}
          onClose={() => setPopover(null)}
        />
      )}
    </div>
  );
}
