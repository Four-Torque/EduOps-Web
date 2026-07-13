"use client";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useStudentStore } from "@/features/student/store";
import { useRegisterStudent } from "@/features/student/query";
import StudentForm from "./form/StudentForm";
import { INITIAL_STUDENT_FORM } from "@/features/student/store";

export default function CreateStudentDialog() {
  const { isCreateOpen, onCreateClose } = useStudentStore();
  const { mutate: register } = useRegisterStudent();

  const onSubmit = (values: any) => {
    register(values, {
      onSuccess: () => {
        onCreateClose();
      },
    });
  };

  return (
    <Dialog open={isCreateOpen} onOpenChange={onCreateClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">학생 등록</DialogTitle>
        </DialogHeader>
        <StudentForm
          defaultValues={INITIAL_STUDENT_FORM}
          onSubmit={onSubmit}
          isEdit={false}
        />
      </DialogContent>
    </Dialog>
  );
}
