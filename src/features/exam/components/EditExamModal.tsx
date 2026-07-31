"use client";

import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { CardModal } from "@/shared/components/CardModal";
import { Input } from "@/shared/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExam, deleteExam } from "../api";
import { toast } from "react-hot-toast";
import { ExamItem } from "../type";

interface EditExamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exam: ExamItem | null;
}

export function EditExamModal({ open, onOpenChange, exam }: EditExamModalProps) {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [examDate, setExamDate] = useState("");

  useEffect(() => {
    if (exam && open) {
      setName(exam.name);
      let parsedDate = "";
      if (exam.examDate) {
        parsedDate = exam.examDate.split("T")[0];
      }
      setExamDate(parsedDate);
    }
  }, [exam, open]);

  const updateMutation = useMutation({
    mutationFn: () => 
      updateExam(exam!.id, {
        name,
        examDate: examDate ? new Date(examDate) : undefined,
      }),
    onSuccess: () => {
      toast.success("테스트 정보가 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      onOpenChange(false);
    },
    onError: () => {
      toast.error("테스트 정보 수정에 실패했습니다.");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteExam(exam!.id),
    onSuccess: () => {
      toast.success("테스트가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      onOpenChange(false);
    },
    onError: () => {
      toast.error("테스트 삭제에 실패했습니다.");
    }
  });

  const handleUpdate = () => {
    if (!name) {
      toast.error("시험명을 입력해주세요.");
      return;
    }
    updateMutation.mutate();
  };

  const handleDelete = () => {
    if (confirm("정말로 이 테스트를 삭제하시겠습니까? 관련된 학생들의 성적도 모두 삭제됩니다.")) {
      deleteMutation.mutate();
    }
  };

  if (!exam) return null;

  return (
    <CardModal
      open={open}
      onOpenChange={onOpenChange}
      title="테스트 관리"
      description={`${exam.className || '전체 클래스'}의 테스트 정보를 수정하거나 삭제합니다.`}
      size="sm"
      footer={
        <div className="flex sm:justify-between items-center w-full">
          <Button 
            variant="destructive" 
            onClick={handleDelete} 
            disabled={deleteMutation.isPending || updateMutation.isPending}
            className="mr-auto"
          >
            {deleteMutation.isPending ? "삭제 중..." : "삭제하기"}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={updateMutation.isPending || deleteMutation.isPending}>취소</Button>
            <Button onClick={handleUpdate} disabled={updateMutation.isPending || deleteMutation.isPending}>
              {updateMutation.isPending ? "수정 중..." : "수정하기"}
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">테스트 이름</label>
          <Input 
            placeholder="예) 6월 모의고사"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">시험일</label>
          <Input 
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />
        </div>
      </div>
    </CardModal>
  );
}
