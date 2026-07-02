"use client";

import AppShell from "../../components/common/AppShell";
import { getDirectorNav, ROLE_HOME } from "../../constants/navigation";
import { useRoleGuard } from "@/hooks/user/useRoleGuard";

export default function DirectorLayout({ children }: { children: React.ReactNode }) {
  const { ready } = useRoleGuard(["DIRECTOR"]);
  if (!ready) return null;

  return <AppShell navItems={getDirectorNav()} homePath={ROLE_HOME.DIRECTOR}>{children}</AppShell>;
}