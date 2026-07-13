"use client";

import { useState } from "react";
import { Table, ColumnProps } from "@/shared/components/Table";
import { ClassSyllabusItem } from "../type";
import { SyllabusDetailModal } from "./SyllabusDetailModal";

interface SyllabusListTableProps {
  syllabuses: ClassSyllabusItem[];
  isLoading?: boolean;
}

const getStatusBadgeStyle = (status: string) => {
  if (status === "APPROVED") return "bg-green-100 text-green-700";
  if (status === "REJECTED") return "bg-red-100 text-red-700";
  return "bg-orange-100 text-orange-700"; // PENDING
};

const getStatusText = (status: string) => {
  if (status === "APPROVED") return "승인됨";
  if (status === "REJECTED") return "반려됨";
  return "대기 중";
};

export function SyllabusListTable({ syllabuses, isLoading }: SyllabusListTableProps) {
  const [selectedItem, setSelectedItem] = useState<ClassSyllabusItem | null>(null);

  const columns: ColumnProps[] = [
    {
      key: "name",
      label: "강좌명",
      render: (item: ClassSyllabusItem) => (
        <button 
          onClick={() => setSelectedItem(item)}
          className="font-medium text-[#0069A8] hover:underline cursor-pointer text-left focus:outline-none"
        >
          {item.name}
        </button>
      ),
    },
    {
      key: "fee",
      label: "수강료",
      render: (item: ClassSyllabusItem) => (
        <span className="text-slate-600">
          {item.fee.toLocaleString()} 원
        </span>
      ),
    },
    {
      key: "capacity",
      label: "정원",
      render: (item: ClassSyllabusItem) => (
        <span className="text-slate-600">
          {item.capacity} 명
        </span>
      ),
    },
    {
      key: "schedule",
      label: "예정 기간",
      render: (item: ClassSyllabusItem) => {
        if (!item.startDate && !item.endDate) return <span className="text-slate-400">-</span>;
        const start = item.startDate ? item.startDate.split("T")[0] : "?";
        const end = item.endDate ? item.endDate.split("T")[0] : "?";
        return <span className="text-sm">{`${start} ~ ${end}`}</span>;
      }
    },
    {
      key: "createdAt",
      label: "제출일",
      render: (item: ClassSyllabusItem) => {
        return <span className="text-sm text-slate-500">{item.createdAt.split("T")[0]}</span>;
      }
    },
    {
      key: "status",
      label: "상태",
      render: (item: ClassSyllabusItem) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyle(item.status)}`}>
          {getStatusText(item.status)}
        </span>
      )
    },
    {
      key: "action",
      label: "관리",
      render: (item: ClassSyllabusItem) => {
        return (
          <div className="flex items-center justify-center gap-2">
            {item.status === "REJECTED" && item.rejectedReason && (
              <span className="text-xs text-red-500 max-w-[80px] truncate block" title={item.rejectedReason}>{item.rejectedReason}</span>
            )}
            <button 
              onClick={() => setSelectedItem(item)}
              className="text-[11.5px] font-medium text-slate-600 hover:text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 px-2 py-1 rounded transition-colors"
            >
              상세보기
            </button>
          </div>
        );
      }
    }
  ];

  return (
    <>
      <div className="mt-4 bg-white rounded-xl shadow-sm overflow-hidden border">
        <Table
          columns={columns}
          data={{ data: syllabuses, total: syllabuses.length, totalPages: 1 }}
          showCheckbox={false}
          rowKey="id"
          isLoading={isLoading}
        />
      </div>
      
      <SyllabusDetailModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  );
}
