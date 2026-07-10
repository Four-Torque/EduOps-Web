"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { StudentRegisterForm }     from "./StudentRegisterForm";
import { useStudentRegisterStore } from "@/features/student/store";

export function StudentRegisterDialog() {
  const { isModalOpen, editingId, closeModal } = useStudentRegisterStore();

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {editingId ? "학생 수정" : "학생 등록"}
          </DialogTitle>
        </DialogHeader>
        <StudentRegisterForm />
      </DialogContent>
    </Dialog>
  );
}
