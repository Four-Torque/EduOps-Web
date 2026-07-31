"use client";

import { Search, ListFilter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { fetchTeacherClasses } from "@/features/class/api";

interface FileFilterBarProps {
  teacherId: string;
  classId: string;
  setClassId: (val: string) => void;
  fileName: string;
  setFileName: (val: string) => void;
}

export function FileFilterBar({ teacherId, classId, setClassId, fileName, setFileName }: FileFilterBarProps) {
  const { data: classData, isLoading: isClassesLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: () => fetchTeacherClasses(teacherId),
  });

  const classes = classData?.data || [];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center w-full bg-white p-4 rounded-xl border">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="파일명 검색..."
          className="pl-9 w-full shadow-none"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center shrink-0 w-full sm:w-auto">
        <Select value={classId} onValueChange={setClassId} disabled={isClassesLoading}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder={isClassesLoading ? "불러오는 중..." : "전체 클래스"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-class">전체 클래스</SelectItem>
            {classes.map((cls: any) => (
              <SelectItem key={cls.id} value={cls.id}>
                {cls.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
