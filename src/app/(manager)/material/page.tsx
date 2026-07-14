"use client";

import { MaterialFilterBar } from "@/features/asset/components/MaterialFilterBar";
import {
  useDeleteAssetApplications,
  useFindAssetApplications,
} from "@/features/asset/query";
import { useAssetApplicationStore } from "@/features/asset/store";
import { MaterialTabFilter } from "@/features/asset/type";
import { useConfirm } from "@/shared/hooks/useConfirm";
import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { getAssetApplicationsColumns } from "./column";
import { Table } from "@/shared/components/Table";

export default function MaterialPage() {
  const searchParams = useSearchParams();
  const { mutate: deleteAssetApplications } = useDeleteAssetApplications();
  const { onCreateOpen } = useAssetApplicationStore();
  const [statusFilter, setStatusFilter] = useState<MaterialTabFilter>("all");
  const [ConfirmDialog, confirm] = useConfirm(
    "정말 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다.",
  );

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const { data, isLoading } = useFindAssetApplications({
    page,
    limit,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  async function handleDelete(selectedIds: string[]) {
    const ok = await confirm();
    if (ok) {
      deleteAssetApplications(selectedIds);
    }
  }

  function handleCreate() {
    onCreateOpen();
  }

  const columns = useMemo(() => {
    return getAssetApplicationsColumns();
  }, []);

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
        showCheckbox
        createButtonLabel="+ 자재 요청"
        onCreate={handleCreate}
        deleteButtonLabel="선택 삭제"
        onDelete={handleDelete}
        statusReadonly
      />
      <ConfirmDialog />
    </>
  );
}
