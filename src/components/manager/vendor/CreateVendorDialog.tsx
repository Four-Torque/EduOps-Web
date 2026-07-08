import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import VendorForm from "./form/VendorForm";
import { VendorFormSchema } from "@/validations/vendor.valid";
import { useVendorStore } from "@/store/manager/vendor.store";
import z from "zod/v3";
import { useCreateVendor } from "@/hooks/vendor/useVendor";

export default function CreateVendorDialog() {
  const { isCreateOpen, onCreateClose } = useVendorStore();
  const { mutate: createVendor } = useCreateVendor();
  const defaultValues: z.infer<typeof VendorFormSchema> = {
    name: "",
    phone: "",
    email: "",
  };

  function onSubmit(values: z.infer<typeof VendorFormSchema>) {
    createVendor(values, {
      onSuccess: () => {
        onCreateClose();
      },
    });
  }

  return (
    <Dialog open={isCreateOpen} onOpenChange={onCreateClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">구매처 등록</DialogTitle>
        </DialogHeader>
        <VendorForm defaultValues={defaultValues} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
