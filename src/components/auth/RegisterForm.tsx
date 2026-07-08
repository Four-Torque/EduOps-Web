"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  CircleCheckBigIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  UserRoundIcon,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod/v3";
import { RegisterFormSchema } from "@/validations/auth.valid";
import FormInput from "@/components/common/FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRegister } from "@/hooks/auth/useAuth";
import SubmitButton from "../common/SubmitButton";
import PasswordIndicator from "./PasswordIndicator";
import { formatPhoneNumber } from "@/lib/utils";

export default function RegisterForm() {
  const { mutate: register } = useRegister();
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  function handleSubmit(values: z.infer<typeof RegisterFormSchema>) {
    register(values);
  }

  return (
    <Card className="w-full sm:max-w-lg pt-9 px-10 pb-8">
      <CardContent className="p-0">
        <CardHeader>
          <CardTitle className="text-center text-[22px]">
            새 계정 만들기
          </CardTitle>
          <CardDescription className="text-center text-sm mb-5.5">
            교육 환경을 더 체계적으로 관리하세요.
          </CardDescription>
        </CardHeader>
        <Separator className="mb-6.5" />
        <form id="register-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-2">
                  <FieldLabel htmlFor="name" className="font-semibold">
                    이름
                  </FieldLabel>
                  <FormInput
                    {...field}
                    icon={UserRoundIcon}
                    id="name"
                    type="text"
                    ariaInvalid={fieldState.invalid}
                    placeholder="성함을 입력하세요."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                  <FormInput
                    {...field}
                    icon={MailIcon}
                    id="email"
                    type="email"
                    ariaInvalid={fieldState.invalid}
                    placeholder="example@educare.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex items-start gap-2">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-2 flex-1">
                    <FieldLabel htmlFor="password" className="font-semibold">
                      비밀번호
                    </FieldLabel>
                    <FormInput
                      {...field}
                      icon={LockIcon}
                      id="password"
                      type="password"
                      ariaInvalid={fieldState.invalid}
                      placeholder="비밀번호"
                      autoComplete="off"
                    />
                    <div className="text-xs">
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-2 flex-1">
                    <FieldLabel
                      htmlFor="confirmPassword"
                      className="font-semibold"
                    >
                      비밀번호 확인
                    </FieldLabel>
                    <FormInput
                      {...field}
                      icon={CircleCheckBigIcon}
                      id="confirmPassword"
                      type="password"
                      ariaInvalid={fieldState.invalid}
                      placeholder="비밀번호 확인"
                      autoComplete="off"
                    />
                    <div className="text-xs">
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />
            </div>

            <PasswordIndicator value={form.watch("password")} />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-2">
                  <FieldLabel htmlFor="phone" className="font-semibold">
                    전화번호
                  </FieldLabel>
                  <FormInput
                    {...field}
                    icon={PhoneIcon}
                    id="phone"
                    type="text"
                    ariaInvalid={fieldState.invalid}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(
                        e.target.value,
                        "phone",
                      );
                      field.onChange(formatted);
                    }}
                    placeholder="010-0000-0000"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Controller
            name="terms"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1 my-5">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium text-muted-foreground cursor-pointer select-none"
                  >
                    <span className="text-primary hover:underline">
                      이용약관
                    </span>{" "}
                    및{" "}
                    <span className="text-primary hover:underline">
                      개인정보처리방침
                    </span>
                    에 동의합니다.
                  </label>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
            )}
          />

          <SubmitButton title="가입하기" />
        </form>

        <Separator className="mt-6 mb-4.5 h-0" />

        <div className="flex justify-center items-center text-[13px] text-muted-foreground">
          <p>이미 계정이 있으신가요?</p>
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            <p className="px-1">로그인</p>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
