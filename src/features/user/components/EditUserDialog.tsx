"use client";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import z from "zod/v3";
import { UserFormSchema } from "@/features/user/schema";
import { useUserStore } from "@/features/user/store";
import { useUpdateUser, useUserDetail } from "@/features/user/query";
import UserForm from "./form/UserForm";

export default function EditUserDialog() {
  const { isEditOpen, editId, onEditClose } = useUserStore();
  const { data: user, isLoading } = useUserDetail(editId);
  const { mutate: updateUser } = useUpdateUser(editId);

  const defaultValues: z.infer<typeof UserFormSchema> = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    password: "",
    role: user?.role ?? "TEACHER",
    status: user?.status ?? "ACTIVE",
    employmentStatus: user?.employmentStatus ?? "WORKING",
    joinedAt: user?.joinedAt ?? undefined,
    resignedAt: user?.resignedAt ?? undefined,
  };

  function onSubmit(values: z.infer<typeof UserFormSchema>) {
    updateUser(values, {
      onSuccess: () => {
        onEditClose();
      },
    });
  }

  if (isLoading || !user) {
    return null;
  }

  return (
    <Dialog open={isEditOpen} onOpenChange={onEditClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            사용자 정보 수정
          </DialogTitle>
        </DialogHeader>

        <UserForm
          key={user.id}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isEdit={true}
        />
      </DialogContent>
    </Dialog>
  );
}
