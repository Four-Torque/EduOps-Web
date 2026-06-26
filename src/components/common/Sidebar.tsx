import { NavItem as NavItemType } from "../../constants/navigation";
import NavItem from "./NavItem";

interface SidebarProps {
  navItems: NavItemType[];
}

export default function Sidebar({ navItems }: SidebarProps) {
  return (
    <aside className="w-60 h-screen bg-slate-900 flex flex-col flex-shrink-0">
      <div className="px-6 py-5 border-b border-slate-700">
        <span className="text-white font-bold text-lg">EduOps</span>
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>
    </aside>
  );
}