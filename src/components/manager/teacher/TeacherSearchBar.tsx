"use client";

import { Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TeacherSearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function TeacherSearchBar({ query, onQueryChange }: TeacherSearchBarProps) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="강사 이름으로 검색"
          className="pl-8 text-[12.5px]"
        />
      </div>

      <Button variant="outline" size="sm">
        <Filter className="h-3.5 w-3.5" />
        Filter
      </Button>

      <Button variant="primary" size="sm">
        <Download className="h-3.5 w-3.5" />
        Export
      </Button>
    </div>
  );
}
