"use client";

import { useState, ChangeEvent, useRef } from "react";
import { UploadCloud, FileText, X, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import { CardModal } from "@/shared/components/CardModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Label } from "@/shared/components/ui/label";
import { fetchTeacherClasses } from "@/features/class/api";
import { useSession } from "@/shared/hooks/useSession";
import { useDocumentUpload } from "../hook";
import { useCreateFile } from "../query";

export function FileUploadModal() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [classId, setClassId] = useState("");

  const { data: user } = useSession();
  const teacherId = user?.id || "";

  const { file, uploading, upload, reset } = useDocumentUpload();
  const { mutate: createFile, isPending } = useCreateFile();

  const { data: classData, isLoading: isClassesLoading } = useQuery({
    queryKey: ["classes", teacherId],
    queryFn: () => fetchTeacherClasses(teacherId),
    enabled: !!teacherId && open,
  });

  const classes = classData?.data || [];

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    try {
      await upload(selectedFile);
    } catch {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleClearFile() {
    reset();
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleClose() {
    if (uploading || isPending) return;
    setOpen(false);
    setClassId("");
    handleClearFile();
  }

  async function handleSubmit() {
    if (!classId) return toast.error("대상 클래스를 선택해주세요.");
    if (!file) return toast.error("파일을 선택해주세요.");

    const values = {
      classId,
      urls: [file.url],
      existingDocuments: [],
      fileName: file.originalName,
      fileSize: file.size,
    };

    createFile(values, {
      onSuccess: () => {
        handleClose();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  const isBusy = uploading || isPending;

  return (
    <>
      <Button className="gap-2" onClick={() => setOpen(true)}>
        <UploadCloud className="size-4" />
        파일 업로드
      </Button>

      <CardModal
        open={open}
        onOpenChange={handleClose}
        title="파일 업로드"
        description="새로운 수업 자료를 업로드합니다."
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={handleClose} disabled={isBusy}>
              취소
            </Button>
            <Button onClick={handleSubmit} disabled={isBusy}>
              {isBusy ? "등록 중..." : "업로드 완료"}
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="class">대상 클래스</Label>
            <Select
              value={classId}
              onValueChange={setClassId}
              disabled={isClassesLoading || isBusy}
            >
              <SelectTrigger id="class">
                <SelectValue
                  placeholder={
                    isClassesLoading
                      ? "클래스를 불러오는 중..."
                      : "클래스를 선택하세요"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {classes.length === 0 && !isClassesLoading ? (
                  <SelectItem value="none" disabled>
                    등록된 클래스가 없습니다.
                  </SelectItem>
                ) : (
                  classes.map((cls: { id: string; name: string }) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>파일 선택</Label>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              disabled={isBusy}
            />

            {uploading ? (
              <div className="flex items-center justify-center gap-2 rounded-md border p-6 bg-muted/20">
                <Loader2 className="size-5 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">
                  업로드 중...
                </span>
              </div>
            ) : file ? (
              <div className="flex items-center justify-between rounded-md border p-3 bg-muted/30">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="size-4 text-primary shrink-0" />
                  <span className="text-sm font-medium truncate">
                    {file.originalName}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 shrink-0"
                  onClick={handleClearFile}
                  disabled={isBusy}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center rounded-md border border-dashed p-6 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <UploadCloud className="size-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  클릭하여 파일 선택
                </span>
              </div>
            )}
          </div>
        </div>
      </CardModal>
    </>
  );
}
