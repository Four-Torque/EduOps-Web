"use client";

import { Table } from "@/components/common/Table";
import { useConfirm } from "@/hooks/common/useConfirm";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getVendorColumns } from "./column";
import { useDeleteVendors, useFindVendors } from "@/hooks/vendor/useVendor";
import { VendorFilterBar } from "@/components/manager/vendor/VendorFilterBar";
import { useVendorStore } from "@/store/manager/vendor.store";

export default function VendorPage() {
  const searchParams = useSearchParams();
  const { q, onCreateOpen, onEditOpen } = useVendorStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다.",
  );

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
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

  return (
    <>
      <h1 className="text-[18px] font-bold text-slate-900 mb-4">구매처 관리</h1>
      <VendorFilterBar />
      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        createButtonLabel="+ 구매처 등록"
        onCreate={handleCreate}
        deleteButtonLabel="선택 삭제"
        onDelete={handleDelete}
      />
      <ConfirmDialog />
    </>
  );
}
