"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { ClassGrid } from "./ClassGrid";
import { SyllabusListTable } from "@/features/syllabus/components/SyllabusListTable";
import { useSyllabuses } from "@/features/syllabus/query";

export function CourseManagerDashboard() {
  const [activeTab, setActiveTab] = useState("courses");
  const { data: syllabusData, isLoading: syllabusLoading } = useSyllabuses(
    1,
    100,
  );

  return (
    <div className="flex flex-col gap-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full flex flex-col gap-6"
      >
        <div className="flex items-center justify-between border-b border-slate-200">
          <TabsList className="bg-white p-0 gap-2">
            <TabsTrigger
              value="courses"
              className="px-2 py-2 text-base font-semibold data-[state=active]:border-b-2 data-[state=active]:border-b-primary rounded-none"
            >
              진행 강좌
            </TabsTrigger>
            <TabsTrigger
              value="syllabuses"
              className="px-2 py-2 text-base font-semibold data-[state=active]:border-b-2 data-[state=active]:border-b-primary rounded-none"
            >
              강좌 계획서 승인 관리
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="courses" className="m-0 focus-visible:outline-none">
          <ClassGrid />
        </TabsContent>

        <TabsContent
          value="syllabuses"
          className="m-0 focus-visible:outline-none flex flex-col gap-4"
        >
          <SyllabusListTable
            syllabuses={syllabusData?.data || []}
            isLoading={syllabusLoading}
            isManager={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
