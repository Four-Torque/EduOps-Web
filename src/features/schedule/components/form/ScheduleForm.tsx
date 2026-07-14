"use client";

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
import { ScheduleFormSchema } from "@/features/schedule/schema";
import { useAllClasses } from "@/features/schedule/query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface ScheduleFormProps {
  onSubmit: (values: z.infer<typeof ScheduleFormSchema>) => void;
  defaultValues: z.infer<typeof ScheduleFormSchema>;
  isPending?: boolean;
}

const DAY_OF_WEEK_OPTIONS = [
  { value: "0", label: "일요일" },
  { value: "1", label: "월요일" },
  { value: "2", label: "화요일" },
  { value: "3", label: "수요일" },
  { value: "4", label: "목요일" },
  { value: "5", label: "금요일" },
  { value: "6", label: "토요일" },
];

export default function ScheduleForm({
  onSubmit,
  defaultValues,
  isPending = false,
}: ScheduleFormProps) {
  const form = useForm<z.infer<typeof ScheduleFormSchema>>({
    resolver: zodResolver(ScheduleFormSchema),
    defaultValues,
  });

  const { data: classes = [], isLoading: isLoadingClasses } = useAllClasses();

  return (
    <form id="schedule-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4 grid grid-cols-2">
        <Controller
          name="classId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2 col-span-2">
              <FieldLabel htmlFor="classId" className="font-semibold">
                강좌 선택
              </FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="classId" className="w-full">
                  <SelectValue
                    placeholder={
                      isLoadingClasses
                        ? "로딩 중..."
                        : "강좌를 선택해주세요"
                    }
                  />
                </SelectTrigger>
                <SelectContent position="popper">
                  {classes.map((cls: any) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name} ({cls.teacher?.name || "교사 미지정"})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="dayOfWeek"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="dayOfWeek" className="font-semibold">
                요일
              </FieldLabel>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={String(field.value)}
              >
                <SelectTrigger id="dayOfWeek" className="w-full">
                  <SelectValue placeholder="요일 선택" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {DAY_OF_WEEK_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="room"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="room" className="font-semibold">
                강의실
              </FieldLabel>
              <Input
                {...field}
                id="room"
                type="text"
                placeholder="101호"
                autoComplete="off"
                className="aria-invalid:ring-1"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="startTime"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="startTime" className="font-semibold">
                시작 시간
              </FieldLabel>
              <Input
                {...field}
                id="startTime"
                type="time"
                className="aria-invalid:ring-1"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="endTime"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="endTime" className="font-semibold">
                종료 시간
              </FieldLabel>
              <Input
                {...field}
                id="endTime"
                type="time"
                className="aria-invalid:ring-1"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <SubmitButton
        title={isPending ? "등록 중..." : "등록"}
        disabled={isPending}
        className="h-10 mt-6"
      />
    </form>
  );
}
