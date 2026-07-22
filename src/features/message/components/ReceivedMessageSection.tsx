"use client";

import { useEffect, useMemo } from "react";
import { useSession } from "@/shared/hooks/useSession";
import { useMessageStore } from "@/features/message/store";
import { MessageContactModal } from "./MessageContactModal";
import { Table } from "@/shared/components/Table";
import { useDeleteMessages, useReceivedMessages } from "../query";
import { getReceivedColumns } from "@/app/(director)/director-message/received/column";
import { useSearchParams } from "next/navigation";
import { useConfirm } from "@/shared/hooks/useConfirm";
export function ReceivedMessageSection() {
  const { data: user } = useSession();
  const { reset, openContactModal } = useMessageStore();
  const { mutate: deleteMessages } = useDeleteMessages();
  const [ConfirmDialog, confirm] = useConfirm(
    "쪽지를 삭제하시겠습니까?",
    "삭제된 쪽지는 복구할 수 없습니다.",
  );
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const { data, isLoading } = useReceivedMessages(
    { page, limit: 10 },
    user?.id,
  );

  useEffect(() => {
    reset();
  }, [user?.id]);

  const columns = useMemo(() => getReceivedColumns(), []);

  async function handleDelete(ids: string[]) {
    const ok = await confirm();
    if (ok) {
      deleteMessages({ ids, type: "RECEIVED" });
    }
  }

  return (
    <>
      <ConfirmDialog />
      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        showCheckbox={true}
        createButtonLabel="새 쪽지"
        deleteButtonLabel="쪽지 삭제"
        onCreate={openContactModal}
        onDelete={handleDelete}
        currentPage={page}
        statusReadonly
      />

      <MessageContactModal />
    </>
  );
}
