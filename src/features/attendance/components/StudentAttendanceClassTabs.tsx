"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

interface ClassOption {
  id: string;
  name: string;
}

interface StudentAttendanceClassTabsProps {
  classes: ClassOption[];
  activeClassId: string;
  isLoading: boolean;
  onChange: (classId: string) => void;
}

export default function StudentAttendanceClassTabs({
  classes,
  activeClassId,
  isLoading,
  onChange,
}: StudentAttendanceClassTabsProps) {
  return (
    <Tabs value={activeClassId} onValueChange={onChange} className="w-full">
      <TabsList className="flex flex-nowrap h-auto gap-2 bg-transparent justify-start overflow-x-auto pb-1 scrollbar-thin">
        {isLoading ? (
          <div className="text-muted-foreground text-sm px-2">강좌 목록을 불러오는 중...</div>
        ) : classes.length > 0 ? (
          classes.map((cls) => (
            <TabsTrigger
              key={cls.id}
              value={cls.id}
              className="shrink-0 whitespace-nowrap px-5 py-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md text-muted-foreground bg-gray-50 border hover:bg-gray-200 transition-all"
            >
              {cls.name}
            </TabsTrigger>
          ))
        ) : (
          <div className="text-muted-foreground text-sm px-2">등록된 강좌가 없습니다.</div>
        )}
      </TabsList>
    </Tabs>
  );
}