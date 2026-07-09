"use client";

import { MoreHorizontal } from "lucide-react";
import type { RevenueItem } from "@/features/finance/type";
import { Pagination } from "@/shared/components/Pagination";

interface RevenueTableProps {
  items: RevenueItem[];
  page: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

function formatKRW(amount: number) {
  return amount.toLocaleString("ko-KR") + "원";
}

export function RevenueTable({
  items,
  page,
  totalItems,
  totalPages,
  pageSize,
  onPageChange,
}: RevenueTableProps) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="mb-[18px]">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-t border-b border-slate-200 bg-[#f5f6f8]">
            {["날짜", "항목", "학생", "금액", "상태", "관리"].map((h, i) => (
              <th
                key={h}
                className="px-3.5 py-[9px] text-[11.5px] font-semibold text-slate-500 text-left"
                style={{
                  width:
                    i === 0
                      ? 110
                      : i === 3
                        ? 110
                        : i === 4
                          ? 90
                          : i === 5
                            ? 70
                            : undefined,
                  textAlign: i === 3 ? "right" : "left",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b border-slate-100 last:border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <td className="px-3.5 py-2.5 text-[12px] text-slate-400">
                {item.date}
              </td>

              <td className="px-3.5 py-2.5">
                <p className="text-[12.5px] font-medium text-slate-900 leading-tight">
                  {item.itemTitle}
                </p>
                <p className="text-[10.5px] text-slate-400 mt-0.5">
                  {item.itemSub}
                </p>
              </td>

              <td className="px-3.5 py-2.5 text-[12.5px] text-slate-700">
                {item.studentName}
              </td>

              <td className="px-3.5 py-2.5 text-right text-[12.5px] font-medium text-slate-800">
                {formatKRW(item.amount)}
              </td>

              <td className="px-3.5 py-2.5">
                {item.status === "paid" ? (
                  <span className="inline-block text-[10.5px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    납부완료
                  </span>
                ) : (
                  <span className="inline-block text-[10.5px] font-medium text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full">
                    미납
                  </span>
                )}
              </td>

              <td className="px-3.5 py-2.5">
                <button
                  aria-label="더보기"
                  className="text-slate-300 hover:text-slate-500 transition-colors"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between px-0.5 pt-2.5">
        <p className="text-[11px] text-slate-400 uppercase tracking-wide">
          Showing {start}-{end} of {totalItems} items
        </p>
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
