"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "../../components/common/AppShell";
import { getDirectorNav } from "../../constants/navigation";
import { useSession } from "@/hooks/user/useSession";

export default function DirectorLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!session || session.role !== "DIRECTOR") router.replace("/");
  }, [session, isLoading, router]);

  if (isLoading || !session || session.role !== "DIRECTOR") return null;

  return <AppShell navItems={getDirectorNav()} homePath="/user-list">{children}</AppShell>;
}