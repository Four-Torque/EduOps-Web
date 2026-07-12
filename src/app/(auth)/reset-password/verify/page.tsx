"use client";

import ResetPasswordForm from "@/features/auth/components/form/ResetPasswordForm";
import { useResetPasswordVerifyMail } from "@/features/auth/query";
import { notFound, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ResetPasswordFormPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { data, isError, isLoading } = useResetPasswordVerifyMail(
    token || undefined,
  );

  if (isLoading) {
    return null;
  }

  if (isError || !data) return notFound();

  return <ResetPasswordForm token={token || ""} email={data?.email || ""} />;
}

export default function ResetPasswordFormPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordFormPageContent />
    </Suspense>
  );
}
