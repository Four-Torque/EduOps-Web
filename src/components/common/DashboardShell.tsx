import type { NavItem } from "@/constants/navigation";

interface DashboardShellProps {
  navItems: NavItem[];
  pageTitle: string;
  children: React.ReactNode;
}

export function DashboardShell({
  navItems,
  pageTitle,
  children,
}: DashboardShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 bg-white">{children}</main>
      </div>
    </div>
  );
}
