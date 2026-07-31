"use client";

import { useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Table } from "@/shared/components/Table";
import { useConfirm } from "@/shared/hooks/useConfirm";
import { StudentStatsCards } from "@/features/student/components/StudentStatsCards";
import { StudentFilterTabs } from "@/features/student/components/StudentFilterTabs";
import { useStudentStore } from "@/features/student/store";
import { useStudents, useDeleteStudent } from "@/features/student/query";
import { getStudentColumns } from "./column";
import { Input } from "@/shared/components/ui/input";
import { debounce } from "@/shared/lib/utils";

export default function StudentPage() {
  const searchParams = useSearchParams();
  const { tab, setTab, searchQuery, setSearchQuery, onCreateOpen, onEditOpen } =
    useStudentStore();
  const { mutate: deleteStudent } = useDeleteStudent();

  const [ConfirmDialog, confirm] = useConfirm(
    "정말 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다.",
  );

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const { data, isLoading } = useStudents({
    page,
    limit,
    tab,
    search: searchQuery,
  });

  async function handleDelete(ids: string[]) {
    if (ids.length === 0) return;
    const ok = await confirm();
    if (ok) {
      ids.forEach((id) => deleteStudent(id));
    }
  }

  function handleCreate() {
    onCreateOpen();
  }

  function handleEdit(id: string) {
    onEditOpen(id);
  }

  const columns = useMemo(
    () => getStudentColumns({ onEdit: handleEdit, onDelete: handleDelete }),
    [],
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        setSearchQuery(term);
      }, 500),
    [setSearchQuery],
  );

  useEffect(() => {
    return () => debouncedSearch.cancel?.();
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col gap-4">
      <StudentStatsCards />

      <div className="flex justify-between items-center bg-white p-3 border border-slate-200 rounded">
        <StudentFilterTabs />
        <Input
          placeholder="이름으로 검색..."
          className="w-64"
          defaultValue={searchQuery}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        rowKey="id"
        createButtonLabel="+ 학생 등록"
        onCreate={handleCreate}
        deleteButtonLabel="선택 삭제"
        onDelete={handleDelete}
        showCheckbox={true}
      />

      <ConfirmDialog />
    </div>
  );
}
