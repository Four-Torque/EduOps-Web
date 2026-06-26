"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

interface NavItemProps {
  label: string;
  href: string;
}

export default function NavItem({ label, href }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
        isActive
          ? "bg-slate-700 text-white"
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      )}
    >
      {label}
    </Link>
  );
}