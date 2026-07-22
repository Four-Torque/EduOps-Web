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
import { UserFormSchema, CreateUserFormSchema } from "@/features/user/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { DatePicker } from "@/shared/components/DatePicker";
import {
  calendarEndMonth,
  calendarStartMonth,
} from "@/shared/constants/day.constants";

interface UserFormProps {
  onSubmit: (values: z.infer<typeof UserFormSchema>) => void;
  defaultValues: z.infer<typeof UserFormSchema>;
  isEdit?: boolean;
}

export default function UserForm({
  onSubmit,
  defaultValues,
  isEdit = false,
}: UserFormProps) {
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(isEdit ? UserFormSchema : CreateUserFormSchema),
    defaultValues,
  });

  function handleSubmit(values: z.infer<typeof UserFormSchema>) {
    if (isEdit) {
      delete (values as Partial<z.infer<typeof UserFormSchema>>).email;
    }
    onSubmit(values);
  }

  return (
    <form id="user-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup className="gap-4 grid grid-cols-2">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="name" className="font-semibold">
                성함
              </FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                className="aria-invalid:ring-1"
                aria-invalid={fieldState.invalid}
                placeholder="성함"
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
                className="aria-invalid:ring-1 disabled:opacity-60"
                aria-invalid={fieldState.invalid}
                placeholder="이메일"
                autoComplete="off"
                disabled={isEdit}
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
                placeholder="010-0000-0000"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {!isEdit && (
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel htmlFor="password" className="font-semibold">
                  비밀번호
                </FieldLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  className="aria-invalid:ring-1"
                  aria-invalid={fieldState.invalid}
                  placeholder="비밀번호 (8자 이상)"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

        <Controller
          name="role"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="role" className="font-semibold">
                역할
              </FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="역할 선택" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="DIRECTOR">원장</SelectItem>
                  <SelectItem value="MANAGER">관리자</SelectItem>
                  <SelectItem value="TEACHER">강사</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="status" className="font-semibold">
                계정 상태
              </FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="계정 상태 선택" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="ACTIVE">활성</SelectItem>
                  <SelectItem value="INACTIVE">비활성</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="employmentStatus"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="employmentStatus" className="font-semibold">
                재직 상태
              </FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="employmentStatus" className="w-full">
                  <SelectValue placeholder="재직 상태 선택" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="WORKING">재직</SelectItem>
                  <SelectItem value="ON_LEAVE">휴직</SelectItem>
                  <SelectItem value="RESIGNED">퇴사</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="joinedAt"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2 flex flex-col">
              <FieldLabel htmlFor="joinedAt" className="font-semibold">
                입사일
              </FieldLabel>
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                placeholder="입사일 선택"
                hasError={fieldState.invalid}
                startMonth={calendarStartMonth}
                endMonth={calendarEndMonth}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {isEdit && (
          <Controller
            name="resignedAt"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-2 flex flex-col">
                <FieldLabel htmlFor="resignedAt" className="font-semibold">
                  퇴사일
                </FieldLabel>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="퇴사일 선택"
                  hasError={fieldState.invalid}
                  startMonth={calendarStartMonth}
                  endMonth={calendarEndMonth}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}
      </FieldGroup>
      <SubmitButton title="저장" className="h-10 mt-6" />
    </form>
  );
}
