"use client";

import { useRegisterVerifyMail } from "@/hooks/auth/useAuth";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterVerifyPage() {
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
