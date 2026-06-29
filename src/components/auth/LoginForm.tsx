"use client";

import { Card, CardContent } from "../ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { LockIcon, UserIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod/v3";
import { LoginFormSchema } from "@/validations/auth.valid";
import FormInput from "@/components/common/FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/common/useLocalStorage";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const [mounted, setMounted] = useState(false);
  const [rememberedEmail, setRememberedEmail] = useLocalStorage(
    "rememberedEmail",
    "",
  );

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: rememberedEmail || "",
      password: "",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function handleSubmit(values: z.infer<typeof LoginFormSchema>) {
    console.log(values);
  }

  function handleRememberEmailChange(checked: boolean) {
    if (checked) {
      setRememberedEmail(form.getValues("email"));
    } else {
      setRememberedEmail("");
    }
  }

  return (
    <Card className="w-full sm:max-w-100 pt-9 px-10 pb-8">
      <CardContent className="p-0">
        <form id="login-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="email" className="font-semibold">
                    이메일
                  </FieldLabel>
                  <FormInput
                    {...field}
                    icon={UserIcon}
                    id="email"
                    type="email"
                    ariaInvalid={fieldState.invalid}
                    placeholder="이메일을 입력하세요."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="password" className="font-semibold">
                    비밀번호
                  </FieldLabel>
                  <FormInput
                    {...field}
                    icon={LockIcon}
                    id="password"
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

          <div className="flex items-center gap-2 my-5">
            <Checkbox
              id="remember-email"
              checked={!!rememberedEmail}
              onCheckedChange={handleRememberEmailChange}
            />
            <label
              htmlFor="remember-email"
              className="text-sm font-medium text-muted-foreground cursor-pointer select-none"
            >
              이메일 기억하기
            </label>
          </div>

          <Button
            className="size-full p-3.75 text-white border-none rounded-[7px] text-[16px] font-bold cursor-pointer tracking-[0.5px] transition-colors duration-180"
            type="submit"
          >
            로그인
          </Button>
        </form>

        <Separator className="mt-6 mb-4.5" />

        <div className="flex justify-center items-center gap-0 text-[13px] text-muted-foreground">
          <Link
            href="/forgot-password"
            className="hover:text-primary transition-colors duration-180"
          >
            <p className="px-4">비밀번호 찾기</p>
          </Link>
          <span className="text-muted-foreground text-sm">|</span>
          <Link
            href="/register"
            className="hover:text-primary transition-colors duration-180"
          >
            <p className="px-4">회원가입</p>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
