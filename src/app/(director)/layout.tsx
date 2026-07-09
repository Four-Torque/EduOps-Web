"use client";

import AppShell from "@/shared/components/AppShell";
import { getDirectorNav, ROLE_HOME } from "@/shared/constants/navigation";
import { useRoleGuard } from "@/shared/hooks/useRoleGuard";

export default function DirectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ready } = useRoleGuard(["DIRECTOR"]);
  if (!ready) return null;

  return (
    <AppShell navItems={getDirectorNav()} homePath={ROLE_HOME.DIRECTOR}>
      {children}
    </AppShell>
  );
}
