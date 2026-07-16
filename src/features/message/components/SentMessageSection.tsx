"use client";

import { useEffect, useMemo } from "react";
import { useSession }          from "@/shared/hooks/useSession";
import { useMessageStore }     from "@/features/message/store";
import { MessageContactModal } from "./MessageContactModal";
import { MessageModal }        from "./form/MessageModal";
import { Table }               from "@/shared/components/Table";
import { useFindSentMessages } from "../query";
import { getSentColumns }      from "@/app/(director)/director-message/column";

export function SentMessageSection() {
  const { data: user }       = useSession();
  const { reset }            = useMessageStore();
  const { data, isLoading }  = useFindSentMessages({ page: 1, limit: 1000 }, user?.id);

  useEffect(() => { reset(); }, [user?.id]);

  const columns = useMemo(() => getSentColumns(), []);

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        showCheckbox={false}
        statusReadonly
      />


      <MessageModal />
    </div>
  );
}
