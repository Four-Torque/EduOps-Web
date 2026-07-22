import { ClassFileResponse } from "@/features/file/type";
import { ColumnProps } from "@/shared/components/Table";
import { Download, FileText, Presentation, File } from "lucide-react";
import { getFormatLabel, formatFileSize, formatDate } from "@/shared/lib/utils";

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
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/class-file/${item.id}/download`}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors text-sm"
          download
        >
          <Download className="size-4" />
          다운로드
        </a>
      </div>
    ),
  },
];
