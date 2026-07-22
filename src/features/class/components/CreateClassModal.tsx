"use client";

import { CardModal } from "@/shared/components/CardModal";
import { useCreateClass } from "@/features/class/query";
import ClassForm from "./form/ClassForm";
import z from "zod/v3";
import { ClassFormSchema } from "../schema";

interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateClassModal({ isOpen, onClose }: CreateClassModalProps) {
  const { mutate: createClass } = useCreateClass();

  const defaultValues: z.infer<typeof ClassFormSchema> = {
    name: "",
    fee: 0,
    capacity: 0,
    startDate: "",
    endDate: "",
    teacherId: "",
    subjectName: "",
  };

  function handleSubmit(values: z.infer<typeof ClassFormSchema>) {
    createClass(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <CardModal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title="강좌 추가"
      description="새로운 강좌를 직접 생성합니다."
      size="md"
    >
      <ClassForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </CardModal>
  );
}
