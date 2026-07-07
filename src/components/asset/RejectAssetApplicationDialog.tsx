import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useAssetApplicationStore } from "@/store/asset/asset.store";
import RejectAssetApplicationForm from "./form/RejectAssetApplicationForm";
import { useEditAssetApplicationStatus } from "@/hooks/asset/useAsset";
import z from "zod/v3";
import { RejectAssetApplicationFormSchema } from "@/validations/asset.valid";

export default function RejectAssetApplicationDialog() {
  const { isRejectOpen, onRejectClose, id, status } =
    useAssetApplicationStore();
  const { mutate: editStatus } = useEditAssetApplicationStatus();

  const defaultValues: z.infer<typeof RejectAssetApplicationFormSchema> = {
    rejectedReason: "",
  };

  function onSubmit(values: z.infer<typeof RejectAssetApplicationFormSchema>) {
    editStatus(
      { id, status, ...values },
      {
        onSuccess: () => {
          onRejectClose();
        },
      },
    );
  }
  return (
    <Dialog open={isRejectOpen} onOpenChange={onRejectClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            자재 요청 거절
          </DialogTitle>
        </DialogHeader>
        <RejectAssetApplicationForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
