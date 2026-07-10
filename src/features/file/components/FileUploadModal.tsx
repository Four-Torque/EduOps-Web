"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { toast } from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import { CardModal } from "@/shared/components/CardModal";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Label } from "@/shared/components/ui/label";
import { uploadClassFile } from "../api";
import { fetchTeacherClasses } from "@/features/class/api";
import { useSession } from "@/shared/hooks/useSession";

export function FileUploadModal() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [classId, setClassId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: user } = useSession();
  const teacherId = user?.id || "";

  const { data: classData, isLoading: isClassesLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: () => fetchTeacherClasses(teacherId),
    enabled: !!teacherId && open,
  });
  
  const classes = classData?.data || [];

  const handleUpload = async () => {
    if (!classId) {
      toast.error("대상 클래스를 선택해주세요.");
      return;
    }
    if (!file) {
      toast.error("업로드할 파일을 선택해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      await uploadClassFile({ classId, file });
      toast.success("파일이 성공적으로 업로드되었습니다.");
      
      // 상태 초기화 및 모달 닫기
      queryClient.invalidateQueries({ queryKey: ["classFiles"] });
      setClassId("");
      setFile(null);
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("파일 업로드에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button className="gap-2" onClick={() => setOpen(true)}>
        <UploadCloud className="size-4" />
        파일 업로드
      </Button>

      <CardModal
        open={open}
        onOpenChange={setOpen}
        title="파일 업로드"
        description="새로운 수업 자료를 업로드합니다."
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
              취소
            </Button>
            <Button onClick={handleUpload} disabled={isLoading || !classId || !file}>
              {isLoading ? "업로드 중..." : "업로드 완료"}
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="class">대상 클래스</Label>
            <Select value={classId} onValueChange={setClassId} disabled={isClassesLoading}>
              <SelectTrigger id="class">
                <SelectValue placeholder={isClassesLoading ? "클래스를 불러오는 중..." : "클래스를 선택하세요"} />
              </SelectTrigger>
              <SelectContent>
                {classes.length === 0 && !isClassesLoading ? (
                  <SelectItem value="none" disabled>
                    등록된 클래스가 없습니다.
                  </SelectItem>
                ) : (
                  classes.map((cls: any) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="file">파일 선택</Label>
            <Input 
              id="file" 
              type="file" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>
      </CardModal>
    </>
  );
}
