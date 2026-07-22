"use client";

import { VendorFilterBar } from "@/features/vendor/components/VendorFilterBar";
import { useFindVendors, useDeleteVendors } from "@/features/vendor/query";
import { useVendorStore } from "@/features/vendor/store";
import { useConfirm } from "@/shared/hooks/useConfirm";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getVendorColumns } from "./column";
import { Table } from "@/shared/components/Table";

export default function VendorPage() {
  const searchParams = useSearchParams();
  const { q, onCreateOpen, onEditOpen } = useVendorStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다.",
  );

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const { data, isLoading } = useFindVendors({
    page,
    limit,
    search: q,
  });
  const { mutate: deleteVendors } = useDeleteVendors();

  async function handleDelete(selectedIds: string[]) {
    const ok = await confirm();
    if (ok) {
      deleteVendors(selectedIds);
    }
  }

  function handleCreate() {
    onCreateOpen();
  }

  function handleEdit(id: string) {
    onEditOpen(id);
  }

  const columns = useMemo(() => {
    return getVendorColumns({ onEdit: handleEdit, onDelete: handleDelete });
  }, []);

  console.log("data", data);

  return (
    <>
      <VendorFilterBar />
      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        createButtonLabel="+ 구매처 등록"
        onCreate={handleCreate}
        deleteButtonLabel="선택 삭제"
        onDelete={handleDelete}
        currentPage={page}
      />
      <ConfirmDialog />
    </>
  );
}
