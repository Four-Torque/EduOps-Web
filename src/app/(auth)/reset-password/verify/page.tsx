"use client";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { useResetPasswordVerifyMail } from "@/hooks/auth/useAuth";
import { notFound, useSearchParams } from "next/navigation";

export default function ResetPasswordFormPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { data, isError, isLoading } = useResetPasswordVerifyMail(
    token || undefined,
  );

  if (isLoading) {
    return null;
  }

  if (isError) {
    return notFound();
  }

  return <ResetPasswordForm token={token || ""} email={data?.email || ""} />;
}
