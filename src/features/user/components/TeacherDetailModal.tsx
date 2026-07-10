"use client";

import { CardModal } from "@/shared/components/CardModal";
import { useTeacherStore } from "../store";
import TeacherDetail from "./TeacherDetail";

export default function TeacherDetailModal() {
  const { id, isViewOpen, onViewClose } = useTeacherStore();

  return (
    <CardModal
      open={isViewOpen}
      onOpenChange={(open) => {
        if (!open) onViewClose();
      }}
      title="강사 상세"
      size="lg"
      bodyClassName="bg-slate-50"
    >
      {isViewOpen && id && <TeacherDetail id={id} />}
    </CardModal>
  );
}
