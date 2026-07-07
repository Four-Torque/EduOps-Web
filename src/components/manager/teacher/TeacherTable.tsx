"use client";

import { Trash2 } from "lucide-react";
import type { TeacherListItem, TeacherStatus } from "@/types/manager/teacher.types";

const TOTAL_COLUMNS = 8;

const STATUS_LABEL: Record<TeacherStatus, string> = {
  WORKING: "재직",
  ON_LEAVE: "휴직",
  RESIGNED: "퇴사",
};

const STATUS_STYLE: Record<TeacherStatus, string> = {
  WORKING: "bg-[#0069A8]/10 text-[#0069A8]",
  ON_LEAVE: "bg-amber-50 text-amber-600",
  RESIGNED: "bg-slate-100 text-slate-400",
};

interface TeacherTableProps {
  teachers: TeacherListItem[];
  isLoading: boolean;
  error: boolean;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onRowClick: (id: string) => void;
  onDelete: (id: string, name: string) => void;
  onPageChange: (page: number) => void;
}

export function TeacherTable({
  teachers,
  isLoading,
  error,
  pageSize,
  currentPage,
  totalPages,
  totalItems,
  onRowClick,
  onDelete,
  onPageChange,
}: TeacherTableProps) {
  return (
    <>
      <table className="w-full table-fixed border-collapse">
        <colgroup>
          <col className="w-[13%]" />
          <col className="w-[18%]" />
          <col className="w-[13%]" />
          <col className="w-[10%]" />
          <col className="w-[10%]" />
          <col className="w-[12%]" />
          <col className="w-[12%]" />
          <col className="w-[12%]" />
        </colgroup>
        <thead>
          <tr className="border-y border-slate-200 bg-[#f5f6f8] text-left">
            <th className="px-3.5 py-[9px] text-[11.5px] font-semibold text-slate-500">강사</th>
            <th className="px-3.5 py-[9px] text-[11.5px] font-semibold text-slate-500">이메일</th>
            <th className="px-3.5 py-[9px] text-[11.5px] font-semibold text-slate-500">연락처</th>
            <th className="px-3.5 py-[9px] text-[11.5px] font-semibold text-slate-500">담당 강좌</th>
            <th className="px-3.5 py-[9px] text-[11.5px] font-semibold text-slate-500">담당 원생</th>
            <th className="px-3.5 py-[9px] text-[11.5px] font-semibold text-slate-500">근무 시작일</th>
            <th className="px-3.5 py-[9px] text-[11.5px] font-semibold text-slate-500">상태</th>
            <th className="px-3.5 py-[9px] text-[11.5px] font-semibold text-slate-500">관리</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={TOTAL_COLUMNS} className="px-3.5 py-8 text-center text-[12px] text-slate-400">
                불러오는 중...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={TOTAL_COLUMNS} className="px-3.5 py-8 text-center text-[12px] text-red-500">
                목록을 불러오지 못했습니다.
              </td>
            </tr>
          ) : teachers.length === 0 ? (
            <tr>
              <td colSpan={TOTAL_COLUMNS} className="px-3.5 py-8 text-center text-[12px] text-slate-400">
                검색 결과가 없습니다.
              </td>
            </tr>
          ) : (
            teachers.map((teacher) => (
              <tr
                key={teacher.id}
                onClick={() => onRowClick(teacher.id)}
                className="h-[45px] cursor-pointer border-b border-slate-100 transition-colors last:border-slate-200 hover:bg-slate-50"
              >
                <td className="h-[45px] truncate overflow-hidden px-3.5 align-middle text-[12.5px] font-medium text-slate-900">{teacher.name}</td>
                <td className="h-[45px] truncate overflow-hidden px-3.5 align-middle text-[12px] text-slate-600">{teacher.email}</td>
                <td className="h-[45px] overflow-hidden px-3.5 align-middle text-[12px] text-slate-600">{teacher.phone}</td>
                <td className="h-[45px] overflow-hidden px-3.5 align-middle text-[12px] text-slate-600">{teacher.classCount}개</td>
                <td className="h-[45px] overflow-hidden px-3.5 align-middle text-[12px] text-slate-600">{teacher.studentCount}명</td>
                <td className="h-[45px] overflow-hidden px-3.5 align-middle text-[12px] text-slate-500">{teacher.hireDate}</td>
                <td className="h-[45px] overflow-hidden px-3.5 align-middle">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[teacher.status]}`}
                  >
                    {STATUS_LABEL[teacher.status]}
                  </span>
                </td>
                <td className="h-[45px] overflow-hidden px-3.5 align-middle">
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(teacher.id, teacher.name);
                      }}
                      className="transition-colors hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
          {/* 마지막 페이지에 인원이 부족해도 테이블 높이를 pageSize만큼 유지 */}
          {!isLoading && !error && teachers.length > 0 && teachers.length < pageSize &&
            Array.from({ length: pageSize - teachers.length }, (_, i) => (
              <tr key={`empty-${i}`} className="h-[45px]">
                <td colSpan={TOTAL_COLUMNS} className="h-[45px] overflow-hidden px-3.5 align-middle text-[12px]">
                  &nbsp;
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {!isLoading && !error && totalItems > 0 && (
        <div className="flex items-center justify-between border-t border-slate-100 px-3.5 py-3">
          <p className="text-[11.5px] text-slate-400">
            총 {totalItems}명 중 {(currentPage - 1) * pageSize + 1}–
            {Math.min(currentPage * pageSize, totalItems)}
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <PageButton label="‹" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PageButton key={p} label={String(p)} active={p === currentPage} onClick={() => onPageChange(p)} />
              ))}
              <PageButton label="›" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

function PageButton({
  label,
  active,
  disabled,
  onClick,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "flex size-6.5 items-center justify-center rounded border text-[11.5px] transition-colors",
        active
          ? "border-[#0069A8] bg-[#0069A8] font-semibold text-white"
          : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50",
        disabled ? "pointer-events-none opacity-40" : "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
