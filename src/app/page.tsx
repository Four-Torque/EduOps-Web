"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/user/useSession";
import { ROLE_HOME } from "@/constants/navigation";

export default function RootPage() {
  const { data: session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (session) router.replace(ROLE_HOME[session.role]);
    else router.replace("/login");
  }, [session, isLoading, router]);

  return null;
}
