import { useAssetApplicationStore } from "@/features/asset/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import AssetApplicationForm from "./form/AssetApplicationForm";
import { AssetApplicationFormSchema } from "@/features/asset/schema";
import z from "zod/v3";
import { useCreateAssetApplication } from "@/features/asset/query";

export default function CreateAssetApplicationDialog() {
  const { isCreateOpen, onCreateClose } = useAssetApplicationStore();
  const { mutate: createAssetApplication } = useCreateAssetApplication();

  const defaultValues: z.infer<typeof AssetApplicationFormSchema> = {
    categoryId: "",
    name: "",
    quantity: 1,
    price: 0,
    vendorId: "",
    reason: "",
  };

  function onSubmit(values: z.infer<typeof AssetApplicationFormSchema>) {
    createAssetApplication(values, {
      onSuccess: () => {
        onCreateClose();
      },
    });
  }

  return (
    <Dialog open={isCreateOpen} onOpenChange={onCreateClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">새 자재 요청</DialogTitle>
        </DialogHeader>
        <AssetApplicationForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
}
