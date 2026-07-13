"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Pagination } from "./Pagination";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface PopoverState {
  itemId: string;
  rect: DOMRect;
}

export interface ColumnProps {
  key: string;
  label: string;
  type?: "text" | "number" | "money" | "date";
  className?: string;
  render?: (item: any) => React.ReactNode;
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
  onPageChange?: (page: number) => void;
  currentPage?: number;
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
  createButtonLabel = "생성",
  onPageChange,
  currentPage,
}: TableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const urlPage = searchParams.get("page") || "1";
  const activePage = currentPage !== undefined ? currentPage : Number(urlPage);

  const items = data?.data ?? [];
  const totalItems = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const allChecked =
    items.length > 0 &&
    items.every((item: any) => selectedIds.includes(String(item[rowKey])));

  useEffect(() => {
    setSelectedIds([]);
  }, [items?.length]);

  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  function toggleSelectAll() {
    if (allChecked) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item: any) => String(item[rowKey])));
    }
  }

  function handleDelete(ids: string[]) {
    if (onDelete) {
      onDelete(ids);
      setSelectedIds([]);
    }
  }

  const totalColSpan = columns.length + (showCheckbox ? 1 : 0);

  return (
    <div>
      <TableActions
        onDelete={onDelete ? handleDelete : undefined}
        onCreate={onCreate}
        selectedIds={selectedIds}
        deleteButtonLabel={deleteButtonLabel}
        createButtonLabel={createButtonLabel}
      />

      <div className="border border-slate-200 rounded overflow-x-auto">
        <table className="w-full border-collapse">
          <TableHeader
            columns={columns}
            showCheckbox={showCheckbox}
            allChecked={allChecked}
            onToggleSelectAll={toggleSelectAll}
          />
          <TableBody
            items={items}
            columns={columns}
            isLoading={isLoading}
            showCheckbox={showCheckbox}
            rowKey={rowKey}
            selectedIds={selectedIds}
            totalColSpan={totalColSpan}
            onToggleSelect={toggleSelect}
          />
        </table>

        {!isLoading && (
          <div className="flex items-center justify-between px-3.5 py-2.5 border-t border-slate-100">
            <p className="text-[11px] text-slate-400">총 {totalItems}건</p>
            {totalItems > 0 && (
              <Pagination currentPage={activePage} totalPages={totalPages} onPageChange={onPageChange} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TableActions({
  onDelete,
  onCreate,
  selectedIds,
  deleteButtonLabel,
  createButtonLabel,
}: {
  onDelete?: (selectedIds: string[]) => void;
  onCreate?: () => void;
  selectedIds: string[];
  deleteButtonLabel: string;
  createButtonLabel: string;
}) {
  if (!onDelete && !onCreate) return null;
  return (
    <div className="w-full flex justify-between items-center mb-2">
      <div>
        {onDelete && (
          <button
            type="button"
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
            type="button"
            onClick={onCreate}
            className="cursor-pointer text-[11.5px] font-medium text-white border border-slate-300 bg-primary px-3 py-1.5 rounded hover:bg-primary/80 transition-colors"
          >
            {createButtonLabel}
          </button>
        )}
      </div>
    </div>
  );
}

function TableHeader({
  columns,
  showCheckbox,
  allChecked,
  onToggleSelectAll,
}: {
  columns: ColumnProps[];
  showCheckbox: boolean;
  allChecked: boolean;
  onToggleSelectAll: () => void;
}) {
  return (
    <thead>
      <tr className="border-b border-slate-200 bg-[#f5f6f8]">
        {showCheckbox && (
          <th className="px-3.5 py-2.25 w-10">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={onToggleSelectAll}
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
  );
}

function TableBody({
  items,
  columns,
  isLoading,
  showCheckbox,
  rowKey,
  selectedIds,
  totalColSpan,
  onToggleSelect,
}: {
  items: any[];
  columns: ColumnProps[];
  isLoading?: boolean;
  showCheckbox: boolean;
  rowKey: string;
  selectedIds: string[];
  totalColSpan: number;
  onToggleSelect: (id: string) => void;
}) {
  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={totalColSpan}
            className="px-3.5 py-8 text-center text-[12px] text-slate-400"
          >
            불러오는 중...
          </td>
        </tr>
      </tbody>
    );
  }

  if (items.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={totalColSpan}
            className="px-3.5 py-8 text-center text-[12px] text-slate-400"
          >
            데이터가 존재하지 않습니다.
          </td>
        </tr>
      </tbody>
    );
  }

  function renderCellValue(item: any, col: ColumnProps) {
    if (col.render) return col.render(item);

    const rawValue = item[col.key];
    if (rawValue !== undefined && rawValue !== null && rawValue !== "") {
      const numericValue = Number(rawValue);
      if (!isNaN(numericValue)) {
        if (col.type === "money") return `₩${numericValue.toLocaleString()}`;
        if (col.type === "number") return numericValue.toLocaleString();
      }
      if (col.type === "date")
        return format(new Date(rawValue), "yyyy-MM-dd", { locale: ko });
    }
    return rawValue ?? "-";
  }

  return (
    <tbody>
      {items.map((item) => {
        const rowId = String(item[rowKey]);
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
                  onChange={() => onToggleSelect(rowId)}
                  className="w-3.5 h-3.5 accent-primary cursor-pointer"
                />
              </td>
            )}
            {columns.map((col) => (
              <td
                key={col.key}
                className="px-3.5 py-2.5 text-[12.5px] text-center text-slate-600"
              >
                {renderCellValue(item, col)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}
