"use client";

import { useEffect, useMemo } from "react";
import { useSession } from "@/shared/hooks/useSession";
import { useMessageStore } from "@/features/message/store";
import { Table } from "@/shared/components/Table";
import { useFindSentMessages } from "../query";
import { getSentColumns } from "@/app/(director)/director-message/send/column";
import { useSearchParams } from "next/navigation";

export function SentMessageSection() {
  const { data: user } = useSession();
  const { reset } = useMessageStore();
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

  function handleDelete(ids: string[]) {
    console.log("Delete messages with IDs:", ids);
  }

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        showCheckbox={true}
        deleteButtonLabel="쪽지 삭제"
        onDelete={handleDelete}
        statusReadonly
      />
    </div>
  );
}
