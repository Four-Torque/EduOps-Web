"use client";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useStudentStore } from "@/features/student/store";
import { useStudentDetail, useUpdateStudent } from "@/features/student/query";
import StudentForm from "./form/StudentForm";

export default function EditStudentDialog() {
  const { isEditOpen, editId, onEditClose } = useStudentStore();
  const { data: student, isLoading } = useStudentDetail(editId);
  const { mutate: updateStudent } = useUpdateStudent();

  const defaultValues = {
    name: student?.name ?? "",
    birthDate: student?.birthDate ?? "",
    phone: student?.phone ?? student?.Phonenumber ?? "",
    address: student?.address ?? "",
    addressDetail: student?.addressDetail ?? "",
    status: (student?.status === "active" || student?.status === "ENROLLED") ? ("active" as const) : ("inactive" as const),
  };

  const onSubmit = (values: any) => {
    if (editId) {
      updateStudent(
        { id: editId, form: values },
        {
          onSuccess: () => {
            onEditClose();
          },
        },
      );
    }
  };

  if (isLoading || !student) {
    return null;
  }

  return (
    <Dialog open={isEditOpen} onOpenChange={onEditClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">학생 정보 수정</DialogTitle>
        </DialogHeader>
        <StudentForm
          key={editId}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isEdit={true}
        />
      </DialogContent>
    </Dialog>
  );
}
