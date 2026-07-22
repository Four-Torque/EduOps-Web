"use client";

import { useEffect, useMemo } from "react";
import { useDeleteMessages } from "../query";
import { useSession } from "@/shared/hooks/useSession";
import { useMessageStore } from "@/features/message/store";
import { Table } from "@/shared/components/Table";
import { useFindSentMessages } from "../query";
import { getSentColumns } from "@/app/(director)/director-message/send/column";
import { useSearchParams } from "next/navigation";
import { useConfirm } from "@/shared/hooks/useConfirm";

export function SentMessageSection() {
  const { data: user } = useSession();
  const { reset } = useMessageStore();
  const { mutate: deleteMessages } = useDeleteMessages();
  const [ConfirmDialog, confirm] = useConfirm(
    "쪽지를 삭제하시겠습니까?",
    "삭제된 쪽지는 복구할 수 없습니다.",
  );
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const { data, isLoading } = useFindSentMessages(
    { page, limit: 10 },
    user?.id,
  );

  useEffect(() => {
    reset();
  }, [user?.id]);

  const columns = useMemo(() => getSentColumns(), []);

  async function handleDelete(ids: string[]) {
    const ok = await confirm();
    if (ok) {
      deleteMessages({ ids, type: "SENT" });
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
        deleteButtonLabel="쪽지 삭제"
        onDelete={handleDelete}
        statusReadonly
      />
    </>
  );
}
