"use client";

import AppShell from "../../components/common/AppShell";
import { getDirectorNav, MANAGER_NAV } from "../../constants/navigation";
import { useAuthStore } from "../../store/auth.store";

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const role = useAuthStore((s) => s.user?.role);
  const navItems = role === "DIRECTOR" ? getDirectorNav() : MANAGER_NAV;
  return <AppShell navItems={navItems}>{children}</AppShell>;
}