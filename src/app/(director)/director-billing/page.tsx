"use client";

import { Table } from "@/components/common/Table";
import {
  useEditAssetApplicationStatus,
  useFindAssetApplications,
} from "@/hooks/asset/useAsset";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { getAssetApplicationsColumns } from "./column";
import { MaterialFilterBar } from "@/components/manager/material/MaterialFilterBar";
import { MaterialTabFilter } from "@/types/manager/material.types";
import { useAssetApplicationStore } from "@/store/asset/asset.store";

export default function DirectorBillingPage() {
  const searchParams = useSearchParams();
  const [statusFilter, setStatusFilter] = useState<MaterialTabFilter>("all");
  const { onRejectOpen } = useAssetApplicationStore();

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const { data, isLoading } = useFindAssetApplications({
    page,
    limit,
    status: statusFilter === "all" ? undefined : statusFilter,
  });
  const { mutate: editStatus } = useEditAssetApplicationStatus();

  const columns = useMemo(() => {
    return getAssetApplicationsColumns();
  }, []);

  function handleEditStatus(itemId: string, status: string) {
    if (status === "ACCEPTED") {
      editStatus({ id: itemId, status });
    } else {
      onRejectOpen(itemId, status);
    }
  }

  return (
    <>
      <h1 className="text-[18px] font-bold text-slate-900 mb-4">
        자재 결제 관리
      </h1>
      <MaterialFilterBar
        statusFilter={statusFilter}
        onStatusFilterChange={(status) => {
          setStatusFilter(status);
        }}
      />
      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        showCheckbox={false}
        onEditStatus={handleEditStatus}
      />
    </>
  );
}
