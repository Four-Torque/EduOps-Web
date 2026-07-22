import SubmitButton from "@/shared/components/SubmitButton";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod/v3";
import { ClassFormSchema } from "../../schema";
import { debounce, formatNumber } from "@/shared/lib/utils";
import { useCallback, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Teacher } from "@/features/user/type";
import { useTeachers } from "@/features/user/query";
import { CreatableSelect } from "@/shared/components/CreatableSelect";
import { Subject } from "@/features/subject/type";
import { useFindSubjects } from "@/features/subject/query";
import { DatePicker } from "@/shared/components/DatePicker";
import {
  calendarEndMonth,
  calendarStartMonth,
} from "@/shared/constants/day.constants";

interface ClassFormProps {
  onSubmit: (values: z.infer<typeof ClassFormSchema>) => void;
  defaultValues: z.infer<typeof ClassFormSchema>;
}

export default function ClassForm({ onSubmit, defaultValues }: ClassFormProps) {
  const [search, setSearch] = useState("");
  const [fee, setFee] = useState<string>(() => formatNumber(defaultValues.fee));
  const [capacity, setCapacity] = useState<string>(() =>
    formatNumber(defaultValues.capacity),
  );
  const { data: teachers, isLoading } = useTeachers();
  const { data: subjects } = useFindSubjects({ search });
  const form = useForm<z.infer<typeof ClassFormSchema>>({
    resolver: zodResolver(ClassFormSchema),
    defaultValues,
  });

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearch(term);
    }, 300),
    [],
  );

  useEffect(() => {
    return () => debouncedSearch.cancel?.();
  }, [debouncedSearch]);
  function handleSubmit(values: z.infer<typeof ClassFormSchema>) {
    onSubmit(values);
  }
  if (isLoading) {
    return null;
  }

  return (
    <form id="class-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup className="flex flex-col gap-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="name" className="font-semibold">
                강좌명
              </FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                className="aria-invalid:ring-1"
                aria-invalid={fieldState.invalid}
                placeholder="강좌명을 입력하세요."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <FieldGroup className="grid grid-cols-2 gap-4">
          <Controller
            name="teacherId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel htmlFor="teacherId" className="font-semibold">
                  담당 강사
                </FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="담당 강사를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    onPointerDownOutside={(e) => e.preventDefault()}
                  >
                    <SelectGroup>
                      {teachers?.map((teacher: Teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="subjectName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel htmlFor="subjectName" className="font-semibold">
                  담당 과목
                </FieldLabel>
                <CreatableSelect
                  options={subjects?.map((subject: Subject) => ({
                    value: subject.id,
                    label: subject.name,
                  }))}
                  value={field.value}
                  onChange={(value) => {
                    debouncedSearch(value);
                    field.onChange(value);
                  }}
                  placeholder="과목을 입력하거나 선택하세요"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="fee"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel htmlFor="fee" className="font-semibold">
                  강의료
                </FieldLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder="강의료를 입력하세요"
                  value={fee}
                  onChange={(e) => {
                    const rawValue = e.target.value;
                    const cleanValue = rawValue.replace(/[^0-9]/g, "");
                    const numericValue = cleanValue
                      ? parseInt(cleanValue, 10)
                      : 0;
                    field.onChange(numericValue);
                    setFee(formatNumber(numericValue));
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="capacity"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel htmlFor="capacity" className="font-semibold">
                  정원 (명)
                </FieldLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder="정원을 입력하세요"
                  value={capacity}
                  onChange={(e) => {
                    const value = e.target.value;
                    const numericValue = value ? parseInt(value, 10) : 0;
                    field.onChange(numericValue);
                    setCapacity(formatNumber(numericValue));
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="startDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel htmlFor="startDate" className="font-semibold">
                  시작일
                </FieldLabel>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="시작일을 선택하세요"
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
          <Controller
            name="endDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel htmlFor="endDate" className="font-semibold">
                  종료일
                </FieldLabel>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="종료일을 선택하세요"
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
        </FieldGroup>
      </FieldGroup>
      <SubmitButton title="저장" className="h-10" />
    </form>
  );
}
