"use client";

import { useState } from "react";
import { CardModal } from "@/shared/components/CardModal";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useCreateClass } from "@/features/class/query";
import { useTeachers } from "@/features/user/query";
import { toast } from "react-hot-toast";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCourseModal({ isOpen, onClose }: CreateCourseModalProps) {
  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  const [capacity, setCapacity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const { data: teachers = [], isLoading: isLoadingTeachers } = useTeachers();
  const createClassMutation = useCreateClass();

  const handleCreate = () => {
    if (!name || !fee || !capacity || !startDate || !endDate || !teacherId) {
      toast.error("모든 필드를 입력해주세요.");
      return;
    }

    createClassMutation.mutate(
      {
        name,
        fee: parseInt(fee, 10),
        capacity: parseInt(capacity, 10),
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        teacherId,
      },
      {
        onSuccess: () => {
          toast.success("강좌가 성공적으로 생성되었습니다.");
          setName("");
          setFee("");
          setCapacity("");
          setStartDate("");
          setEndDate("");
          setTeacherId("");
          onClose();
        },
        onError: () => {
          toast.error("강좌 생성 중 오류가 발생했습니다.");
        },
      }
    );
  };

  return (
    <CardModal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title="강좌 추가"
      description="새로운 강좌를 직접 생성합니다."
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={createClassMutation.isPending}>
            취소
          </Button>
          <Button onClick={handleCreate} disabled={createClassMutation.isPending}>
            {createClassMutation.isPending ? "생성 중..." : "추가"}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4 py-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="courseName">강좌명</Label>
          <Input 
            id="courseName" 
            placeholder="예: 미적분 II (수능 대비반)" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="teacher">담당 강사</Label>
          <select
            id="teacher"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          >
            <option value="" disabled>강사를 선택하세요</option>
            {isLoadingTeachers ? (
              <option disabled>강사 목록을 불러오는 중...</option>
            ) : (
              teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fee">수강료 (원)</Label>
            <Input 
              id="fee" 
              type="number" 
              placeholder="예: 300000" 
              value={fee} 
              onChange={(e) => setFee(e.target.value)} 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="capacity">정원 (명)</Label>
            <Input 
              id="capacity" 
              type="number" 
              placeholder="예: 30" 
              value={capacity} 
              onChange={(e) => setCapacity(e.target.value)} 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="startDate">시작일</Label>
            <Input 
              id="startDate" 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="endDate">종료일</Label>
            <Input 
              id="endDate" 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </div>
        </div>
      </div>
    </CardModal>
  );
}
