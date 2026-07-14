"use client";

import { Input } from "@/shared/components/ui/input";
import { debounce } from "@/shared/lib/utils";
import { useTeacherStore } from "../store";
import { useEffect, useMemo } from "react";

export function TeacherFilterBar() {
  const { setQ } = useTeacherStore();
  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        setQ(term);
      }, 500),
    [],
  );
  useEffect(() => {
    return () => debouncedSearch.cancel?.();
  }, [debouncedSearch]);

  return (
    <div className="px-2 py-3 mb-4 border border-slate-200 rounded bg-white">
      <Input
        placeholder="강사 이름으로 검색"
        className="w-75"
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </div>
  );
}
