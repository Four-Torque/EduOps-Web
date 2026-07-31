"use client";

import SubmitButton from "@/shared/components/SubmitButton";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { formatPhoneNumber } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod/v3";
import { StudentFormSchema } from "@/features/student/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { AddressField } from "@/shared/components/field/AddressField";

interface StudentFormProps {
  onSubmit: (values: z.infer<typeof StudentFormSchema>) => void;
  defaultValues: z.infer<typeof StudentFormSchema>;
  isEdit?: boolean;
}

export default function StudentForm({
  onSubmit,
  defaultValues,
  isEdit = false,
}: StudentFormProps) {
  const form = useForm<z.infer<typeof StudentFormSchema>>({
    resolver: zodResolver(StudentFormSchema),
    defaultValues,
  });

  return (
    <form id="student-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4 grid grid-cols-2">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="name" className="font-semibold">
                이름
              </FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                className="aria-invalid:ring-1"
                aria-invalid={fieldState.invalid}
                placeholder="김민주"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="birthDate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="birthDate" className="font-semibold">
                생년월일
              </FieldLabel>
              <Input
                {...field}
                id="birthDate"
                type="date"
                className="aria-invalid:ring-1"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2 col-span-2">
              <FieldLabel htmlFor="phone" className="font-semibold">
                핸드폰 번호
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
                placeholder="010-0000-0000"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="col-span-2">
          <Controller
            name="address"
            control={form.control}
            render={({ field: addressField, fieldState }) => (
              <Controller
                name="addressDetail"
                control={form.control}
                render={({ field: detailField }) => (
                  <AddressField
                    address={addressField.value}
                    addressDetail={detailField.value ?? ""}
                    onAddressChange={addressField.onChange}
                    onAddressDetailChange={detailField.onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />
            )}
          />
        </div>

        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2 col-span-2">
              <FieldLabel htmlFor="status" className="font-semibold">
                상태
              </FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="상태 선택" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="active">활동 중</SelectItem>
                  <SelectItem value="inactive">비활동</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <SubmitButton title={isEdit ? "수정" : "등록"} className="h-10 mt-6" />
    </form>
  );
}
