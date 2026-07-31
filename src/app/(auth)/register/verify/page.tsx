"use client";

import { useRegisterVerifyMail } from "@/features/auth/query";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function RegisterVerifyPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { mutate: verify } = useRegisterVerifyMail();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (token) {
      verify(token, {
        onError() {
          setIsError(true);
        },
      });
    }
  }, [token, verify]);

  if (isError) return notFound();

  return null;
}

export default function RegisterVerifyPage() {
  return (
    <Suspense fallback={null}>
      <RegisterVerifyPageContent />
    </Suspense>
  );
}
