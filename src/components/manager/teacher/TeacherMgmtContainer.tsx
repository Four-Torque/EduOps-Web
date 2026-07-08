"use client";

import { useState } from "react";
import { useTeachers, useDeleteTeacher } from "@/hooks/manager/teacher.hooks";
import { CardModal } from "@/components/common/CardModal";
import { TeacherSearchBar } from "./TeacherSearchBar";
import { TeacherTable } from "./TeacherTable";
import TeacherDetail from "./TeacherDetail";

const PAGE_SIZE = 10;

export function TeacherMgmtContainer() {
  const { data: teachers, isLoading, error } = useTeachers();
  const { mutate: deleteTeacher } = useDeleteTeacher();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const list = teachers ?? [];
  const filtered = list.filter((t) => t.name.includes(query.trim()));
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleQueryChange(value: string) {
    setQuery(value);
    setPage(1); // 검색어 바뀌면 첫 페이지로
  }

  function handleDelete(id: string, name: string) {
    if (confirm(`${name} 강사를 삭제하시겠습니까?`)) {
      deleteTeacher(id);
    }
  }

  return (
    <div>
      <div className="rounded border border-slate-200">
        <TeacherSearchBar query={query} onQueryChange={handleQueryChange} />

        <TeacherTable
          teachers={visible}
          isLoading={isLoading}
          error={!!error}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onRowClick={setSelectedId}
          onDelete={handleDelete}
          onPageChange={setPage}
        />
      </div>

      <CardModal
        open={selectedId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
        title="강사 상세"
        size="lg"
        bodyClassName="bg-slate-50"
      >
        {selectedId !== null && <TeacherDetail id={selectedId} />}
      </CardModal>
    </div>
  );
}
