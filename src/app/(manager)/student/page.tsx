"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Table } from "@/shared/components/Table";
import { useConfirm } from "@/shared/hooks/useConfirm";
import { StudentStatsCards }    from "@/features/student/components/StudentStatsCards";
import { StudentFilterTabs }    from "@/features/student/components/StudentFilterTabs";
import { StudentSearchBar }     from "@/features/student/components/StudentSearchBar";
import { StudentRegisterDialog } from "@/features/student/components/form/StudentRegisterDialog";
import { useStudentStore }      from "@/features/student/store";
import { useStudents, useDeleteStudent } from "@/features/student/query";
import { getStudentColumns } from "./column";

export default function StudentPage() {
  const searchParams = useSearchParams();
  const page  = searchParams.get("page")  || "1";
  const limit = searchParams.get("limit") || "10";

  const { tab, searchQuery, onEditOpen } = useStudentStore();
  const { data, isLoading }  = useStudents({ page, limit, tab, search: searchQuery });
  const { mutate: deleteStudent } = useDeleteStudent();

  const [ConfirmDialog, confirm] = useConfirm(
    "정말 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다.",
  );

  async function handleDelete(ids: string[]) {
    const ok = await confirm();
    if (ok) ids.forEach((id) => deleteStudent(id));
  }

  function handleEdit(id: string) {
    onEditOpen(id);
  }

  const columns = useMemo(
    () => getStudentColumns({ onEdit: handleEdit, onDelete: handleDelete }),
    [],
  );

  return (
    <>
      <StudentStatsCards />
      <div className="border border-slate-200 rounded mt-6">
        <StudentFilterTabs />
        <StudentSearchBar />
        <Table
          columns={columns}
          data={data}
          isLoading={isLoading}
          rowKey="id"
          showCheckbox={true}
          onDelete={handleDelete}
        />
      </div>
      <StudentRegisterDialog />
      <ConfirmDialog />
    </>
  );
}