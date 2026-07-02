"use client";

import AppShell from "../../components/common/AppShell";
import { getDirectorNav, MANAGER_NAV, ROLE_HOME } from "../../constants/navigation";
import { useRoleGuard } from "@/hooks/user/useRoleGuard";

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  // 관리자 영역이지만 원장도 열람 가능
  const { session, ready } = useRoleGuard(["MANAGER", "DIRECTOR"]);
  if (!ready) return null;

  // 원장이 관리자 페이지를 볼 때도 사이드바/홈은 원장 기준을 유지한다
  const isDirector = session!.role === "DIRECTOR";
  const navItems = isDirector ? getDirectorNav() : MANAGER_NAV;
  const homePath = isDirector ? ROLE_HOME.DIRECTOR : ROLE_HOME.MANAGER;

  return <AppShell navItems={navItems} homePath={homePath}>{children}</AppShell>;
}