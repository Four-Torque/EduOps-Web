"use client";

import { Table } from "@/shared/components/Table";
import { useConfirm } from "@/shared/hooks/useConfirm";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { getUserColumns } from "./column";
import { useUserStore } from "@/features/user/store";
import {
  useApproveUser,
  useFindUsers,
  useDeactivateUsers,
} from "@/features/user/query";
import { UserFilterTabs } from "@/features/user/components/UserFilterTabs";
import { UserTabFilter } from "@/features/user/type";
import { Input } from "@/shared/components/ui/input";
import { debounce } from "@/shared/lib/utils";

export default function UserPage() {
  const [activeTab, setActiveTab] = useState<UserTabFilter>("all");
  const searchParams = useSearchParams();
  const { q, setQ, onCreateOpen, onEditOpen } = useUserStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말 비활성화하시겠습니까?",
    "비활성화된 사용자는 로그인이 차단되며 근로 상태가 퇴사로 변경됩니다.",
  );

  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");
  const { data, isLoading } = useFindUsers({
    page,
    limit,
    isApproved: activeTab === "pending" ? false : true,
    search: q,
  });

  const { mutate: approveUser } = useApproveUser();
  const { mutate: deactivateUsers } = useDeactivateUsers();

  async function handleDeactivate(selectedIds: string[]) {
    if (selectedIds.length === 0) return;
    const ok = await confirm();
    if (ok) {
      deactivateUsers(selectedIds);
    }
  }

  function handleCreate() {
    onCreateOpen();
  }

  function handleEdit(id: string) {
    onEditOpen(id);
  }

  function handleApprove(id: string) {
    approveUser(id);
  }

  const columns = useMemo(() => {
    return getUserColumns({
      onEdit: handleEdit,
      onDeactivate: handleDeactivate,
      onApprove: handleApprove,
    });
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        setQ(term);
      }, 500),
    [setQ],
  );

  useEffect(() => {
    return () => debouncedSearch.cancel?.();
  }, [debouncedSearch]);

  console.log("data: ", data);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center bg-white p-3 border border-slate-200 rounded">
        <UserFilterTabs active={activeTab} onChange={setActiveTab} />
        <Input
          placeholder="이름으로 검색..."
          className="w-64"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        createButtonLabel="+ 사용자 등록"
        onCreate={handleCreate}
        deleteButtonLabel="선택 비활성화"
        onDelete={handleDeactivate}
        currentPage={page}
        showCheckbox={activeTab === "pending" ? false : true}
      />

      <ConfirmDialog />
    </div>
  );
}
