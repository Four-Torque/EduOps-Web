"use client";

import { ListFilter, RotateCcw } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { fetchTeacherClasses } from "@/features/class/api";
import { useSession } from "@/shared/hooks/useSession";

interface ExamFilterBarProps {
  classId: string;
  setClassId: (val: string) => void;
  period: string;
  setPeriod: (val: string) => void;
  onReset: () => void;
}

export function ExamFilterBar({ 
  classId, setClassId, 
  period, setPeriod, 
  onReset 
}: ExamFilterBarProps) {
  const { data: user } = useSession();
  const teacherId = user?.id || "";

  const { data: classData, isLoading: isClassesLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: () => fetchTeacherClasses(teacherId),
    enabled: !!teacherId,
  });

  const classes = classData?.data || [];

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center w-full bg-white p-3 rounded-xl border">
      <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center shrink-0 w-full sm:w-auto">
        <Select value={classId} onValueChange={setClassId} disabled={isClassesLoading}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder={isClassesLoading ? "불러오는 중..." : "전체 클래스"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-class">전체</SelectItem>
            {classes.map((cls: any) => (
              <SelectItem key={cls.id} value={cls.id}>
                {cls.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>
        <div className="flex items-center gap-2">
          <ListFilter className="w-4 h-4 text-slate-400" />

          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px] bg-slate-100 border-none rounded-full h-8 text-xs font-medium">
              <SelectValue placeholder="기간: 최근 1개월" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">기간: 최근 1개월</SelectItem>
              <SelectItem value="3m">기간: 최근 3개월</SelectItem>
              <SelectItem value="6m">기간: 최근 6개월</SelectItem>
              <SelectItem value="all">기간: 전체</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button variant="ghost" onClick={onReset} className="text-slate-500 hover:text-slate-800 text-sm gap-1">
        <RotateCcw className="size-4" />
        초기화
      </Button>
    </div>
  );
}
