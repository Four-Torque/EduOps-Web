"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import { CardModal } from "@/shared/components/CardModal";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { createSyllabus } from "../api";
import { CreateSyllabusPayload } from "../type";

export function CreateSyllabusModal() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CreateSyllabusPayload>({
    name: "",
    fee: 0,
    capacity: 0,
    startDate: "",
    endDate: "",
    targetAudience: "",
    description: "",
    curriculum: "",
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateSyllabusPayload) => createSyllabus(data),
    onSuccess: () => {
      toast.success("강의계획서가 성공적으로 제출되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["syllabuses"] });
      setFormData({
        name: "",
        fee: 0,
        capacity: 0,
        startDate: "",
        endDate: "",
        targetAudience: "",
        description: "",
        curriculum: "",
      });
      setOpen(false);
    },
    onError: () => {
      toast.error("강의계획서 제출에 실패했습니다.");
    },
  });

  const handleCreate = () => {
    if (!formData.name.trim()) {
      toast.error("강좌명을 입력해주세요.");
      return;
    }
    if (formData.fee < 0) {
      toast.error("수강료는 0 이상이어야 합니다.");
      return;
    }
    if (formData.capacity < 1) {
      toast.error("정원은 1명 이상이어야 합니다.");
      return;
    }

    const payload = {
      ...formData,
      startDate: formData.startDate || undefined,
      endDate: formData.endDate || undefined,
    };

    createMutation.mutate(payload);
  };

  return (
    <>
      <Button className="gap-2" onClick={() => setOpen(true)}>
        <PlusCircle className="size-4" />
        새 계획서 작성
      </Button>

      <CardModal
        open={open}
        onOpenChange={setOpen}
        title="새 강의계획서 작성"
        description="개설을 희망하는 강좌의 계획서를 작성하여 제출합니다."
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={createMutation.isPending}>
              취소
            </Button>
            <Button onClick={handleCreate} disabled={createMutation.isPending}>
              {createMutation.isPending ? "제출 중..." : "제출하기"}
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-5 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 col-span-2">
              <Label htmlFor="name" className="text-sm font-medium text-slate-700">강좌명 <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                placeholder="예) 초급 영어 회화"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="fee" className="text-sm font-medium text-slate-700">수강료 (원) <span className="text-red-500">*</span></Label>
              <Input
                id="fee"
                type="number"
                min="0"
                placeholder="0"
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: Number(e.target.value) })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="capacity" className="text-sm font-medium text-slate-700">정원 (명) <span className="text-red-500">*</span></Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                placeholder="20"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="startDate" className="text-sm font-medium text-slate-700">시작일</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="endDate" className="text-sm font-medium text-slate-700">종료일</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <Label htmlFor="targetAudience" className="text-sm font-medium text-slate-700">수강 대상</Label>
              <Input
                id="targetAudience"
                placeholder="예) 초등학생 4~6학년"
                value={formData.targetAudience || ""}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-sm font-medium text-slate-700">강의 설명</Label>
            <Textarea
              id="description"
              className="min-h-[80px]"
              placeholder="강의의 목표와 주요 내용을 간단히 설명해주세요."
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="curriculum" className="text-sm font-medium text-slate-700">커리큘럼 세부 내용</Label>
            <Textarea
              id="curriculum"
              className="min-h-[120px]"
              placeholder="주차별 또는 단원별 강의 계획을 입력해주세요."
              value={formData.curriculum || ""}
              onChange={(e) => setFormData({ ...formData, curriculum: e.target.value })}
            />
          </div>
        </div>
      </CardModal>
    </>
  );
}
