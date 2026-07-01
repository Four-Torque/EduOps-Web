import AppShell from "../../components/common/AppShell";
import { getDirectorNav } from "../../constants/navigation";

export default function DirectorLayout({ children }: { children: React.ReactNode }) {
  return <AppShell navItems={getDirectorNav()} homePath="/user-list">{children}</AppShell>;
}