"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "../../components/common/AppShell";
import { TEACHER_NAV } from "../../constants/navigation";
import { useSession } from "@/hooks/user/useSession";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!session || session.role !== "TEACHER") router.replace("/");
  }, [session, isLoading, router]);

  if (isLoading || !session || session.role !== "TEACHER") return null;

  return <AppShell navItems={TEACHER_NAV} homePath="/class">{children}</AppShell>;
}
