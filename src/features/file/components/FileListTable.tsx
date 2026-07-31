"use client";

import { Table } from "@/shared/components/Table";
import { PaginatedClassFileResponse } from "../type";
import { useMemo } from "react";
import { getClassFileColumns } from "@/app/(teacher)/files/column";
import { useConfirm } from "@/shared/hooks/useConfirm";
import { useDeleteClassFiles } from "../query";

interface FileListTableProps {
  data?: PaginatedClassFileResponse;
  isLoading?: boolean;
}

export function FileListTable({ data, isLoading }: FileListTableProps) {
  const [ConfirmDialog, confirm] = useConfirm(
    "정말 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다.",
  );
  const { mutate: deleteClassFiles } = useDeleteClassFiles();

  async function handleDelete(selectedIds: string[]) {
    const ok = await confirm();
    if (ok) {
      deleteClassFiles(selectedIds);
    }
  }

  const columns = useMemo(() => {
    return getClassFileColumns();
  }, []);

  return (
    <>
      <div className="mt-4 bg-white rounded-xl overflow-hidden">
        <Table
          columns={columns}
          data={data}
          showCheckbox={true}
          rowKey="id"
          isLoading={isLoading}
          deleteButtonLabel="선택 삭제"
          onDelete={handleDelete}
          currentPage={data?.page || 1}
        />
      </div>
      <ConfirmDialog />
    </>
  );
}
