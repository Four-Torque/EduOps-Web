import SubmitButton from "@/components/common/SubmitButton";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatPhoneNumber } from "@/lib/utils";
import { VendorFormSchema } from "@/validations/vendor.valid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod/v3";

interface VendorFormProps {
  onSubmit: (values: z.infer<typeof VendorFormSchema>) => void;
  defaultValues: z.infer<typeof VendorFormSchema>;
}

export default function VendorForm({
  onSubmit,
  defaultValues,
}: VendorFormProps) {
  const form = useForm<z.infer<typeof VendorFormSchema>>({
    resolver: zodResolver(VendorFormSchema),
    defaultValues,
  });

  function handleSubmit(values: z.infer<typeof VendorFormSchema>) {
    onSubmit(values);
  }

  return (
    <form id="vendor-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup className="gap-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="name" className="font-semibold">
                업체명
              </FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                className="aria-invalid:ring-1"
                aria-invalid={fieldState.invalid}
                placeholder="업체명을 입력하세요."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="email" className="font-semibold">
                이메일
              </FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                className="aria-invalid:ring-1"
                aria-invalid={fieldState.invalid}
                placeholder="이메일을 입력하세요."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="phone" className="font-semibold">
                전화번호
              </FieldLabel>
              <Input
                {...field}
                id="phone"
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value, "vendor");
                  field.onChange(formatted);
                }}
                type="text"
                className="aria-invalid:ring-1"
                aria-invalid={fieldState.invalid}
                placeholder="전화번호를 입력하세요."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <SubmitButton title="저장" className="h-10" />
      </FieldGroup>
    </form>
  );
}
