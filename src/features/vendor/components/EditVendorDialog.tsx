import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import VendorForm from "./form/VendorForm";
import { VendorFormSchema } from "@/features/vendor/schema";
import { useVendorStore } from "@/features/vendor/store";
import { useEditVendor, useFindVendorById } from "@/features/vendor/query";
import z from "zod/v3";

export default function EditVendorDialog() {
  const { isEditOpen, onEditClose, id } = useVendorStore();
  const { data, isLoading } = useFindVendorById(id);
  const { mutate: editVendor } = useEditVendor(id);
  const defaultValues: z.infer<typeof VendorFormSchema> = {
    name: data?.name || "",
    phone: data?.phone || "",
    email: data?.email || "",
  };

  if (isLoading) {
    return null;
  }

  function onSubmit(values: z.infer<typeof VendorFormSchema>) {
    editVendor(values, {
      onSuccess: () => {
        onEditClose();
      },
    });
  }

  return (
    <Dialog open={isEditOpen} onOpenChange={onEditClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">구매처 수정</DialogTitle>
        </DialogHeader>
        <VendorForm defaultValues={defaultValues} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
