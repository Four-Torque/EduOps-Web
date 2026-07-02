"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/user/useSession";
import { ROLE_HOME } from "@/constants/navigation";

export default function RootPage() {
  const { data: session, isLoading } = useSession();
  const router = useRouter();

  // 루트("/")는 화면이 없는 분기점. 로그인 상태면 역할별 홈, 아니면 로그인 페이지로 보낸다
  useEffect(() => {
    if (isLoading) return;
    if (session) router.replace(ROLE_HOME[session.role]);
    else router.replace("/login");
  }, [session, isLoading, router]);

  return null;
}
