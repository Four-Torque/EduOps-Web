"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "../../components/common/AppShell";
import { MANAGER_NAV } from "../../constants/navigation";
import { useSession } from "@/hooks/user/useSession";

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!session || session.role !== "MANAGER") router.replace("/");
  }, [session, isLoading, router]);

  if (isLoading || !session || session.role !== "MANAGER") return null;

  return <AppShell navItems={MANAGER_NAV} homePath="/school-info">{children}</AppShell>;
}