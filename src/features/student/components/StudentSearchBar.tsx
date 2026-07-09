"use client";

import { Search, Filter, Download } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

interface StudentSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function StudentSearchBar({
  searchQuery,
  onSearchChange,
}: StudentSearchBarProps) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="이름, 아이디, 전화번호로 검색"
          className="pl-8 text-[12.5px]"
        />
      </div>

      <Button variant="outline" size="sm">
        <Filter className="w-3.5 h-3.5" />
        Filter
      </Button>

      <Button variant="primary" size="sm">
        <Download className="w-3.5 h-3.5" />
        Export
      </Button>
    </div>
  );
}
