"use client";

import { useEffect, useMemo } from "react";
import { useSession }          from "@/shared/hooks/useSession";
import { useMessageStore }     from "@/features/message/store";
import { MessageContactModal } from "./MessageContactModal";
import { MessageModal }        from "./form/MessageModal";
import { Table }               from "@/shared/components/Table";
import { Button }              from "@/shared/components/ui/button";
import { SquarePen }           from "lucide-react";
import { useReceivedMessages } from "../query";
import { getReceivedColumns }  from "@/app/(director)/director-message/received/column";
export function ReceivedMessageSection() {
  const { data: user }                    = useSession();
  const { reset, openContactModal }       = useMessageStore();
  const { data, isLoading }               = useReceivedMessages({ page: 1, limit: 10 }, user?.id);

  useEffect(() => { reset(); }, [user?.id]);

  const columns = useMemo(() => getReceivedColumns(), []);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button variant="primary" size="sm" onClick={openContactModal}>
          <SquarePen className="w-3.5 h-3.5" />새 쪽지
        </Button>
      </div>

      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
        showCheckbox={false}
        statusReadonly
      />

      <MessageContactModal />
      <MessageModal />
    </div>
  );
}
