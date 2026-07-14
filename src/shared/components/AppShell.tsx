import { NavItem } from "../constants/navigation";
import { Sidebar } from "./Sidebar";
import Header from "./Header";
import Topbar from "./Topbar";

interface AppShellProps {
  children: React.ReactNode;
  navItems: NavItem[];
  homePath: string;
}

// navItems에서 homePath에 해당하는 라벨을 찾는다 (탭 자동 생성 시 표시할 이름)
function findHomeLabel(navItems: NavItem[], homePath: string): string {
  for (const item of navItems) {
    if (item.href === homePath) return item.label;
    const child = item.children?.find((c) => c.href === homePath);
    if (child) return child.label;
  }
  return homePath;
}

export default function AppShell({
  children,
  navItems,
  homePath,
}: AppShellProps) {
  const homeLabel = findHomeLabel(navItems, homePath);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar navItems={navItems} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <Topbar homePath={homePath} homeLabel={homeLabel} />
        <main className="flex-1 overflow-auto p-6 bg-white">{children}</main>
      </div>
    </div>
  );
}
