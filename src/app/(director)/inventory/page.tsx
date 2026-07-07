"use client";

import { Table } from "@/components/common/Table";
import { getAssetInventoryColumns } from "./column";
import { useFindAssets } from "@/hooks/asset/useAsset";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { InventoryFilterBar } from "@/components/director/inventory/InventoryFilterBar";
import { useAssetStore } from "@/store/asset/asset.store";

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
