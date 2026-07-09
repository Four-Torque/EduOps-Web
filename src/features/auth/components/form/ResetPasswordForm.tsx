"use client";

import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import Logo from "./Logo";
import { Separator } from "@/shared/components/ui/separator";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import FormInput from "@/shared/components/FormInput";
import { ChevronLeftIcon, LockIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v3";
import { ResetPasswordFormSchema } from "@/validations/auth.valid";
import Link from "next/link";
import SubmitButton from "../../../shared/components/SubmitButton";
import PasswordIndicator from "./PasswordIndicator";
import { useResetPassword } from "@/hooks/auth/useAuth";

interface ResetPasswordFormProps {
  token?: string;
  email?: string;
}

export default function ResetPasswordForm({
  token,
  email,
}: ResetPasswordFormProps) {
  const { mutate: resetPassword } = useResetPassword();
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: email || "",
      token: token || "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  function handleSubmit(values: z.infer<typeof ResetPasswordFormSchema>) {
    resetPassword(values);
  }

  return (
    <Card className="w-full sm:max-w-md pt-9 px-10 pb-8">
      <CardContent className="p-0">
        <CardHeader>
          <Logo
            icon={LockIcon}
            title="비밀번호 재설정"
            description="새로운 비밀번호를 입력해 주세요."
            bgColor="#eef2fa"
            textColor="#1a3a6b"
          />
        </CardHeader>

        <form
          id="reset-password-form"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FieldGroup>
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel htmlFor="newPassword" className="font-semibold">
                    새 비밀번호
                  </FieldLabel>
                  <FormInput
                    {...field}
                    icon={LockIcon}
                    id="newPassword"
                    type="password"
                    ariaInvalid={fieldState.invalid}
                    placeholder="비밀번호를 입력하세요."
                    autoComplete="off"
                  />

                  <PasswordIndicator value={field.value} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmNewPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel
                    htmlFor="confirmNewPassword"
                    className="font-semibold"
                  >
                    비밀번호 확인
                  </FieldLabel>
                  <FormInput
                    {...field}
                    icon={LockIcon}
                    id="confirmNewPassword"
                    type="password"
                    ariaInvalid={fieldState.invalid}
                    placeholder="비밀번호를 입력하세요."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <SubmitButton title="비밀번호 재설정" />
        </form>

        <Separator className="mt-6 mb-4.5 h-px" />

        <div className="flex justify-center items-center text-[13px] text-muted-foreground hover:text-primary transition-colors duration-180 cursor-pointer">
          <ChevronLeftIcon className="size-3.75" />
          <Link href="/login">
            <p className="px-1">로그인하러 가기</p>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
