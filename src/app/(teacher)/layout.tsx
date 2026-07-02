"use client";

import AppShell from "../../components/common/AppShell";
import { TEACHER_NAV, ROLE_HOME } from "../../constants/navigation";
import { useRoleGuard } from "@/hooks/user/useRoleGuard";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { ready } = useRoleGuard(["TEACHER"]);
  if (!ready) return null;

  return <AppShell navItems={TEACHER_NAV} homePath={ROLE_HOME.TEACHER}>{children}</AppShell>;
}