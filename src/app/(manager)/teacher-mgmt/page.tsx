"use client";

import { TeacherFilterBar } from "@/features/user/components/TeacherFilterBar";
import { useTeacherList, useDeleteTeacher } from "@/features/user/query";
import { useTeacherStore } from "@/features/user/store";
import { useConfirm } from "@/shared/hooks/useConfirm";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getTeacherColumns } from "./column";
import { Table } from "@/shared/components/Table";

export default function TeacherMgmtPage() {
  const searchParams = useSearchParams();
  const { q, onViewOpen } = useTeacherStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다.",
  );

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const { data, isLoading } = useTeacherList({ page, limit, search: q });
  const { mutateAsync: deleteTeacherAsync } = useDeleteTeacher();

  async function handleDelete(selectedIds: string[]) {
    const ok = await confirm();
    if (ok) {
      await Promise.all(selectedIds.map((id) => deleteTeacherAsync(id)));
    }
  }

  function handleView(id: string) {
    onViewOpen(id);
  }

  const columns = useMemo(() => {
    return getTeacherColumns({ onView: handleView, onDelete: handleDelete });
  }, []);

  return (
    <>
      <TeacherFilterBar />
      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        deleteButtonLabel="선택 삭제"
        onDelete={handleDelete}
      />
      <ConfirmDialog />
    </>
  );
}
