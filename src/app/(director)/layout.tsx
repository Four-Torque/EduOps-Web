import AppShell from "../../components/common/AppShell";
import { DIRECTOR_NAV, MANAGER_NAV } from "../../constants/navigation";

export default function DirectorLayout({ children }: { children: React.ReactNode }) {
  return <AppShell navItems={[...DIRECTOR_NAV, ...MANAGER_NAV]}>{children}</AppShell>;
}