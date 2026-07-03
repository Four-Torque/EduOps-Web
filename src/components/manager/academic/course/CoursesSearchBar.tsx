// @/components/manager/academic/course/CourseSearchBar.tsx
"use client";

import { Search, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { COURSE_LEVEL_OPTIONS, COURSE_SUBJECT_OPTIONS } from "@/constants/manager/course.constants";
import { useCourseStore } from "@/store/manager/course.store";

export function CourseSearchBar() {
  const { searchQuery, subject, level, setSearchQuery, setSubject, setLevel } = useCourseStore();

  return (
    <div className="flex items-center gap-3 mb-4">
      {/* 검색 */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="강좌명, 강사명으로 검색"
          className="pl-9 text-[12.5px]"
        />
      </div>

      {/* 강좌명(과목) 필터 */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11.5px] text-slate-500 whitespace-nowrap">강좌명</span>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger className="w-[90px] text-[12.5px]" size="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COURSE_SUBJECT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-[12.5px]">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 뷰 전환 버튼 (그리드/리스트) */}
      <div className="flex items-center border border-slate-200 rounded overflow-hidden">
        <button className="p-1.5 bg-slate-100 text-slate-700">
          <LayoutGrid className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-slate-400 hover:bg-slate-50">
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}