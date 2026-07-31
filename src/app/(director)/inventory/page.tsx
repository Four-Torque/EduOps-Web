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
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
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
      <InventoryFilterBar />
      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        showCheckbox={false}
        currentPage={page}
      />
    </>
  );
}
