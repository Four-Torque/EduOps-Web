"use client";

import { useFindCategories } from "@/features/category/query";
import { useFindVendors } from "@/features/vendor/query";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { debounce } from "@/shared/lib/utils";
import { useEffect, useMemo } from "react";
import { useAssetStore } from "@/features/asset/store";

export function InventoryFilterBar() {
  const { categoryId, vendorId, setCategoryId, setVendorId, setQ } =
    useAssetStore();
  const { data: categories } = useFindCategories();
  const { data } = useFindVendors({
    page: "1",
    limit: "10000",
  });
  const vendors = data?.data ?? [];

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
    <div className="px-4 py-3 mb-4 border border-slate-200 rounded bg-white flex justify-between items-center">
      <Input
        placeholder="품목명으로 검색"
        className="w-75"
        onChange={(e) => debouncedSearch(e.target.value)}
      />

      <div className="flex items-center gap-2">
        <Select
          value={categoryId}
          onValueChange={(value) => setCategoryId(value)}
        >
          <SelectTrigger className="w-40 text-[12.5px]" size="default">
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="" className="text-[12.5px]">
              전체
            </SelectItem>
            {categories?.map((category: any) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className="text-[12.5px]"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={vendorId} onValueChange={(value) => setVendorId(value)}>
          <SelectTrigger className="w-40 text-[12.5px]" size="default">
            <SelectValue placeholder="구매처" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="" className="text-[12.5px]">
              전체
            </SelectItem>
            {vendors?.map((vendor: any) => (
              <SelectItem
                key={vendor.id}
                value={vendor.id}
                className="text-[12.5px]"
              >
                {vendor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
