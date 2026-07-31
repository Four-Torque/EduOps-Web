"use client";

import { useState } from "react";
import { ClassFileResponse } from "@/features/file/type";
import { ColumnProps } from "@/shared/components/Table";
import { Download, FileText, Presentation, File } from "lucide-react";
import { getFormatLabel, formatFileSize, formatDate } from "@/shared/lib/utils";
import apiClient from "@/shared/lib/axios";
import toast from "react-hot-toast";

const DownloadButton = ({ id, fileName }: { id: string; fileName: string }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    const toastId = toast.loading("파일 다운로드 중...");
    try {
      const response = await apiClient.get(`/class-file/${id}/download`, {
        responseType: "blob",
      });
      
      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("파일 다운로드 완료", { id: toastId });
    } catch (error) {
      console.error("파일 다운로드 실패:", error);
      toast.error("파일 다운로드에 실패했습니다.", { id: toastId });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors text-sm cursor-pointer disabled:opacity-50"
    >
      <Download className="size-4" />
      다운로드
    </button>
  );
};

export const getFormatIcon = (fileName: string) => {
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

export const getClassFileColumns = (): ColumnProps[] => [
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
      <p className="text-center">{item.uploaderName || "-"}</p>
    ),
  },
  {
    key: "format",
    label: "형식",
    render: (item: ClassFileResponse) => (
      <p className="text-center">{getFormatLabel(item.fileName)}</p>
    ),
  },
  {
    key: "createdAt",
    label: "업로드일",
    render: (item: ClassFileResponse) => (
      <p className="text-center">{formatDate(new Date(item.createdAt))}</p>
    ),
  },
  {
    key: "fileSize",
    label: "크기",
    render: (item: ClassFileResponse) => (
      <p className="text-center">{formatFileSize(item.fileSize)}</p>
    ),
  },
  {
    key: "action",
    label: "작업",
    render: (item: ClassFileResponse) => (
      <div className="flex items-center justify-center gap-4">
        <DownloadButton id={item.id} fileName={item.fileName} />
      </div>
    ),
  },
];
