"use client";

import AppShell from "@/shared/components/AppShell";
import { TEACHER_NAV, ROLE_HOME } from "@/shared/constants/navigation";
import { useRoleGuard } from "@/shared/hooks/useRoleGuard";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ready } = useRoleGuard(["TEACHER"]);
  if (!ready) return null;

  return (
    <AppShell navItems={TEACHER_NAV} homePath={ROLE_HOME.TEACHER}>
      {children}
    </AppShell>
  );
}
