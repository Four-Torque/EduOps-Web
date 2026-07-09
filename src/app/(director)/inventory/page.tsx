"use client";

import { InventoryFilterBar } from "@/features/asset/components/InventoryFilterBar";
import { useFindAssets } from "@/features/asset/query";
import { useAssetStore } from "@/features/asset/store";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getAssetInventoryColumns } from "./column";
import { Table } from "@/shared/components/Table";

export default function InventoryPage() {
  const { q, categoryId, vendorId } = useAssetStore();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const { data, isLoading } = useFindAssets({
    page,
    limit,
    search: q,
    categoryId,
    vendorId,
  });

  const columns = useMemo(() => {
    return getAssetInventoryColumns();
  }, []);

  return (
    <>
      <h1 className="text-[18px] font-bold text-slate-900 mb-4">자재 목록</h1>
      <InventoryFilterBar />
      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        showCheckbox={false}
      />
    </>
  );
}
