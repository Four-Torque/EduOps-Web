"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { getAssetApplicationsColumns } from "./column";
import { MaterialTabFilter } from "@/features/asset/type";
import { MaterialFilterBar } from "@/features/asset/components/MaterialFilterBar";
import {
  useFindAssetApplications,
  useEditAssetApplicationStatus,
} from "@/features/asset/query";
import { useAssetApplicationStore } from "@/features/asset/store";
import { Table } from "@/shared/components/Table";

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
