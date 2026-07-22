import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import z from "zod/v3";
import { UserFormSchema } from "@/features/user/schema";
import { useUserStore } from "@/features/user/store";
import { useCreateUser } from "@/features/user/query";
import UserForm from "./form/UserForm";

export default function CreateUserDialog() {
  const { isCreateOpen, onCreateClose } = useUserStore();
  const { mutate: createUser } = useCreateUser();
  const defaultValues: z.infer<typeof UserFormSchema> = {
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "TEACHER",
    status: "ACTIVE",
    employmentStatus: "WORKING",
    joinedAt: undefined,
    resignedAt: undefined,
  };

  function onSubmit(values: z.infer<typeof UserFormSchema>) {
    createUser(values, {
      onSuccess: () => {
        onCreateClose();
      },
    });
  }

  return (
    <Dialog open={isCreateOpen} onOpenChange={onCreateClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">사용자 등록</DialogTitle>
        </DialogHeader>
        <UserForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isEdit={false}
        />
      </DialogContent>
    </Dialog>
  );
}
