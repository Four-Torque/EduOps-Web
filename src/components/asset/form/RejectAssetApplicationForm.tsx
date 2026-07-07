import SubmitButton from "@/components/common/SubmitButton";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { RejectAssetApplicationFormSchema } from "@/validations/asset.valid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod/v3";

interface RejectAssetApplicationFormProps {
  onSubmit: (values: z.infer<typeof RejectAssetApplicationFormSchema>) => void;
  defaultValues: z.infer<typeof RejectAssetApplicationFormSchema>;
}

export default function RejectAssetApplicationForm({
  onSubmit,
  defaultValues,
}: RejectAssetApplicationFormProps) {
  const form = useForm<z.infer<typeof RejectAssetApplicationFormSchema>>({
    resolver: zodResolver(RejectAssetApplicationFormSchema),
    defaultValues,
  });

  function handleSubmit(
    values: z.infer<typeof RejectAssetApplicationFormSchema>,
  ) {
    onSubmit(values);
  }
  return (
    <form
      id="reject-asset-application-form"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Controller
        name="rejectedReason"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="gap-2">
            <FieldLabel htmlFor="rejectedReason" className="font-semibold">
              거절 사유
            </FieldLabel>
            <Textarea
              {...field}
              id="rejectedReason"
              placeholder="거절 사유를 입력하세요"
              rows={3}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <SubmitButton title="제출" className="h-12" />
    </form>
  );
}
