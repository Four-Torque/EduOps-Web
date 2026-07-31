"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createExam } from "../api";
import { toast } from "react-hot-toast";
import { fetchTeacherClasses } from "@/features/class/api";
import { useSession } from "@/shared/hooks/useSession";

export function CreateExamModal() {
  const queryClient = useQueryClient();
  const { data: user } = useSession();
  const teacherId = user?.id || "";

  const [open, setOpen] = useState(false);
  const [classId, setClassId] = useState("");
  const [name, setName] = useState("");
  const [examDate, setExamDate] = useState("");

  const { data: classData, isLoading: isClassesLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: () => fetchTeacherClasses(teacherId),
    enabled: !!teacherId && open,
  });

  const classes = classData?.data || [];

  const createMutation = useMutation({
    mutationFn: () => 
      createExam({
        classId,
        name,
        examDate: new Date(examDate),
      }),
    onSuccess: () => {
      toast.success("새 테스트가 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      setClassId("");
      setName("");
      setExamDate("");
      setOpen(false);
    },
    onError: () => {
      toast.error("테스트 등록에 실패했습니다.");
    }
  });

  const handleCreate = () => {
    if (!classId) {
      toast.error("반을 선택해주세요.");
      return;
    }
    if (!name) {
      toast.error("시험명을 입력해주세요.");
      return;
    }
    if (!examDate) {
      toast.error("시험일을 선택해주세요.");
      return;
    }
    createMutation.mutate();
  };

  return (
    <>
      <Button className="gap-2" onClick={() => setOpen(true)}>
        <PlusCircle className="size-4" />
        새 테스트 등록
      </Button>

      <CardModal
        open={open}
        onOpenChange={setOpen}
        title="새 테스트 등록"
        description="새로운 테스트 일정을 등록합니다."
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={createMutation.isPending}>취소</Button>
            <Button onClick={handleCreate} disabled={createMutation.isPending}>
              {createMutation.isPending ? "등록 중..." : "등록하기"}
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">대상 반</label>
            <Select value={classId} onValueChange={setClassId} disabled={isClassesLoading}>
              <SelectTrigger>
                <SelectValue placeholder={isClassesLoading ? "불러오는 중..." : "반 선택"} />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls: any) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
    </>
  );
}
