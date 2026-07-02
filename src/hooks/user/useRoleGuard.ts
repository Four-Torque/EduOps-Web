"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "./useSession";
import type { User } from "@/types/user/user.types";

type Role = User["role"];

// 지정한 역할만 접근을 허용하는 라우트 가드.
// 권한이 없거나 로그인하지 않았으면 홈("/")으로 돌려보낸다.
// ready === true 일 때만 화면을 그린다 (세션 확인 완료 + 권한 있음).
export function useRoleGuard(allowedRoles: Role[]) {
  const { data: session, isLoading } = useSession();
  const router = useRouter();

  const allowed = !!session && allowedRoles.includes(session.role);

  useEffect(() => {
    if (isLoading) return;
    if (!allowed) router.replace("/");
  }, [isLoading, allowed, router]);

  return { session, ready: !isLoading && allowed };
}