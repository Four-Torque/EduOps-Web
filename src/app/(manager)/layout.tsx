import AppShell from "../../components/common/AppShell";
import { MANAGER_NAV } from "../../constants/navigation";

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return <AppShell navItems={MANAGER_NAV}>{children}</AppShell>;
}
