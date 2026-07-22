"use client";

import { Button } from "@/shared/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="h-screen flex flex-col gap-y-4 items-center justify-center">
      <AlertTriangle className="size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        에러: {error?.message || "서버 요청 중 문제가 발생하였습니다."}
      </p>
      <Button
        variant={"secondary"}
        size={"sm"}
        onClick={() => (window.location.href = "/")}
      >
        홈으로
      </Button>
    </div>
  );
}
