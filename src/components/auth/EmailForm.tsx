"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Logo from "./Logo";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import FormInput from "@/components/common/FormInput";
import { ChevronLeftIcon, MailIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v3";
import { EmailFormSchema } from "@/validations/auth.valid";
import Link from "next/link";
import { useSendResetPasswordMail } from "@/hooks/auth/useAuth";

export default function EmailForm() {
  const { mutate: sendResetPasswordMail } = useSendResetPasswordMail();
  const form = useForm<z.infer<typeof EmailFormSchema>>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function handleSubmit(values: z.infer<typeof EmailFormSchema>) {
    sendResetPasswordMail(values.email);
  }

  return (
    <Card className="w-full sm:max-w-md pt-9 px-10 pb-8">
      <CardContent className="p-0">
        <CardHeader>
          <Logo
            title="비밀번호 찾기"
            description="가입한 이메일로 비밀번호를 재설정합니다."
            bgColor="#eef2fa"
            textColor="#1a3a6b"
          />
        </CardHeader>

        <form
          id="reset-password-form"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
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

          <Button
            className="size-full mt-6 p-3.75 text-white border-none rounded-[7px] text-[16px] font-bold cursor-pointer tracking-[0.5px] transition-colors duration-180"
            type="submit"
          >
            재설정 메일 발송
          </Button>
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
