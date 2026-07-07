"use client";

import { Table } from "@/components/common/Table";
import {
  useDeleteAssetApplications,
  useFindAssetApplications,
} from "@/hooks/asset/useAsset";
import { useConfirm } from "@/hooks/common/useConfirm";
import { useAssetApplicationStore } from "@/store/asset/asset.store";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { getAssetApplicationsColumns } from "./column";
import { MaterialFilterBar } from "@/components/manager/material/MaterialFilterBar";
import { MaterialTabFilter } from "@/types/manager/material.types";

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
      <h1 className="text-[18px] font-bold text-slate-900 mb-4">
        자재 물품 신청
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
