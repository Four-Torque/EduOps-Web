import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { AssetApplicationFormSchema } from "@/validations/asset.valid";
import { Controller, UseFormReturn } from "react-hook-form";
import z from "zod/v3";

interface ReasonFieldProps {
  form: UseFormReturn<z.infer<typeof AssetApplicationFormSchema>>;
}

export default function ReasonField({ form }: ReasonFieldProps) {
  return (
    <Controller
      name="reason"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field className="gap-2">
          <FieldLabel htmlFor="reason" className="font-semibold">
            요청 사유
          </FieldLabel>
          <Textarea
            {...field}
            id="reason"
            placeholder="요청 사유를 입력하세요"
            rows={3}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
