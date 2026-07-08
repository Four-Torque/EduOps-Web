"use client";

import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";
import { useVendorStore } from "@/store/manager/vendor.store";
import { useEffect, useMemo } from "react";

export function VendorFilterBar() {
  const { setQ } = useVendorStore();
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
    <div className="px-4 py-3 mb-6 border border-slate-200 rounded bg-white">
      <Input
        placeholder="업체명으로 검색"
        className="w-75"
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </div>
  );
}
