"use client";

import { Table, ColumnProps } from "@/shared/components/Table";
import { ExamItem } from "../type";

interface ExamListTableProps {
  exams: ExamItem[];
  isLoading?: boolean;
  onExamClick: (exam: ExamItem) => void;
  onManageClick?: (exam: ExamItem) => void;
}

const getStatusBadgeStyle = (status: string) => {
  if (status === "채점완료") return "bg-green-100 text-green-700";
  if (status === "채점중") return "bg-orange-100 text-orange-700";
  return "bg-slate-100 text-slate-700";
};

export function ExamListTable({ exams, isLoading, onExamClick, onManageClick }: ExamListTableProps) {
  const columns: ColumnProps[] = [
    {
      key: "name",
      label: "테스트명",
      render: (item: ExamItem) => (
        <button 
          onClick={() => onExamClick(item)}
          className="font-medium text-slate-800 hover:text-blue-600 hover:underline transition-colors text-left"
        >
          {item.name}
        </button>
      ),
    },
    {
      key: "className",
      label: "반",
      render: (item: ExamItem) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
          {item.className || "전체 클래스"}
        </span>
      ),
    },
    {
      key: "examDate",
      label: "응시일",
      render: (item: ExamItem) => {
        if (!item.examDate) return <span>-</span>;
        const datePart = item.examDate.split("T")[0];
        const [year, month, day] = datePart.split("-");
        return <span>{`${year}. ${parseInt(month, 10)}. ${parseInt(day, 10)}.`}</span>;
      }
    },
    {
      key: "averageScore",
      label: "평균",
      render: (item: ExamItem) => (
        <span className="font-semibold">{item.averageScore} 점</span>
      )
    },
    {
      key: "attendeesInfo",
      label: "응시 인원",
      render: (item: ExamItem) => (
        <span className="text-slate-600">{item.attendees} / {item.totalStudents}</span>
      )
    },
    {
      key: "status",
      label: "상태",
      render: (item: ExamItem) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyle(item.status)}`}>
          {item.status}
        </span>
      )
    },
    {
      key: "action",
      label: "관리",
      render: (item: ExamItem) => (
        <button 
          onClick={() => onManageClick?.(item)}
          className="text-slate-400 hover:text-slate-600 text-xl font-bold px-2"
        >
          ⋮
        </button>
      ),
    },
  ];

  return (
    <div className="mt-4 bg-white rounded-xl shadow-sm overflow-hidden border">
      <Table
        columns={columns}
        data={{ data: exams, total: exams.length, totalPages: 1 }}
        showCheckbox={true}
        rowKey="id"
        isLoading={isLoading}
      />
    </div>
  );
}
