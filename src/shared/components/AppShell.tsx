import { NavItem } from "../constants/navigation";
import { Sidebar } from "./Sidebar";
import Header from "./Header";
import Topbar from "./Topbar";

interface AppShellProps {
  children: React.ReactNode;
  navItems: NavItem[];
  homePath: string;
}

export default function AppShell({
  children,
  navItems,
  homePath,
}: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar navItems={navItems} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <Topbar homePath={homePath} />
        <main className="flex-1 overflow-auto p-6 bg-white">{children}</main>
      </div>
    </div>
  );
}
