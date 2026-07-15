"use client";

import { FileText, Presentation, File, Download, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Table, ColumnProps } from "@/shared/components/Table";
import { ClassFileResponse } from "../type";
import { deleteClassFile } from "../api";
import { useState } from "react";

const getFormatIcon = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return <FileText className="size-4 text-red-500" />;
    case "ppt":
    case "pptx":
      return <Presentation className="size-4 text-orange-500" />;
    case "doc":
    case "docx":
      return <File className="size-4 text-blue-500" />;
    default:
      return <File className="size-4 text-gray-500" />;
  }
};

const getFormatLabel = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toUpperCase();
  return ext || "ETC";
};

const formatFileSize = (fileSize: number): string => {
  if (fileSize < 1024) {
    return `${fileSize} B`;
  }
  if (fileSize < 1024 * 1024) {
    return `${(fileSize / 1024).toFixed(1)} KB`;
  }
  return `${(fileSize / (1024 * 1024)).toFixed(1)} MB`;
};

interface FileListTableProps {
  files?: import("../type").PaginatedClassFileResponse;
  isLoading?: boolean;
}

export function FileListTable({ files, isLoading }: FileListTableProps) {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("정말 이 파일을 삭제하시겠습니까?")) return;
    
    try {
      setIsDeleting(id);
      await deleteClassFile(id);
      toast.success("파일이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["classFiles"] });
    } catch (error) {
      console.error(error);
      toast.error("삭제에 실패했습니다.");
    } finally {
      setIsDeleting(null);
    }
  };

  const columns: ColumnProps[] = [
    {
      key: "fileName",
      label: "파일명",
      render: (item: ClassFileResponse) => (
        <div className="flex items-center gap-2 justify-center">
          {getFormatIcon(item.fileName)}
          <span className="font-medium text-slate-800">{item.fileName}</span>
        </div>
      ),
    },
    {
      key: "uploaderName",
      label: "작성자",
      render: (item: ClassFileResponse) => (
        <span>{item.uploaderName || "-"}</span>
      )
    },
    {
      key: "format",
      label: "형식",
      render: (item: ClassFileResponse) => getFormatLabel(item.fileName),
    },
    {
      key: "createdAt",
      label: "업로드일",
      render: (item: ClassFileResponse) => (
        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'fileSize',
      label: '크기',
      render: (item: ClassFileResponse) => (
        <span>{formatFileSize(item.fileSize)}</span>
      )
    },
    {
      key: "action",
      label: "작업",
      render: (item: ClassFileResponse) => (
        <div className="flex items-center justify-center gap-4">
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/class-file/${item.id}/download`}
            className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors text-sm"
            download
          >
            <Download className="size-4" />
            다운로드
          </a>
          <button
            onClick={() => handleDelete(item.id)}
            disabled={isDeleting === item.id}
            className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors text-sm disabled:opacity-50 cursor-pointer"
          >
            <Trash2 className="size-4" />
            {isDeleting === item.id ? "삭제중..." : "삭제"}
          </button>
        </div>
      ),
    },
  ];

  const totalItems = files?.total || 0;
  const totalPages = Math.ceil(totalItems / 10) || 1;

  return (
    <div className="mt-4 bg-white rounded-xl overflow-hidden border">
      <Table
        columns={columns}
        data={{ data: files?.data || [], total: totalItems, totalPages }}
        showCheckbox={false}
        rowKey="id"
        isLoading={isLoading}
      />
    </div>
  );
}
